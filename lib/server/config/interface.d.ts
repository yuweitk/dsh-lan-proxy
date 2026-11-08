/**
 * 配置域对外承诺：schema 与类型、校验与净化、存量归一化、官方 settings 命名空间
 * 接线、loopback HTTP 配置面。
 *
 * 写面（applyConfigPatch / scope.update）与读面（Config / DEFAULT_CONFIG）同域，
 * 因为「什么算合法配置」只有一个答案；迁移域经本域写面落盘。
 */
export { Config, DEFAULT_WSS_COMPRESS_PATHS, RESOLVED_DEFAULTS, normalizeLegacyWsCompressPaths, sanitizeSettings, validateSettings, } from "./impl/model.js";
export type { HttpCompressSnapshot, LanProxyConfig, ResolvedConfig, SettingInvalid, } from "./impl/model.js";
export { SETTINGS_NS, installLanProxySettings, warnLog } from "./impl/namespace.js";
export type { LanProxySettingsHooks, OwnerScopeLike, SettingsDescriptorLike, SettingsServiceLike, } from "./impl/namespace.js";
export { ROUTES, applyConfigPatch, buildCaCertRoutes, buildConfigRoutes } from "./impl/routes.js";
export type { CaCertRouteDeps, ConfigRouteDeps, PatchResult } from "./impl/routes.js";
