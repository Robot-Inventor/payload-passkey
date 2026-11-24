import { type BetterAuthStrategyOptions, betterAuthStrategy } from "@delmaredigital/payload-better-auth";
import type { AuthStrategy } from "payload";
import type { PasskeyUser } from "./passkeyUser";

const payloadAuthStrategy = (options: BetterAuthStrategyOptions): AuthStrategy => {
    const strategy = betterAuthStrategy(options);
    const userCollection = options.usersCollection ?? "users";

    return {
        ...strategy,
        authenticate: async (args) => {
            const result = await strategy.authenticate(args);
            const collection = args.payload.collections[userCollection];

            if (!result.user) return result;

            const user: PasskeyUser = result.user;

            if (!collection) {
                return {
                    ...result,
                    user: null
                };
            }

            if (!collection.config.auth.verify) return result;

            // oxlint-disable-next-line no-underscore-dangle
            if (user._verified !== true) {
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
