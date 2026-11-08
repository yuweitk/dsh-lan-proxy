/**
 * dsh-lan-proxy — 客户端文案字典（issue #348：复用官方 dsh-client-locale）。
 *
 * 双语平衡：`zh` 为 key 源；`en` 必须覆盖全部 key（编译期锁平衡）。
 * 动态数据用 `{name}` 占位模板，渲染期由 t 插值。
 * 宿主端稳定标识/事件名/配置键/console 日志不翻译（官方原则：数据不翻译）。
 */
/** 简体中文字典（key 源）。 */
export declare const zh: {
    readonly settingsName: "局域网访问（dsh-lan-proxy）";
    readonly settingsDescription: "LAN 端口 / HTTPS / 证书 / 响应压缩 / 启动横幅";
    readonly settingsLoading: "局域网访问：加载中…";
    readonly enable: "启用";
    readonly lanPort: "LAN 端口（HTTP）";
    readonly httpsCoexist: "HTTPS 并存";
    readonly httpsPort: "HTTPS 端口";
    readonly certFile: "证书文件（PEM）";
    readonly certPlaceholder: "留空 = 自动生成自签名证书";
    readonly keyFile: "私钥文件（PEM）";
    readonly keyPlaceholder: "与证书文件成对";
    readonly caCertFile: "CA 公钥文件（PEM，仅读）";
    readonly caCertPlaceholder: "留空 = 无 CA 可下发（自签/孤叶子不下发）";
    readonly caDownload: "移动设备安装证书";
    readonly caDownloadLink: "下载证书（.cer）";
    readonly caDownloadHint: "iPhone 用 Safari 点下载：安装描述文件后去“设置→通用→关于本机→证书信任设置”打开信任；Android 在“设置→安全→安装 CA 证书”（自包 WebView 需放行用户 CA）；Windows 双击 .cer 装进“受信任的根证书颁发机构（本地计算机）”。装完重开即零警告；无 CA 时链接 404（属正常：先一键生成本地 CA，或按提示配置 CA）。";
    readonly printBanner: "启动时打印访问地址";
    readonly wsBridge: "WebSocket 桥接（保活，默认开）";
    readonly wsCompress: "WebSocket 压缩（事件流）";
    readonly wsPaths: "压缩路径（逗号分隔）";
    readonly wsPathsHint: "仅控制压缩范围；清空 = 桥接不压缩，保活不受影响（手机端不再频繁断连重连）";
    readonly httpCompress: "HTTP 响应压缩（Brotli/gzip）";
    readonly compressLevel: "压缩档位";
    readonly level0: "默认（gzip 6 / br 4）";
    readonly level1: "低（最快：gzip 1 / br 2）";
    readonly level2: "中（均衡：gzip 5 / br 5）";
    readonly level3: "高（最高压缩比：gzip 9 / br 9）";
    readonly injectToken: "局域网免 token 直入";
    readonly injectTokenOnHint: "已开启：局域网内任何能访问该端口的设备都无需登录 token 即可完整控制 dsh（含终端命令执行），等效信任整个局域网。仅在可信家庭/办公内网开启；关闭后已登录设备的会话在有效期内仍然有效（约 30 天），不即时吊销。";
    readonly ownsHostCompat: "向非回环页面声明 ownsHost（兼容）";
    readonly ownsHostCompatHint: "已开启：向非回环页面声明 ownsHost，等同伪造上游拓扑事实位——远程页与本机页在界面上不再可区分。解锁的行为：设置持久化落盘 <DSH_HOME>/settings.yaml（文件不存在时新建）、宿主原生「打开配置文件」动作。这不是服务端授权变化（/api 围栏与 launch token / 会话 cookie 认证不变）。仅在你清楚后果时开启；零伪造替代路径见 README「安全模型」的 ssh -L 方案。";
    readonly hostTrustStatusLoopback: "拓扑事实位：本机页，设置持久化可用（无需兼容开关）";
    readonly hostTrustStatusCompat: "拓扑事实位：兼容模式已生效（本页已声明 ownsHost）";
    readonly hostTrustStatusDrift: "拓扑事实位告警：注入 marker 在，但上游 isLoopback 仍非 true——上游契约可能已漂移，本次注入很可能已失效，请按 dsh-upgrade 流程复核";
    readonly hostTrustStatusOff: "拓扑事实位：本页设置面不可用（上游已按非回环页面降级为内存 scope）。开启上方兼容开关并重新加载本页即可恢复持久化设置。";
    readonly hostTrustHostFacts: "宿主侧事实：兼容开关 {compat}";
    readonly hostTrustOn: "开";
    readonly hostTrustOff: "关";
    readonly bodyHint: "保存即热更新（配置写入宿主统一设置存储，无需重启 dsh web）。修改后内网设备访问新端口，旧端口立即失效。";
    readonly compressOff: "HTTP 响应压缩：已关闭";
    readonly compressInactive: "HTTP 响应压缩：未生效";
    readonly compressOn: "HTTP 响应压缩：已启用 · 协商 {neg} 次 · 直通 {pass} 次";
    readonly caModeSelfSigned: "证书状态：自签模式（无 CA，下载不可用）";
    readonly caModeManaged: "证书状态：托管 CA（下载可用）";
    readonly caModeCustom: "证书状态：自定义证书（一键生成已禁用）";
    readonly caConfigError: "证书状态：配置异常（三键不完整或托管文件缺失）";
    readonly caDisabledNoCa: "未配置可用 CA：下载链接将 404。先一键生成本地 CA，或配置 CA 公钥。";
    readonly caFilesMissing: "托管文件缺失或三键不完整：清空证书三键回自签后可重新生成，或恢复缺失文件。";
    readonly caGenerate: "一键生成本地 CA";
    readonly caRotate: "轮换叶子证书";
    readonly caRotateCa: "轮换 CA（危险）";
    readonly caConfirmTitle: "确认证书操作";
    readonly caConfirmCancel: "取消";
    readonly caClearSelfSigned: "一键清空回自签";
    readonly caRevisionStale: "配置版本未知，请刷新后重试";
    readonly caConfirmBody: "继续将覆盖现有证书材料（旧材料保留最近一次备份）。默认仅轮换叶子：CA 续用，已装设备零操作；轮换 CA 将使已装设备的信任全部失效，需逐台重新安装。";
    readonly caIpChanged: "局域网 IP 已变化（当期 {ips}）：叶子 SAN 未覆盖，建议轮换叶子（CA 不变）";
    readonly caExpiring: "叶子证书即将到期（{date}）：建议轮换叶子（CA 不变）";
    readonly caGeneratedOk: "证书已生成并生效";
    readonly caGenerateFail: "生成失败：{msg}";
    readonly loadFail: "设置加载失败：{msg}";
    readonly portRangeFail: "保存失败：LAN 端口（HTTP）需为 1-65535 的整数";
    readonly httpsPortRangeFail: "保存失败：HTTPS 端口需为 1-65535 的整数";
    readonly levelRangeFail: "保存失败：压缩档位需为 0-3 的整数";
    readonly unchanged: "未修改";
    readonly savedOk: "已保存，已热更新";
    readonly saveFailConflict: "保存失败：{msg}（请关闭本卡片重新打开后重试）";
    readonly saveFail: "保存失败：{msg}";
    readonly save: "保存";
};
/** 字典 key 并集（LocaleNamespaceMap 声明合并用）。 */
export type LanProxyLocaleKey = keyof typeof zh;
/** 英文词典：必须与 zh key 完整对齐。 */
export declare const en: Record<LanProxyLocaleKey, string>;
