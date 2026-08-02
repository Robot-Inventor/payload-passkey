import { type BetterAuthStrategyOptions, betterAuthStrategy } from "@delmaredigital/payload-better-auth";
import type { AuthStrategy } from "payload";

const payloadAuthStrategy = (options: BetterAuthStrategyOptions): AuthStrategy => {
    const strategy = betterAuthStrategy(options);
    const userCollection = options.usersCollection ?? "users";

    return {
        ...strategy,
        authenticate: async (args) => {
            const result = await strategy.authenticate(args);
            const collection = args.payload.collections[userCollection];

            if (!result.user) return result;

            if (!collection) {
                return {
                    ...result,
                    user: null
                };
            }

            if (!collection.config.auth.verify) return result;

            if (result.user["_verified"] !== true) {
                return {
                    ...result,
                    user: null
                };
            }

            return result;
        }
    } as const satisfies AuthStrategy;
};

export { payloadAuthStrategy };
