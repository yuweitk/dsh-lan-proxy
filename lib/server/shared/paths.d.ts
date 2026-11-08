/** 插件私有目录（自签证书缓存 + CA/叶子证书所在）。 */
export declare function pluginDir(): string;
/**
 * 一键 CA 证书子目录名（#930 F18：certs 子目录与文件名常量归本叶子，动作
 * 模块不硬编码 join；自签缓存仍在插件根（SELF_SIGNED_*），托管 CA/叶子独占
 * certs/，与自签缓存物理隔离——isManaged 谓词即以此为界）。
 */
export declare const CERTS_DIR_NAME = "certs";
/** 托管 CA 公钥文件名（下发源；固定名）。 */
export declare const CA_CERT_FILE = "ca-cert.pem";
/** 托管 CA 私钥文件名（固定名，永不进下发源；误指即 404 且响应不含私钥）。 */
export declare const CA_KEY_FILE = "ca-key.pem";
/** 托管叶子证书文件名（CA 签发，随 CA 一起生成与轮换）。 */
export declare const LEAF_CERT_FILE = "leaf-cert.pem";
/** 托管叶子私钥文件名（随 CA 一起生成与轮换）。 */
export declare const LEAF_KEY_FILE = "leaf-key.pem";
/** 托管证书文件名清单（装配层 resolvePluginDir files 清单共用同一来源）。 */
export declare const MANAGED_CERT_FILES: readonly string[];
/** 一键 CA 证书目录（pluginDir 下 certs/；调用方 mkdir 0700 后写入）。 */
export declare function certsDir(): string;
/** 旧版扁平目录（迁移源；调用方不得再向其写入）。 */
export declare function legacyPluginDir(): string;
