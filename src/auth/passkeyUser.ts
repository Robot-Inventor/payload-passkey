import type { AuthStrategyResult } from "payload";

// Payload's generated user type does not include the runtime authentication fields used by this plugin.
type PasskeyUser = NonNullable<AuthStrategyResult["user"]> & {
    _sid?: string;
    _verified?: boolean;
    hasTotp?: boolean | null;
};

export type { PasskeyUser };
