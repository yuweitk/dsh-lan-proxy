import type { Server, IncomingMessage, IncomingHttpHeaders } from "node:http";
import type { Server as HttpsServer } from "node:https";
import type { Socket } from "node:net";
import { WebSocket } from "ws";
import { type DeflatePolicy } from "../../shared/interface.js";
import type { TlsMaterials } from "../../tls/interface.js";
/** createLanProxy 的日志器最小面（console 或 ctx.logger 均兼容）。 */
export interface LanLogger {
    warn?(...args: unknown[]): void;
    error?(...args: unknown[]): void;
}
/** createLanProxy 选项。 */
export interface LanProxyOptions {
    host?: string;
    port?: number;
    /** HTTPS 监听端口；与 {@link tls} 同时提供时启用 HTTPS（与 HTTP 并存）。 */
    httpsPort?: number;
    /** TLS 证书材料；提供时启用 HTTPS 监听（wss 同步支持）。 */
    tls?: TlsMaterials;
    targetHost?: string;
    /** dsh web 服务器实际绑定端口（必填）。 */
    targetPort: number;
    /**
     * WebSocket 压缩桥接：对命中 `paths` 的 WS 升级做「终结 + permessage-deflate」，
     * 浏览器段压缩、DSH 段明文；其余 WebSocket 继续由 http-proxy 做 TCP 字节透传。
     * 默认作用于大流量的 `/api/remote.mux`（dsh 0.1.2 起 api-gateway 拥有的
     * Remote 流 mux 通道，取代旧 events.mux/events.host）。DSH 服务端即使
     * 未来自身开启 permessage-deflate，这里 DSH 段固定不协商、浏览器段独立协商，
     * 天然避免双重压缩。桥接上游连接的入站头透传见 {@link bridgeUpstreamHeaders}。
     */
    wsCompress?: {
        enabled: boolean;
        paths: readonly string[];
        /**
         * 桥接半开探活间隔 ms（issue #268 P0-1）；缺省 DEFAULT_WS_PROBE_INTERVAL_MS，
         * 0 = 关闭。内部/测试注入口，非用户配置键。
         */
        probeIntervalMs?: number;
    };
    /**
     * WS 桥接总开关（issue #552 解耦）：提供且 `enabled=true` 时**所有** WS 升级
     * 一律走「终结 + 桥接」（ws 库自动代答上游 Ping + 30s 半开探活 + 按
     * {@link wsCompress} 判定是否协商压缩）——保活成为默认基座能力，移动端切后台
     * 不再被上游心跳判死；`enabled=false` 时全部走 TCP 字节透传（显式放弃保活与
     * 压缩，README 标注移动端断连风险）。
     * 缺省（undefined）= 旧行为：仅命中 {@link wsCompress.paths} 的 WS 走桥接。
     * **默认值不在此层设置**——由 apply 的 resolve 接线层显式传入（默认 true），
     * 保证 smoke/unit 现有无参/旧参 createLanProxy 调用行为不变（透传升级测试
     * 不意外走桥接）。
     */
    wsBridge?: {
        enabled: boolean;
    };
    /**
     * WS 压缩协商策略（issue #308）：浏览器段是否协商 permessage-deflate /
     * 按 UA 片段拒绝。iOS Safari 启用压缩即失败（uWebSockets.js #76 实证），
     * 默认拦截 iPhone/iPad/iPod；缺省取 {@link DEFAULT_DEFLATE_POLICY}。
     */
    wsDeflatePolicy?: DeflatePolicy;
    /**
     * HTTP 响应压缩（合并自 dsh-gzip，经 compression 中间件在转发层实现）：
     * 对可压缩响应（JSON / 文本；SSE 豁免）按 Accept-Encoding 协商——含 br 时优先
     * 输出 Brotli（compression@1.8+ 支持），否则回退 gzip；options.level 仅作用
     * 于 gzip 回退路径。
     * 启用后 dsh-gzip 独立包（宿主端压缩）与本层经 content-encoding 检查天然互斥，
     * 任意组合只压一次。回环直连 web（不经本转发器）不经过此层。
     */
    httpCompress?: {
        enabled: boolean;
        /** 压缩档位预设：0 默认 / 1 低 / 2 中 / 3 高（对 gzip 与 Brotli 双生效）。 */
        level?: number;
    };
    /**
     * 自动注入启动令牌（issue #380）：提供时，LAN 设备首次访问 `GET /`（无会话
     * cookie）由转发层自动补当前 launch token——上游铸造持久会话 cookie，固定
     * 设备免手工拿 token；带失效 cookie 的同类请求在上游 401 后重放一次自愈。
     * getToken 动态读取（不缓存）：dsh web 重启后 token 变化自动跟随；返回
     * undefined（connection 服务未就绪/读取失败）时逐请求降级为不注入。
     */
    injectToken?: TokenProvider;
    logger?: LanLogger;
}
/**
 * 当前 dsh web 进程 launch token 的动态提供者最小面（issue #380）。
 * apply 侧封装自官方 connection 服务的公开方法 `authenticatedUrl(baseUrl)`
 * （@deepseek-ai/dsh-client-connection 公开 d.ts API，不依赖私有字段）。
 */
