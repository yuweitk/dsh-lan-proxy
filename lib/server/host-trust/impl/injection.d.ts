/**
 * dsh-lan-proxy — 宿主端 host trust 兼容注入（issue #856）。
 *
 * 背景：dsh 客户端把 `isLoopback` 从页面 authority 推导，非回环页面被上游策略性
 * 降级为 memory scope（设置不可持久化）。本模块经官方 `ctx.webServer.tapIndex`
 * 向被服务的 index.html 注入一段**自条件**脚本：仅当页面尚未持有
 * `__DSH_TRANSPORT__` 且自身不在回环 authority 上时，才写入 `{ ownsHost: true }`。
 *
 * 为什么用自条件脚本而不是 webserver 的结构化注入行：`kind: "global"` 行的渲染
 * 形态是 `globalThis[name] = <JSON>`——整体赋值会覆盖 desktop-host 等组合先行写入
 * 的 transport 对象，且函数字段会被 JSON 序列化丢弃。表顺序等于插件激活顺序，本
 * 插件无法约束，故整体赋值不可接受。
 *
 * 两条硬纪律（写进这里的理由：两条都只在长跑后才暴露，代码本身看不出来）：
 * 1. tap 只在 apply 顶层注册一次——写进 sync() 会让 webServer 的 indexTaps 随每次
 *    配置热更新无界增长；
 * 2. 开关在 tap 内**按请求**读取当前配置，不在注册时捕获布尔——捕获后切开关要么
 *    不生效，要么被迫走 sync() 重建转发器、掐断活跃 LAN 连接。
 */
import type { Context } from "@deepseek-ai/cordis";
/** 注入脚本元素的幂等 id（同时也是「已注入」判据的字面量）。 */
export declare const HOST_TRUST_ELEMENT_ID = "__dshLanProxyHostTrust__";
/**
 * 运行期 marker：脚本真正写入 transport 时置位。页面侧观测器据此把「兼容模式
 * 生效」与「上游契约漂移」区分开——宿主端看不到页面事实，这条 marker 是唯一
 * 跨进程证据。
 */
export declare const HOST_TRUST_RUNTIME_MARKER = "__DSH_LAN_PROXY_HOST_TRUST__";
/**
 * 向 index.html 注入 host trust 自条件脚本（幂等；位置与同包 randomUUID polyfill
 * 一致——`</head>` 前插入，故先于 renderIndexInjections 追加的 boot-readiness 尾脚本
 * 执行）。
 *
 * @param html - 上游渲染好的 index.html 文本。
 * @param enabled - 兼容开关；false 时**逐字节原样返回**。
 * @returns 注入后的 HTML（已注入过或缺少 `</head>` 时原样返回）。
 */
export declare function applyHostTrustInjection(html: string, enabled: boolean): string;
/**
 * 把 host trust 注入挂到官方 index 变换钩子上（apply 顶层调用一次）。
 *
 * @param ctx - 插件宿主端上下文（只用 effect 与 webServer.tapIndex）。
 * @param isEnabled - **逐请求**调用的开关读取器；不得传入注册时求值的布尔。
 */
export declare function registerHostTrustInjection(ctx: Context, isEnabled: () => boolean): void;
