/**
 * dsh-lan-proxy — 配置模型与校验。
 *
 * 单一事实源是 schema：DEFAULT_CONFIG 由它归一化空输入派生；校验器与提示文案平行于
 * 它维护，键集一致性由 config-matrix 门禁锁定（漂移即红）。
 */
import z from "schemastery";
import { type DeflatePolicy } from "../../shared/interface.js";
/**
 * WebSocket 压缩桥接默认路径白名单（dsh 0.1.2 起 api-gateway 拥有的 Remote 流
 * mux 端点）。单一事实源：Config schema 默认值、apply resolve() 兜底与
 * normalizeLegacyWsCompressPaths 的归一化目标均与本常量同源（客户端 placeholder
 * 属构建期注入的展示文案，值保持一致）。
 */
export declare const DEFAULT_WSS_COMPRESS_PATHS: readonly string[];
/** 插件配置（loader 应用 schema 默认值后传入；apply 内仍有合并兜底）。 */
export interface LanProxyConfig {
    enabled?: boolean;
    host?: string;
    port?: number;
    /** HTTPS 监听开关（默认开启；与 HTTP 并存）。 */
    httpsEnabled?: boolean;
    /** HTTPS 监听端口（默认 3443）。 */
    httpsPort?: number;
    /** 自定义 TLS 证书 PEM 文件路径（可选；缺省自动生成自签名证书）。 */
    tlsCertFile?: string;
    /** 自定义 TLS 私钥 PEM 文件路径（可选；与 tlsCertFile 成对）。 */
    tlsKeyFile?: string;
    /** 自建 LAN CA 公钥 PEM 文件路径（可选，仅读；issue #911 设置页下发 iOS/Android/Windows 安装用）。 */
    tlsCaCertFile?: string;
    targetHost?: string;
    targetPort?: number;
    /** 启动时是否向终端打印监听横幅（LAN 访问地址等；默认 true）。 */
    printBanner?: boolean;
    /**
     * WebSocket 桥接总开关（默认 true，issue #552 解耦）。true = 所有 WS 升级
     * 一律走「终结 + 桥接」（ws 库自动代答上游 Ping + 30s 半开探活 + 按策略协商
     * 压缩）——保活成为默认基座能力，移动端切后台不再被上游心跳判死；false =
     * 走 TCP 字节透传（显式放弃保活与压缩，README 标注移动端断连风险）。
     * 与 wsCompressEnabled/wsCompressPaths 正交：压缩仅作用于桥接路径，清空
     * 压缩白名单/关闭压缩不再连带丢失保活。
     */
    wsBridgeEnabled?: boolean;
    /** WebSocket 压缩总开关（默认 true）：仅控制桥接路径上是否协商 permessage-deflate。 */
    wsCompressEnabled?: boolean;
    /** 参与 WebSocket 压缩桥接的路径白名单。 */
    wsCompressPaths?: string[];
    /** WebSocket 压缩协商策略（issue #308 防手机端连接异常）。
     *  - browser：浏览器段是否允许协商 permessage-deflate（false = 全局关闭压缩）；
     *  - uaDeny：UA 片段命中则强制不协商（iOS Safari 启用压缩即失败，
     *    uWebSockets.js #76 实证；默认拦截 iPhone/iPad/iPod，覆盖桌面 Chrome 等）。 */
    wsDeflatePolicy?: {
        browser?: boolean;
        uaDeny?: string[];
    };
    /** HTTP 响应压缩总开关（默认 true；合并自 dsh-gzip）。经 compression 中间件按 Accept-Encoding 协商，Brotli/gzip 双生效。 */
    httpCompressEnabled?: boolean;
    /** 压缩档位预设 0..3（默认 1 低）：0 默认 / 1 低 / 2 中 / 3 高，对 gzip 与 Brotli 同时生效。 */
    httpCompressLevel?: number;
    /**
     * 自动注入启动令牌（issue #380，默认 true）：LAN 设备首次访问 `GET /` 时
     * 由转发层自动补当前 dsh web launch token，上游铸造持久会话 cookie——固定
     * 局域网设备免手工拿 token（token 每次重启变化，只打印在本机终端）。
     * 开启 = 任何能网络到达本端口的客户端都免 token 获得完整控制权（等效信任
     * 整个 LAN）；关闭不吊销已发 cookie。详见 README「安全模型」。
     */
    injectToken?: boolean;
    /**
     * 向非回环页面声明 `ownsHost`（issue #856，默认 false）：**等同伪造上游拓扑
     * 事实位**。被服务页面本不该携带 `__DSH_TRANSPORT__`；开启后非回环页面会拿到
     * `{ ownsHost: true }`，上游据此把页面判为「Host 独占」而不再把设置面降级为
     * memory scope。被解锁的具体行为（设置持久化落盘、宿主原生「打开配置文件」）、
     * 远程页与本机页不再可区分的后果、关闭方法与 `ssh -L` 零伪造替代路径见 README
     * 「安全模型」。这是页面侧事实位声明，**不是服务端授权变化**。
     */
    ownsHostCompat?: boolean;
}
/** HTTP 压缩运行快照（issue #33 子项 3：GUI 可见的压缩生效状态）。 */
export interface HttpCompressSnapshot {
    /** 配置意图：HTTP 响应压缩开关。 */
    httpCompressEnabled: boolean;
    /** 压缩档位预设 0..3。 */
    httpCompressLevel: number;
    /** 是否实际挂载在存活转发器上（enabled 且配置开启且转发器监听中）。 */
    httpCompressMounted: boolean;
    /** 协商计数（compressed = 按协商压缩/计入口径，passthrough = 豁免直通）。 */
    httpCompressStats: {
        compressed: number;
        passthrough: number;
    };
}
/** 插件配置，由同名 schemastery schema 校验，也用于 GUI 设置面板渲染。
 * 显式注解（TS2883：全局命名空间合并致推断类型声明发射不可移植）+ 末尾 as 收口
 * （合并后的 Mode 条件类型使直接赋值判红 TS2322；as 保持类型面，值面无变化）。 */