export interface TokenProvider {
    /** 返回当前 launch token；不可用时返回 undefined（逐请求降级为不注入）。 */
    getToken(): string | undefined;
}
/** 监听结果：httpPort 必有；httpsPort 仅在 HTTPS 成功启用时给出。 */
export interface LanListenResult {
    httpPort: number;
    httpsPort?: number;
}
/** 转发器实例。 */
export interface LanProxy {
    server: Server;
    /** HTTPS 监听器（仅启用 TLS 时存在）。 */
    httpsServer?: HttpsServer;
    listen(): Promise<LanListenResult>;
    close(): Promise<void>;
    targetAuthority: string;
    /** HTTP 响应压缩协商计数（未启用压缩时恒为 0）。 */
    httpCompressStats(): {
        compressed: number;
        passthrough: number;
    };
    /**
     * 断连原因计数快照（issue #308 / 承载清单①轻量版）：转发层是全部连接的
     * 唯一观测点，统计各类异常断开供诊断「手机端切后台 / 中继超时 / 业务错误」
     * 的占比（health 与 GET /config 展示）。数值为进程启动/转发器重建后的累计。
     */
    connStats(): ConnStats;
}
/** 断连原因计数（转发层观测；见 {@link LanProxy.connStats}）。 */
export interface ConnStats {
    /** 桥接路径：任一端 close（正常或异常收口）。 */
    wsBridgeClosed: number;
    /** 桥接路径：半开探活判死强拆（iOS 后台冻结 / 中继静默掐断的特征信号）。 */
    wsBridgeHalfOpen: number;
    /** 桥接路径：upstream 错误（连接被掐 / 协议错误）。 */
    wsBridgeErrors: number;
    /** 透传路径：socket 异常销毁（未走正常关闭握手）。 */
    wsPassthroughDestroyed: number;
    /** 透传路径：socket error（ECONNRESET 等）。 */
    wsPassthroughErrors: number;
    /** HTTP 转发：客户端提前断开 → 上游响应 aborted（幂等防抖后计数）。 */
    httpClientAborted: number;
    /** HTTP 转发：客户端提前断开且上游响应头已发出 → 代理主动销毁上游响应
     *  （下游断开传播，issue #528；SSE/慢响应经代理断开不残留上游连接）。 */
    httpUpstreamDestroyed: number;
    /** HTTP 转发：代理错误（上游不可达 / 转发中断）。 */
    httpProxyErrors: number;
}
/**
 * 判断 content-type 是否可压缩：JSON/JSON 系/文本（SSE 除外）。
 * 自 dsh-gzip 迁移的纯函数，作为 compression 中间件的自定义 filter——
 * 库默认 filter 会放行 text/event-stream，这里保持 dsh-gzip 的 SSE 豁免语义。
 * @param contentType 响应 content-type。
 * @returns 是否可压缩。
 */
