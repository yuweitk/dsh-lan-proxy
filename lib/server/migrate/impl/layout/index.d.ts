/** 旧文件归档后缀（与 MIGRATED_BAK_NAME 同族的处理过标记）。 */
export declare const LEGACY_BAK_SUFFIX = ".migrated.bak";
/** resolvePluginDir 入参（文件名由调用方传入：自签 key/cert 名归 tls 域，config.json 名归本域）。 */
export interface LayoutMigrateOptions {
    /** 随目录迁移的文件名（含分隔符的一律跳过，防路径穿越）。 */
    files: readonly string[];
    /** 服务端日志兜底（失败只记日志，由返回值告知调用方降级）。 */
    logger?: {
        warn?: (...args: unknown[]) => void;
    };
}
/** resolvePluginDir 结果。 */
export interface LayoutMigrateOutcome {
    /** 本轮生效目录（新旧二选一；调用方全程只用它）。 */
    dir: string;
    /** 本次实际搬运的文件名。 */
    moved: string[];
    /** 是否回落旧目录（搬运失败且已回滚）。 */
    fallback: boolean;
}
/**
 * 旧目录迁出并抉择本轮生效目录（同步；装配期最先跑，先于 prepareTls 与
 * migrateFileConfig——两者都读写本返回值目录）。
 */
export declare function resolvePluginDir(options: LayoutMigrateOptions): LayoutMigrateOutcome;
