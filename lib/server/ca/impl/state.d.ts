/** 证书配置态（health.caState 单一来源）。 */
export type CaState = "self-signed" | "managed" | "custom" | "error";
/** classifyCaState 入参（调用方传 resolve() 三键现值，本域不读配置存储）。 */
export interface CaStateInput {
    tlsCaCertFile?: string;
    tlsCertFile?: string;
    tlsKeyFile?: string;
}
/**
 * 托管路径判定（#930 F17 字面口径）：realpath(candidate) 落在
 * realpath(certsDir()) 内。文件缺失/链出即 false（fail-closed）。
 */
export declare function isManagedPath(candidate: string): boolean;
/**
 * 证书三态分类（#930 F7 真值表；F17 生成门控与 health.caState 同源）。
 * 自签/托管可一键动作；custom（用户资产）与 error（半套/缺文件）由动作端
 * 409 拒绝并指引（fail-closed，不自动改写用户文件）。
 */
export declare function classifyCaState(input: CaStateInput): CaState;
