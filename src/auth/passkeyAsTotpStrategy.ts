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

            const isTotpVerificationRequest =
                normalizePathname(args.headers.get("x-pathname")) === normalizePathname("/api/verify-totp");

            return {
                ...result,
                user: {
                    ...result.user,
                    // パスキー認証の`_strategy`を`totp`に設定することでpayload-totpとの互換性を維持する
                    // ここの処理を変更する場合は`./payloadSessionBridge.ts`も変更する
                    _strategy: isTotpVerificationRequest ? strategy.name : "totp"
                }
            };
        }
    } as const satisfies AuthStrategy;
};

export { passkeyAsTotpStrategy };
