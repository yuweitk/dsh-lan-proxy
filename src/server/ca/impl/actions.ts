/**
 * dsh-lan-proxy — ca 域一键动作（#930 Phase 2 POST 路由装配与编排）。
 *
 * 单路由 POST（路径由装配层经 deps.path 注入，见 ROUTES.caGenerate）：
 * 自签态首建（CA+叶子）/ 托管态轮换（默认仅叶子，CA 续用；rotateCa:true 才换
 * CA）。custom（用户资产）与 error（半套/缺文件）一律 409 fail-closed。
 *
 * 写顺序（F3 原子写）：temp 落盘 → scope.update 成功 → rename（旧目标先搬
 * .bak，成功后 prune 只留最近 1 个 .bak）。跨目标非原子故带补偿（P1-1）：
 * 第 N 个目标失败时已提交目标（含失败目标自己的 .bak）按逆序搬回。scope
 * 先行、rename 在后：补偿亦失败时 scope 指向缺失/旧文件，三态谓词如实报
 * error/managed（口径诚实，不静默）。响应永不带路径（F19），原文只进日志。
 */
import { chmodSync, existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import type { ServerResponse } from "node:http";
import {
  errorMessage,
  guardLoopbackMethod,
  readJsonBodyOutcome,
  writeJson,
} from "../../../../../../shared/host-utils.js";
import type { WebRoute } from "@deepseek-ai/dsh-host-webserver";
import type { ResolvedConfig } from "../../config/interface.ts";
import type { CaState } from "./state.ts";
import {
  CA_CERT_FILE,
  CA_KEY_FILE,
  LEAF_CERT_FILE,
  LEAF_KEY_FILE,
  certsDir,
} from "../../shared/interface.ts";
import type { CaActionDeps, CaFsPort } from "../deps.ts";
import { classifyCaState } from "./state.ts";

/** POST body 读形态（未知键忽略；确认与轮换意向只认 true）。 */
export interface CaPostBody {
  confirmed?: unknown;
  expectedRevision?: unknown;
  rotateCa?: unknown;
}

/** 解析后动作意图（expectedRevision 非整数即缺席，不抛错）。 */
interface ParsedPostBody {
  confirmed: boolean;
  rotateCa: boolean;
  expectedRevision: number | undefined;
}

/** 动作成功回执（mode 供排障区分首建/叶轮换/CA 轮换；客户端重 fetch 为准）。 */
export type CaActionResult =
  | { ok: true; mode: "generated" }
  | { ok: true; mode: "leaf-rotated" }
  | { ok: true; mode: "ca-rotated" };

/** 动作失败码（F19 码表；路径永不进响应）。 */
const CA_ERROR_DETAILS: Record<string, string> = {
  "needs-confirm":
    "目标位置已存在证书材料：请确认后重试（confirmed:true）。默认仅轮换叶子（CA 续用，已装设备零操作）；轮换 CA 为危险动作，需显式指定 rotateCa:true。",
  "ca-generating": "正在生成中，请稍后重试",
  "ca-customized": "当前为自定义证书配置，一键生成已禁用（仅自签与托管态可用）",
  "ca-misconfigured":
    "证书配置异常（三键不完整或托管文件缺失）：清空三键回自签后重建，或恢复缺失文件",
  "ca-generate-failed": "生成失败，请查看服务端日志",
  "ca-revision-stale": "配置版本未知，请刷新后重试",
  conflict: "设置已被其他窗口修改，请刷新后重试",
  "settings-unavailable": "settings 服务不可用，无法保存配置",
};

/** 托管四件套的绝对路径（每次现读：certsDir 随 DSH_HOME 变，装配期快照会跨账号串味）。 */
interface ManagedPaths {
  readonly caCert: string;
  readonly caKey: string;
  readonly leafCert: string;
  readonly leafKey: string;
}

/** 托管四件套绝对路径（固定文件名 + certsDir，见 shared/paths.ts F18）。 */
function managedPaths(): ManagedPaths {
  const dir = certsDir();
  return {
    caCert: join(dir, CA_CERT_FILE),
    caKey: join(dir, CA_KEY_FILE),
    leafCert: join(dir, LEAF_CERT_FILE),
    leafKey: join(dir, LEAF_KEY_FILE),
  };
}

/** 解析 POST body（缺席即 {}；畸形由调用方先行 400，本函数只做形态收窄）。 */
function parsePostBody(body: Record<string, unknown>): ParsedPostBody {
  return {
    confirmed: body.confirmed === true,
    rotateCa: body.rotateCa === true,
    expectedRevision:
      typeof body.expectedRevision === "number" && Number.isInteger(body.expectedRevision)
        ? body.expectedRevision
        : undefined,
  };
}

/** 进程内 singleflight（F4：第二请求 429，按钮侧复用 inFlight disabled）。 */
class GenerationGate {
  private held = false;
  tryAcquire(): boolean {
    if (this.held) return false;
    this.held = true;
    return true;
  }
  release(): void {
    this.held = false;
  }
}

/** 目标同目录 temp 路径（同文件系统 rename 才原子；单 flight 下固定名无碰撞）。 */
function tempPath(target: string): string {
  return target + ".tmp";
}

/** 写 temp（0600 + chmodSync 双保险，见 F13/F14；残留旧 temp 先清）。 */
function writeTempFile(target: string, content: string): void {
  const tmp = tempPath(target);
  try {
    unlinkSync(tmp);
  } catch {
    // 无残留即空操作。
  }
  writeFileSync(tmp, content, { mode: 0o600 });
  chmodSync(tmp, 0o600);
}

/** 清 temp（失败路径收尾；best effort）。 */
function cleanupTempFile(target: string): void {
  try {
    unlinkSync(tempPath(target));
  } catch {
    // 本就无文件即成功。
  }
}

/** 已提交目标（补偿回滚按逆序用各自 .bak 搬回）。 */
interface CommittedTarget {
  target: string;
  backup: string | undefined;
}

/**
 * 提交单个目标：旧文件搬时间戳 .bak → temp 原子 rename 上位（rename 走注入接缝）。
 * 本函数只登记不回滚：调用方在跨目标循环外统一补偿（含本目标自己的 .bak——
 * 登记先于风险 rename，失败时登记项已在表内）。调用方另清 temp。
 */
function commitTarget(
  fs: CaFsPort,
  logWarn: (message: string) => void,
  target: string,
  stamp: string,
  done: CommittedTarget[],
): void {
  const tmp = tempPath(target);
  let backup: string | undefined;
  if (existsSync(target)) {
    backup = target + "." + stamp + ".bak";
    fs.renameSync(target, backup);
  }
  done.push({ target, backup });
  fs.renameSync(tmp, target);
  pruneBackups(target, fs, logWarn);
}

/**
 * .bak 只留最近 1 个（F10：按时间戳后缀降序保留首个；.migrated.bak 系另名不沾）。
 * 清理失败只记日志（提交已成功，不因此 500）。
 */
function pruneBackups(target: string, fs: CaFsPort, logWarn: (message: string) => void): void {
  const dir = dirname(target);
  const base = basename(target);
  let names: string[];
  try {
    names = fs.readdirSync(dir);
  } catch (err) {
    logWarn("lan-proxy: 备份目录读取失败（" + dir + ")— " + errorMessage(err));
    return;
  }
  const owned = names
    .filter((name) => name.startsWith(base + ".") && name.endsWith(".bak"))
    .sort()
    .reverse();
  for (const extra of owned.slice(1)) {
    try {
      fs.unlinkSync(join(dir, extra));
    } catch (err) {
      logWarn("lan-proxy: 旧证书备份清理失败（" + extra + ")— " + errorMessage(err));
    }
  }
}

/** 失败码写回（固定文案，路径不进响应）。 */
function writeCaError(res: ServerResponse, status: number, code: string): void {
  writeJson(res, status, { ok: false, error: { code, details: CA_ERROR_DETAILS[code] } });
}

/**
 * 组装一键 CA 动作路由（POST 只写；loopback 围栏 + POST 白名单；body 经
 * readJsonBodyOutcome 解析 {confirmed?, expectedRevision?, rotateCa?}）。
 * 导出供 apply 装配与单测（fake deps，不依赖网络）。
 */
export function buildCaActionRoutes(deps: CaActionDeps): WebRoute[] {
  const gate = new GenerationGate();
  const actionRoute: WebRoute = {
    kind: "exact",
    path: deps.path,
    handler: async (req, res) => {
      if (!guardLoopbackMethod(req, res, ["POST"])) return;
      const parsed = await readCaPostBody(req, res);
      if (parsed === undefined) return;
      const current = deps.config.resolve();
      // 放行判定：设置面、乐观并发、证书态势三道都在这里出结论（见 caPrecheck）。
      const pre = caPrecheck(deps, parsed, current);
      if (!pre.ok) {
        writeCaError(res, pre.status, pre.code);
        return;
      }
      const expectedRevision = pre.expectedRevision;
      const state = pre.state;
      const paths = managedPaths();
      const full = caFullOf(state, parsed.rotateCa);
      const rotateTargets = caRotateTargetsOf(full, pa