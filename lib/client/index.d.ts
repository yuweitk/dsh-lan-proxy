/**
 * dsh-lan-proxy — 浏览器端（自包含）。
 *
 * 行为：在插件管理页的 dsh-lan-proxy 行详情中渲染配置卡片
 * （plugins.row.config 插槽，idle 插件同款风格）：
 * - 启用开关 / LAN 端口 / HTTPS 开关与端口 / 证书与私钥文件 / 启动横幅开关；
 * - 点「保存」经 loopback HTTP 配置路由提交增量 patch，宿主端转写官方 settings
 *   命名空间（scope.update/replace），scope.watch 触发转发器热更新（保存即热
 *   更新，无需重启 dsh web）。
 *
 * 配置单一事实源在宿主官方 settings 存储（issue #110）；卡片读取走 GET 快照
 * （user 层 + effective 生效值 + 压缩协商计数），多标签页共享。
 */
import { type LanProxyLocaleKey } from "./locales.js";
import type { Context } from "@deepseek-ai/cordis";
declare module "@deepseek-ai/dsh-client-ui-slots" {
    interface LocaleNamespaceMap {
        /** dsh-lan-proxy 设置卡文案。 */
        "settings.lanProxy": LanProxyLocaleKey;
    }
}
/**
 * 浏览器端上下文的窄面（本包实际使用的面：remote/get/effect），与 inject 声明的
 * ["slots", "configForms", "locale", "remote"] 对齐。多用一个服务却忘了声明会在类型层先露出来。
 *
 * get 取官方 cordis Context 的同名方法（Pick 保留其 `this` 绑定），故 ctx.get("slots")
 * 直接得出官方 SlotRegistry | undefined，而不是本包自造的 unknown——服务面改名/改形状判红。
 * remote 不在本包依赖图内（官方 ClientRemote 由 dsh-api-remotes 声明），仍是最小 unknown 面，
 * 由 host-trust-status.ts 的 RemoteLike 单独收窄。
 *
 * effect 的 execute 形参取自官方 Fiber["effect"]，返回值不取（官方返回
 * Disposable<Promise<void>>，本包只把 execute 交出去、清理写在 execute 内部），故返回值放宽
 * 到 unknown。按方法语法声明（与官方 cordis 一致）：方法位是双变检查，测试替身那类
 * 「只收 () => () => void」的窄形参仍可赋值，而形参类型本身始终是官方的。
 */
interface ClientContext extends Pick<Context, "get"> {
    readonly remote?: unknown;
    effect(execute: Parameters<Context["effect"]>[0], label?: string): unknown;
}
export declare function apply(ctx: ClientContext): void;
export declare const inject: string[];
export {};
