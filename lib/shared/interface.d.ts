/**
 * dsh-lan-proxy — 插件行身份的包内唯一事实源。
 *
 * row ID 面向 Plugin Manager；settings namespace 面向官方持久化。
 * 两者保持 v0.2.5 已发布的独立身份，row config key 仍由 row ID 派生。
 */
/** standalone 与聚合安装共享的 canonical 插件行身份。 */
export declare const LAN_PROXY_IDENTITY: Readonly<{
    bundlePackage: "@wingsky-1/dsh-lan-proxy";
    rowId: "dsh-lan-proxy";
    settingsNamespace: "dsh-lan-proxy";
    rowConfigKey: "@wingsky-1/dsh-lan-proxy#dsh-lan-proxy";
}>;
