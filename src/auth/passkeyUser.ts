import type { AuthStrategyResult } from "payload";

// Payload's generated user type does not include the runtime authentication fields used by this plugin.
type PasskeyUser = NonNullable<AuthStrategyResult["user"]> & {
    _sid?: string | undefined;
    _verified?: boolean | null | undefined;
    hasTotp?: boolean | null | undefined;
};

export type { PasskeyUser };
