import { type BetterAuthStrategyOptions, betterAuthStrategy } from "@delmaredigital/payload-better-auth";
import type { AuthStrategy } from "payload";

const normalizePathname = <T extends string | null>(pathname: T): T extends string ? string : undefined =>
    pathname?.replace(/^\/+|\/+$/gu, "") as T extends string ? string : undefined;

const passkeyAsTotpStrategy = (betterAuthStrategyOptions: BetterAuthStrategyOptions): AuthStrategy => {
    const strategy = betterAuthStrategy(betterAuthStrategyOptions);

    return {
        ...strategy,
        authenticate: async (args) => {
            const result = await strategy.authenticate(args);
            if (!result.user) {
                return result;
            }

            const normalizedPathname = normalizePathname(args.headers.get("x-pathname"));
            const normalizedApiRoute = normalizePathname(args.payload.config.routes.api);
            const isTotpInternalRequest =
                normalizedPathname === normalizePathname(`${normalizedApiRoute}/setup-totp`) ||
                normalizedPathname === normalizePathname(`${normalizedApiRoute}/verify-totp`);

            return {
                ...result,
                user: {
                    ...result.user,
                    // Preserve compatibility with payload-totp by setting the passkey authentication `_strategy` to `totp`
                    // If this logic changes, update `./payloadSessionBridge.ts` as well
                    _strategy: isTotpInternalRequest ? strategy.name : "totp"
                }
            };
        }
    } as const satisfies AuthStrategy;
};

export { passkeyAsTotpStrategy };