export declare const Config: z<LanProxyConfig>;
/**
 * 默认配置（键集 = schema 中带 `.default()` 的字段）。从 schema 归一化**空输入**派生，
 * 不再手写第二份默认值——默认值只写在上面 schema 的 `.default(...)` 里，改一处即改两处。
 *
 * 为什么「归一化空输入」就是默认值：schemastery 对未带默认值的字段（tlsCertFile /
 * tlsKeyFile / tlsCaCertFile / targetPort）在结果里直接省略，故本对象的键集比 schema 字段数少 4。这是
 * 事实而非缺口——config-matrix 门禁的 N1/N2 正是锁这条不变式（键集与 normalizeConfig({}) 全等）。
 */
export declare const DEFAULT_CONFIG: LanProxyConfig;
/**
 * apply 的 resolve() 缺省兜底后的一份完整生效配置（**缺省值的事实源**）。
 *
 * 基础取 DEFAULT_CONFIG（= Config({})，schema 的缺省即此），再把 ResolvedConfig 里那 14 个
 * **必填**键的缺省显式补上——`z<LanProxyConfig>` 这个注解把 schema 的缺填性擦成了全可选，
 * 故 DEFAULT_CONFIG 的静态类型读不出「这些键恒有值」，只能在这里按域分组补一遍。
 * 两组与原先 resolve() 里的注释分组一致：监听面（地址/端口/上游/横幅）与投递面
 * （桥接/压缩/令牌/host trust）。tlsCertFile / tlsKeyFile / tlsCaCertFile / targetPort 无
 * `.default()`，故不在必填集里——缺省即 undefined。
 *
 * 为什么不在 apply 的 resolve() 里逐键 `??`：那份写法把每个键的缺省抄在 resolve 里，域内加一个
 * 带 `.default()` 的键却忘了在 resolve 补一条 `??`，症状是该键以 undefined 直达转发器（而不是
 * 落到缺省）。缺省现在只有这一处，且与 schema 同域。
 */
