/**
 * dsh-lan-proxy — 设置页插件卡（SettingsCard）。
 *
 * 行为：在插件管理页的 dsh-lan-proxy 行详情中渲染配置卡片：
 * - summary 只返回内联摘要，不加载 config/health；
 * - page 在非-li wrapper 中直接返回完整配置体。
 * - 启用开关 / LAN 端口 / HTTPS 开关与端口 / 证书与私钥文件 / CA 公钥文件与下载直链 / 启动横幅开关；
 * - 点「保存」经 loopback HTTP 配置路由提交增量 patch，宿主端转写官方 settings
 *   命名空间（scope.update/replace），scope.watch 触发转发器热更新（保存即热
 *   更新，无需重启 dsh web）。
 */
import * as React from "react";
import type { LanProxySettingsView } from "./shared/interface.js";
import { type HostTrustSignals } from "./host-trust-status.js";
import type { PluginConfigViewProps } from "@deepseek-ai/dsh-client-ui-plugin-manager/client";
/**
 * row entry 的 owner props 与卡片入参。view 决定摘要/页面分支；form 由 0.1.7-rc.2
 * Plugin Manager 传入，当前实现按任务边界保留既有 HTTP 配置写面。
 *
 * view / form 直接继承官方 PluginConfigViewProps（view: 'summary' | 'page'、
 * form?: ConfigPageForm | undefined），不另立镜像字段——官方改名或改形状在此判红。
 */
export interface SettingsCardProps extends PluginConfigViewProps {
    /** 调用方注入的宿主端默认值快照。 */
    defaults?: LanProxySettingsView;
    /** host trust 信号读取器（issue #856）；缺省时只读页面侧信号（无 ctx.remote）。 */
    hostTrustSignals?: () => HostTrustSignals;
}
/** 0.1.7-rc.2 row entry：summary 不挂载有副作用的页面表单，page 才加载完整配置。 */
export declare function SettingsCard(props: SettingsCardProps): React.ReactElement;
