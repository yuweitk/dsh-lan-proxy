/**
 * dsh-lan-proxy — 主机端。dsh web UI 的零依赖 LAN 转发器：等回环 web 服务器
 * 绑定后，在 0.0.0.0:<port> 上监听并把 HTTP + WebSocket 转发到
 * 127.0.0.1:<webServer.port>（默认 3080），重写 Host/Origin 使 /api 浏览器
 * 信任围栏接受这些请求。
 *
 * 端口不是固定的：默认 3081，可通过两层途径修改（都实时生效）——
 *   1. GUI 设置卡片（插件管理器 → dsh-lan-proxy → 行详情）：经 loopback HTTP 配置路由
 *      写入官方 settings 条目（scope.update/replace），settings/document-updated
 *      订阅触发热更新（冻结计划 v1.1；scope.watch 为 rc.5 遗留面，不再使用）；
 *      settings 服务不可解析时自动降级并打 warn 日志。
 *   2. 组合层配置（profile 的 cordis.patch.yml 覆盖 lan-proxy 行的 config，
 *      或启动时 --patch overlay）——作为 settings 命名空间的 base 层生效。
 *
 * 配置单一通道（issue #110）：不再维护自建 `~/.dsh/lan-proxy/config.json` 与
 * RPC state/config 端点；配置一律存官方 settings 存储（条目 id 见 SETTINGS_NS
 * `dsh-lan-proxy`，owner scope get/update/replace + describe 投影）。存量
 * config.json 在 settings 服务 attach 后做一次性 marker 迁移（原子改名
 * `config.json.migrated.bak` 幂等标记 → 校验过滤 → scope.update 增量写入，
 * 失败回滚改名）；此后手改 config.json 不再生效。
 *
 * 激活方式：把本包安装进某个 profile，其 cordis.patch.yml（通过
 * `dsh.bundle.patch` 声明）会插入 `lan-proxy` 这一行：
 *
 *   dsh plugin --profile web add link:<本包路径>
 *
 * 该行是普通 cordis 插件：主机端（exports "."）在宿主进程运行，注入
 * `webServer`，因此只在回环服务器监听后启动，并从 ctx.webServer.port
 * 解析真实上游端口（`--port 0` 与自定义 `--port` 均可用）。
 *
 * 结构（#826 域归位）：实现按域归位到 src/server/<域>/（config / host-trust / migrate / proxy / tls）
 * 与 src/server/shared/（包内共享叶子），装配在 src/server/apply.ts；本文件保留插件契约
 * （name/inject 与 apply、路由表转发）与公共符号 re-export。apply 实现于 server/apply.ts，
 * 不 import 本文件。导出面自 #875 M2b 起收窄：转发引擎与 TLS 的纯实现符号不再经本文件
 * 转发，理由与撤回清单见下方「#875 M2b 收窄」段。
 */
export declare const name = "lan-proxy";
/** 等回环 web 服务器绑定并初始化后再启动。 */
export declare const inject: string[];
export { Config, sanitizeSettings, validateSettings, normalizeLegacyWsCompressPaths, } from "./server/config/interface.js";
export type { HttpCompressSnapshot, LanProxyConfig, ResolvedConfig, SettingInvalid, } from "./server/config/interface.js";
export { SETTINGS_NS, installLanProxySettings } from "./server/config/interface.js";
export type { LanProxySettingsHooks, OwnerScopeLike, SettingsDescriptorLike, } from "./server/config/interface.js";
export { ROUTES, applyConfigPatch, buildCaCertRoutes, buildConfigRoutes, } from "./server/config/interface.js";
export type { CaCertRouteDeps, ConfigRouteDeps, PatchResult } from "./server/config/interface.js";
export { MIGRATED_BAK_NAME, migrateFileConfig } from "./server/migrate/interface.js";
export type { MigrationOutcome } from "./server/migrate/interface.js";
export { LEGACY_BAK_SUFFIX, resolvePluginDir } from "./server/migrate/interface.js";
export type { LayoutMigrateOptions, LayoutMigrateOutcome } from "./server/migrate/interface.js";
export { apply, DEFAULT_WSS_COMPRESS_PATHS } from "./server/apply.js";
export { createLanProxy, resolveCompressionOptions } from "./server/proxy/interface.js";
export type { ConnStats, LanProxy, TokenProvider } from "./server/proxy/interface.js";
export { DEFAULT_DEFLATE_POLICY, DEFAULT_OPTIONS } from "./server/shared/interface.js";
export type { DeflatePolicy } from "./server/shared/interface.js";
export { ensureSelfSignedTls } from "./server/tls/interface.js";