export declare const RESOLVED_DEFAULTS: ResolvedConfig;
/**
 * 归一化：把未知输入按 schema 校验并补默认值。
 * 与 `sanitizeSettings` 分工不同：本函数用于「给出一份完整配置」，后者用于「判断客户端
 * 提交的 patch 是否可信」（只做已知键 + 类型合法过滤，不补默认值）。
 */
export declare function normalizeConfig(input: unknown): LanProxyConfig;
/** 只接受布尔值的配置键（客户端 UI 按它渲染开关）；与 schema 里的 `z.boolean()` 字段一一对应。 */
export declare const BOOLEAN_KEYS: readonly string[];
/**
 * 非负整数键及其上界（默认值不得越界）。上界与 schema 里的 `.max(...)` 同值——两处都是
 * 声明，config-matrix 门禁的 N4 断言它们与 DEFAULT_CONFIG 一致，漂移即红。
 * `targetPort` 不在列：它无默认值、默认配置的键集里没有它（见上）。
 */
export declare const COUNT_LIMITS: Record<string, number>;
/**
 * 净化提交的配置（迁移过滤与客户端保存共用）：只接受已知键；任一键类型非法 →
 * 整体拒绝（返回 null，避免静默丢键造成"保存了但没生效"的困惑）；空字符串
 * 证书路径被剔除（保存通道据 raw 判定清除语义，迁移场景等价于未设置）。
 */
export declare function sanitizeSettings(raw: unknown): Partial<LanProxyConfig> | null;
/**
 * 存量 WS 压缩白名单归一化（issue #395 M2）：当白名单与旧默认
 * LEGACY_WSS_COMPRESS_PATHS 无序等价（忽略顺序、元素完全一致）时，归一化为
 * 新默认 DEFAULT_WSS_COMPRESS_PATHS（与 schema 默认值/客户端 placeholder 同源）；
 * 否则原样返回——undefined、空数组、含自定义路径的组合一律不做改写（尊重用户
 * 自定义，含废弃端点的自定义白名单同样保留）。导出供 resolve()、
 * migrateFileConfig() 与单测复用。
 */
export declare function normalizeLegacyWsCompressPaths(paths: readonly string[] | undefined): readonly string[] | undefined;
/** validateSettings 的校验结果：null = 全部合法。 */
export interface SettingInvalid {
    /** 首个非法的配置键名。 */
    key: string;
    /** 该键的合法范围描述（面向用户的文案）。 */
    hint: string;
}
/**
 * 校验客户端提交的配置（不净化）：返回首个非法键与其合法范围，全部合法返回
 * null（issue #33 子项 1）。遍历顺序与 sanitizeSettings 一致（FILE_CONFIG_VALIDATORS
 * 键序），保证「首个非法键」口径相同。导出供 smoke 单测。
 */
export declare function validateSettings(raw: unknown): SettingInvalid | null;
/** resolve() 合并后的完整生效配置（GET /config 的 effective 展示用）。 */
export interface ResolvedConfig {
    enabled: boolean;
    host: string;
    port: number;
    httpsEnabled: boolean;
    httpsPort: number;
    tlsCertFile?: string;
    tlsKeyFile?: string;
    tlsCaCertFile?: string;
    targetHost: string;
    targetPort?: number;
    printBanner: boolean;
    /** WS 桥接总开关（issue #552；默认 true，见 apply resolve）。 */
    wsBridgeEnabled: boolean;
    wsCompressEnabled: boolean;
    wsCompressPaths: readonly string[];
    wsDeflatePolicy: DeflatePolicy;
    httpCompressEnabled: boolean;
    httpCompressLevel: number;
    /** 自动注入启动令牌（issue #380；默认 true）。 */
    injectToken: boolean;
    /** 向非回环页面声明 `ownsHost`（issue #856；默认 false）。 */
    ownsHostCompat: boolean;
}
