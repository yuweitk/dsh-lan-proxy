import type { WebRoute } from "@deepseek-ai/dsh-host-webserver";
import type { CaActionDeps } from "../deps.js";
/** POST body 读形态（未知键忽略；确认与轮换意向只认 true）。 */
export interface CaPostBody {
    confirmed?: unknown;
    expectedRevision?: unknown;
    rotateCa?: unknown;
}
/** 动作成功回执（mode 供排障区分首建/叶轮换/CA 轮换；客户端重 fetch 为准）。 */
export type CaActionResult = {
    ok: true;
    mode: "generated";
} | {
    ok: true;
    mode: "leaf-rotated";
} | {
    ok: true;
    mode: "ca-rotated";
};
/**
 * 组装一键 CA 动作路由（POST 只写；loopback 围栏 + POST 白名单；body 经
 * readJsonBodyOutcome 解析 {confirmed?, expectedRevision?, rotateCa?}）。
 * 导出供 apply 装配与单测（fake deps，不依赖网络）。
 */
export declare function buildCaActionRoutes(deps: CaActionDeps): WebRoute[];
