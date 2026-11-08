import type { Context } from "@deepseek-ai/cordis";
import { DEFAULT_WSS_COMPRESS_PATHS } from "./config/interface.js";
import type { LanProxyConfig } from "./config/interface.js";
export { DEFAULT_WSS_COMPRESS_PATHS };
export { pluginDir } from "./shared/interface.js";
/**
 * 挂载 LAN 转发器。配置来源（settings 命名空间解析值优先、组合层 entry 兜底）
 * 变化时通过 sync 重建转发器，实现端口等配置的热更新（统一由 scope.watch 驱动）。
 *
 * 注意：apply 必须同步返回——转发器在 sync() 里立即启动，settings 命名空间的
 * 注册通过 inject(["settings"]) 异步补挂（失败仅降级 warn）。enabled 早退已移除
 * （issue #110 P0-2）：禁用态仍注册 settings 命名空间与路由，保证存量
 * config.json 迁移先行于 enabled 判定；转发器是否启动由 sync() 内 enabled 决定。
 * @param ctx 携带已初始化 webServer 服务的宿主插件上下文。
 * @param config 解析后的插件配置（loader 已应用 schema 默认值）。
 */
export declare function apply(ctx: Context, config?: LanProxyConfig): void;
