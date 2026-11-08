import type { WebRoute } from "@deepseek-ai/dsh-host-webserver";
import type { HttpCompressSnapshot, ResolvedConfig } from "./model.js";
import type { DownloadCertResult } from "../../tls/interface.js";
/** 与客户端共享的路由（单一来源；客户端经 shared/contract.ts 镜像 + __DSH_ROUTES__ 注入消费）。 */
export declare const ROUTES: {
    health: string;
    /** 配置读写路由：GET 快照 / PUT patch（loopback 围栏）。 */
    config: string;
    /** CA/自签证书下发路由：GET 只读（loopback 围栏；issue #911 移动设备安装信任用）。 */
    caCert: string;
    /**
     * 一键 CA 动作路由：POST 只写（loopback 围栏；#930 Phase 2 自签首建 / 托管轮换）。
     * 处理器归 ca 域（buildCaActionRoutes），本表只收路径名（F16 ROUTES 单源；
     * 本文件头“只服务配置读写”指处理器归属，路径名作为共享来源例外——caCert
     * 路由同例：路径在此、语义在 tls 域）。
     */
    caGenerate: string;
};
/** buildConfigRoutes 的依赖注入面（apply 内装配；smoke 用 fake 直接构造）。 */
export interface ConfigRouteDeps {
    /** 当前生效配置（含默认值兜底）。 */
    resolve(): ResolvedConfig;
    /** 用户层原始节与 revision（descriptor.user / descriptor.revision）。 */
    readUser(): {
        user: Record<string, unknown>;
        revision?: number;
    };
    /** settings 服务是否可用（决定 PUT 是否可写）。 */
    writable(): boolean;
    /** 增量 merge patch 进用户层。 */
    update(patch: object, expectedRevision?: number): Promise<void>;
    /** 整节替换用户层（清除证书路径的 unset 语义）。 */
    replace(section: object, expectedRevision?: number): Promise<void>;
    /** HTTP 压缩运行快照。 */
    compress(): HttpCompressSnapshot;
    /** 服务端日志兜底（写入异常原文只进日志，不进响应 details）。 */
    logWarn?(message: string): void;
}
/** applyConfigPatch 的结果。 */
export type PatchResult = {
    ok: true;
    value: {
        user: Record<string, unknown>;
        revision?: number;
    };
} | {
    ok: false;
    status: number;
    code: string;
    details: string;
};
/**
 * 配置保存纯函数（PUT /config 的主体，独立导出供 smoke 单测）：
 * validate 定位首个非法键 → sanitize 净化 → tls 成对校验 → 写入官方存储。
 * 默认走 update 增量 merge；仅当 raw patch 以空字符串表达「清除证书路径」时
 * 走 replace（update 是 merge 语义无法 unset，owner scope 无 mutate 面）：
 * 从当前用户层复制全节、剔除被清除的键后整节替换，其余语义不变。
 */
export declare function applyConfigPatch(deps: ConfigRouteDeps, payload: unknown): Promise<PatchResult>;
/**
 * 组装配置路由（GET 读快照 + PUT 写 patch；loopback 围栏 + 方法白名单）。
 * 导出供 smoke 单测（fake deps，不依赖网络）。
 */
export declare function buildConfigRoutes(deps: ConfigRouteDeps): WebRoute[];
/**
 * buildCaCertRoutes 的依赖注入面（apply 内装配；单测用 fake 直接构造）。
 *
 * 证书装配由 tls 域提供（loadDownloadableCertificate），本域不读证书文件、
 * 不引 tls 值——跨域值边在此终结，装配层组合两域（prepareTls 同口径）。
 */
export interface CaCertRouteDeps {
    /** 证书装配器（逐请求调用，tlsCaCertFile 热更新即时生效）。 */
    loadCertificate(format: "der" | "pem"): DownloadCertResult;
}
export declare function buildCaCertRoutes(deps: CaCertRouteDeps): WebRoute[];