export declare function isCompressible(contentType: unknown): boolean;
/** 压缩预设档位 → compression 中间件选项（gzip 与 Brotli 双生效）。 */
export interface CompressionOptions {
    level?: number;
    brotli?: {
        params: Record<string, number>;
    };
}
/**
 * 按策略判定某 UA 是否允许协商 WS 压缩（纯函数，可单测）。
 * 任一环节未配置均取宽松语义：无策略 = 放行；browser=false = 拒绝；
 * uaDeny 为空/UA 缺失 = 放行；UA 命中任一 deny 片段 = 拒绝。
 * @param policy 协商策略（缺省按放行处理）。
 * @param userAgent 入站 `user-agent` 请求头（可缺失）。
 */
export declare function deflateAllowedByPolicy(policy: DeflatePolicy | undefined, userAgent: string | undefined): boolean;
/**
 * 压缩档位映射（对 br 与 gzip 同时生效）：
 *   0 默认 → 不传参（库默认：gzip Z_DEFAULT_COMPRESSION=6 / br 质量 4）
 *   1 低   → gzip 1 / br 2（最快，静态文本性价比最高）
 *   2 中   → gzip 5 / br 5（均衡）
 *   3 高   → gzip 9 / br 9（最高压缩比，CPU 最贵）
 * 非法输入（非有限数/越界）按「默认」处理。
 */
export declare function resolveCompressionOptions(preset: unknown): CompressionOptions;
/**
 * 格式化 `host:port` 用于请求头，IPv6 字面量加方括号。
 * @param host 主机名/IP。
 * @param port 端口。
 * @returns 格式化 authority。
 */
export declare function formatAuthority(host: string, port: number): string;
/**
 * 判断入站 Host authority 是否允许转发。仅接受 IP 字面量与 `localhost`；
 * 任何 DNS 域名一律拒绝（HTTP 返回 403 / 升级连接直接断开）。
 * @param authority 原始 `Host` 请求头值。
 * @returns 是否允许。
 */
export declare function hostnameAllowed(authority: string | undefined): boolean;
/**
 * 为上游一跳重建请求头（Host/Origin 重写）。导出供纯函数单测锁定行为；
 *  实际转发路径上作为 http-proxy 的每请求 headers 覆盖传入（前置校验不外移）。 */
export declare function rewriteHeaders(headers: IncomingHttpHeaders, targetAuthority: string): IncomingHttpHeaders;
/**
 * 判断请求是否携带 dsh 浏览器会话 cookie（issue #380）。
 * 按 RFC 6265 口径精确解析：`;` 分段、取 `=` 前名字并 trim、名字前缀匹配——
 * 禁止整头子串匹配（其他 cookie 的值含该子串会造成误判）。
 * 导出供纯函数单测。
 */
export declare function hasDshAuthCookie(cookieHeader: string | string[] | undefined): boolean;
/**
 * 注入候选判定：GET 且出站路径恰为 `/` 且查询串尚无 token 参数。
 * 与上游铸造条件（`GET /`、单一 token）严格对齐；其余请求一律不注入
 * （带 token 的非根请求上游也回 401，注入无意义）。导出供纯函数单测。
 */
export declare function isTokenMintCandidate(method: string | undefined, url: string | undefined): boolean;
/**
 * 把 token 并入请求 URL 的 query（`token` 参数；已存在时覆盖）。解析失败
 * 返回 undefined（调用方降级为不注入）。导出供纯函数单测。
 */
