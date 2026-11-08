import { Buffer } from "node:buffer";
/** TLS 证书材料（PEM 字符串或 Buffer）。 */
export interface TlsMaterials {
    key: string | Buffer;
    cert: string | Buffer;
}
/** 自签证书缓存文件名（目录由调用方决定，见 shared/paths.ts 的命名空间目录）。 */
export declare const SELF_SIGNED_KEY = "dsh-lan-proxy-key.pem";
export declare const SELF_SIGNED_CERT = "dsh-lan-proxy-cert.pem";
/** selfsigned subjectAltName 条目（type 7 = IP 字面量，type 2 = DNS 名）。 */
export interface SanAltName {
    type: 2 | 7;
    value?: string;
    ip?: string;
}
/** 把主机名/IP 编码为 selfsigned SAN 条目（IP 字面量走 ip 字段，其余走 DNS value）。 */
export declare function toSanEntry(host: string): SanAltName;
/**
 * 取首个 CERTIFICATE 块的 DER（issue #911 下发端用）。
 *
 * 接受 PEM（含链/私钥混排时跳过非证书块取首个证书）或 DER 二进制；纯私钥/
 * 垃圾一律抛错（调用方映射为 404，原文只进日志）。实测：私钥在前 + 证书
 * 在后照样解析出证书（只出公钥 material，私钥永不出网），故“误指私钥文件”
 * 仅在文件不含任何 CERTIFICATE 块时成立。X509Certificate 的首证书语义恰好
 * 就是“首证书”口径，无需手写 PEM 切分。
 */
export declare function extractFirstCertificateDer(input: string | Buffer): Buffer;
/** DER → 单证书 PEM 文本（下发 ?format=pem 用；base64 64 列换行）。 */
export declare function encodeCertificatePem(der: Buffer): string;
/** 下发失败码（对外固定文案，原文只进日志）。 */
export type DownloadCertCode = "ca-unconfigured" | "ca-unavailable" | "ca-invalid";
/** loadDownloadableCertificate 入参（调用方传值，本域不读配置存储）。 */
export interface DownloadCertSource {
    tlsCaCertFile?: string;
    tlsCertFile?: string;
    tlsKeyFile?: string;
    /** 自签回退目录（apply 经 resolvePluginDir 抉择后传入）。 */
    selfSignedDir: string;
}
/** loadDownloadableCertificate 结果（body 已按格式编码，附下发元信息）。 */
export type DownloadCertResult = {
    ok: true;
    body: Buffer;
    contentType: string;
    filename: string;
} | {
    ok: false;
    code: DownloadCertCode;
};
/**
 * 可下发证书装配（issue #911 下发面，#930 Phase 1 收紧为无 CA 不下发；证书知识
 * 只归本域，调用方只给值不读文件）。
 *
 * 两态：配 CA → 返回 CA 公钥；无 CA（一律 404 ca-unconfigured）→ 自签模式与
 * 自定义叶子模式都不下发（自签叶子/孤叶子装了建不起信任，返回即误导）。只伺服
 * 首个 CERTIFICATE 块（含链/混排跳过非证书块；纯私钥/垃圾 → ca-invalid）。
 * format 仅 der/pem（调用方 routes 层已白名单，非法不进本函数）。
 */
export declare function loadDownloadableCertificate(source: DownloadCertSource, format: "der" | "pem", logWarn?: (message: string) => void): DownloadCertResult;
/** 读取用户提供的 PEM 证书与私钥文件。 */
export declare function loadTlsFromFiles(certFile: string, keyFile: string): TlsMaterials;
/** ensureSelfSignedTls 选项。 */
export interface SelfSignedOptions {
    /** 证书缓存目录（自动创建）。 */
    dir: string;
    /** 额外加入 SAN 的主机名/局域网 IP（如本机全部非回环 IPv4）。 */
    extraSans?: string[];
}
/** 证书是否仍然有效（存在、可解析、剩余有效期 > 24 小时）。 */
export declare function certStillValid(certPath: string): boolean;
/**
 * 幂等获取自签名证书材料：缓存目录里已有未过期证书则直接复用，
 * 否则用 selfsigned 生成（rsa:2048 / sha256 / 825 天 / 带 SAN）并落盘缓存。
 * 生成失败时抛错（调用方降级为 HTTP-only）。
 */
export declare function ensureSelfSignedTls(options: SelfSignedOptions): TlsMaterials;
/** 一键 CA 全套材料（PEM 文本；落盘与 scope 写入归 ca 域，本函数不碰 FS/scope）。 */
export interface CaAndLeafMaterials {
    caCert: string;
    caKey: string;
    leafCert: string;
    leafKey: string;
}
/** 仅轮换叶子时的新叶子材料（PEM 文本；CA 续用，已装设备零操作）。 */
export interface LeafMaterials {
    leafCert: string;
    leafKey: string;
}
/**
 * 一键生成本地 CA 全套（#930 F2 纯函数：只回答证书字节，不碰 FS/scope；
 * 调用方（ca 域）负责 temp+rename 落盘与 scope 写入）。
 *
 * 两次 RSA-2048 均为回调式异步（F5）；签名段为同步 forge 运算（ms 级，验证列实测）。
 * 失败抛错（调用方映射 500 ca-generate-failed，原文只进日志）。
 */
export declare function generateCaAndLeaf(extraSans: string[]): Promise<CaAndLeafMaterials>;
/**
 * 仅轮换叶子（#930 F10 默认动作：CA 续用，已装设备零操作）。
 *
 * CA 公私钥由调用方从托管文件读入（路径合法性由 ca 域 isManaged 判定，本函数
 * 只做 PEM 解析与签发）；新叶子 398 天 + 同口径 SAN（调用方传当期 extraSans
 * 快照，IP 变化即跟进）。失败抛错（同 generateCaAndLeaf 映射）。
 */
export declare function generateLeafSignedByCa(caCertPem: string, caKeyPem: string, extraSans: string[]): Promise<LeafMaterials>;
/** 叶子证书摘要（health certInfo 载荷；只出日期/SAN，不出路径/PEM）。 */
export type LeafCertSummary = {
    ok: true;
    validTo: string;
    sans: string[];
} | {
    ok: false;
};
/**
 * 读叶子证书摘要（#930 F8 数据源：health.certInfo 当期值）。
 *
 * 读不出/解析不出即 { ok: false }（调用方 health 置 certInfo null，不提醒；
 * 下发端仍按三态如实 404，见 loadDownloadableCertificate）。SAN 取
 * X509Certificate.subjectAltName 原串按“, ”切分（DNS:/IP Address: 前缀保留，
 * 客户端只做包含比对，不过滤——丢前缀等于丢信息）。
 */
export declare function readLeafCertInfo(certPath: string): LeafCertSummary;
