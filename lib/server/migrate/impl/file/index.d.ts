import type { OwnerScopeLike } from "../../../config/interface.js";
/** 迁移备份文件名（同时是幂等标记：存在即「已处理过」）。 */
export declare const MIGRATED_BAK_NAME = "config.json.migrated.bak";
/** migrateFileConfig 的结果（导出供单测断言）。 */
export interface MigrationOutcome {
    /** 本次是否执行了改名标记（false = config.json 不存在，或仅从中断态重放）。 */
    performed: boolean;
    /** 是否有有效键写入了 owner scope（含中断态重放成功）。 */
    migrated: boolean;
    /** 写入失败后是否已回滚改名（config.json 已还原）。 */
    rolledBack: boolean;
    /** 损坏/空 JSON：仅改名标记、不写入（防固化 schema 默认值）。 */
    skippedCorrupt: boolean;
    /** 本次是否为中断态重放（.bak 存在且 config.json 不存在）。 */
    resumed: boolean;
}
/**
 * 存量 config.json 一次性迁移到官方 settings 命名空间（rename-first marker）。
 *
 * 时序（issue #110 修订路线）：
 * 0. 中断态（`.bak` 存在且 `config.json` 不存在，即上次改名后写入未完成）→
 *    从 bak 重放写入（见 resumeMigrateFromBak），不静默跳过；
 * 1. `config.json` 不存在（且无中断态残留）→ 直接返回（幂等：二次启动跳过）；
 * 2. 先原子改名 `config.json` → `config.json.migrated.bak`（POSIX rename 原子；
 *    Windows 目标已存在会抛错，故先 unlink 旧 bak——bak 仅是保险副本，被新的
 *    用户手动恢复内容取代可接受）；改名成功即视为「已处理」，无论后续成败；
 * 3. 解析 bak：损坏/非对象/无有效键 → 到此为止（只标记不写入，避免把 schema
 *    默认值固化进用户层、压制后续默认值演进）；
 * 4. sanitizeSettings 过滤后经新 update 写面增量写入（owner scope.update：只写文件里
 *    显式存在的键，schema 默认保持动态兜底——spike 结论优先 update，replace 仅当
 *    需要整节割接时使用；dsh 0.1.7-rc.1 引入、rc.2 沿用的同语义由条目 id 寻址，签名见 OwnerScopeLike）；
 * 5. 写入失败 → 回滚改名（bak 还原为 config.json）并 warn，下次启动重试。
 *
 * 必须在 settings 服务 attach 后调用（installLanProxySettings 的 onScope 内），
 * 且先于任何 enabled 早退——禁用用户跨版本升级同样要完成迁移。
 */
export declare function migrateFileConfig(configDir: string, scope: Pick<OwnerScopeLike, "update">, logger?: {
    warn?: (...a: unknown[]) => void;
}): Promise<MigrationOutcome>;