export declare function withLaunchToken(url: string | undefined, token: string): string | undefined;
/**
 * 为压缩桥接的上游连接重建请求头（纯函数，导出供单测锁定行为）。
 *
 * 与 HTTP/WS 透传路径的 {@link rewriteHeaders} 不同：桥接是「终结浏览器连接 →
 * 新建上游连接」，入站头必须显式随行转发。dsh 0.1.2 起 `/api/remote.mux` 的升级
 * 处理在 Host/Origin 围栏之外还要校验 authority 绑定的浏览器会话 Cookie
 * （connection.requestRejection → isAuthenticated），丢弃 Cookie 即 401 拒绝
 * 升级、桥接表现为连不上（issue #379）。因此这里透传全部入站头（含 Cookie
 * 等认证凭据），仅做两类例外：
 *   - 覆盖 Host/Origin 为回环目标 authority（/api 浏览器信任围栏的校验条件，
 *     与 rewriteHeaders 语义一致）；
 *   - 剥离 {@link BRIDGE_UPSTREAM_HEADER_DENY} 集合中的头。
 * @param headers 入站升级请求头。
 * @param targetAuthority 回环目标 authority（host:port）。
 * @returns 上游连接请求头（ws 库 headers 选项的键值面）。
 */
export declare function bridgeUpstreamHeaders(headers: IncomingHttpHeaders, targetAuthority: string): Record<string, string>;
/**
 * 判断某 WS 升级请求路径是否命中「需压缩桥接」白名单。
 * 仅比较 pathname（忽略查询串）。导出供纯函数单测锁定行为。
 * @param paths 压缩白名单（默认含 /api/remote.mux）。
 * @param url 原始请求 URL（可能带查询串）。
 * @returns 是否命中。
 */
export declare function compressWsPath(paths: readonly string[] | undefined, url: string | undefined): boolean;
/** 桥接目标（DSH 端）。 */
export interface WsBridgeTarget {
    targetHost: string;
    targetPort: number;
    logger?: LanLogger;
    /**
     * 半开探活间隔 ms；缺省 {@link DEFAULT_WS_PROBE_INTERVAL_MS}；0 = 关闭探活。
     * 生产走默认值，该字段主要供单测注入小间隔以确定性验证探活行为。
     */
    probeIntervalMs?: number;
    /**
     * 浏览器段压缩协商策略（issue #308）：iOS Safari 启用 permessage-deflate 即
     * 失败，默认经 {@link DEFAULT_DEFLATE_POLICY} 拦截 iPhone/iPad/iPod。
     */
    deflatePolicy?: DeflatePolicy;
    /**
     * 浏览器段是否协商 permessage-deflate（issue #552 全桥接解耦）：缺省 true
     * （语义 = 压缩白名单命中）。全桥接模式下对所有 WS 都建桥，但仅命中压缩
     * 白名单的路径才协商压缩、其余桥接明文（保活不丢、压缩按需）。
     */
    compress?: boolean;
    /**
     * 活动桥接连接登记集合（issue #552 收口加固）：桥接建立时把浏览器段与上游段
     * 加入、close 时移除。转发器 close() 借它显式 terminate 全部活动桥接——上游段
     * 不在普通 sockets 集合，只依赖级联 close 握手（上游不响应 close 帧会滞留）。
     */
    bridgeSockets?: Set<WebSocket>;
    /**
     * 断连分类打点回调（issue #308 测量）：桥接任一端 close/error/半开判死时
     * 以分类上报；缺省不记录。半开判死（halfOpen）是 iOS 后台冻结 / 中继静默
     * 掐断的特征信号，用于诊断「手机端切后台后连接挂起」占比。
     */
    onDisconnect?: (kind: "close" | "error" | "halfOpen") => void;
}
/**
 * WS 压缩桥接的半开探活间隔（issue #268 P0-1）：移动端切后台系统静默掐断 TCP
 * 形成半开连接，两端都收不到 FIN/RST，close/error 事件永不触发 → 桥接僵死。
 * 每 30s 对桥接两端各发一帧 ping；一个周期内未获 pong 即判定半开并 terminate。
 */
export declare const DEFAULT_WS_PROBE_INTERVAL_MS = 30000;
export declare function bridgeCompressedWs(req: IncomingMessage, socket: Socket, head: Buffer, target: WsBridgeTarget): void;
export declare function createLanProxy(options: LanProxyOptions, logger?: LanLogger): LanProxy;
