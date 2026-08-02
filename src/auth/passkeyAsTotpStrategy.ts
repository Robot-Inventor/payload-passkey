import { type BetterAuthStrategyOptions, betterAuthStrategy } from "@delmaredigital/payload-better-auth";
import type { AuthStrategy } from "payload";

const normalizePathname = (pathname: string | null): string | undefined =>
    pathname?.replace(/^\//u, "").replace(/\/$/u, "");

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
            const isTotpInternalRequest =
                normalizedPathname === normalizePathname("/api/setup-totp") ||
                normalizedPathname === normalizePathname("/api/verify-totp");

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
