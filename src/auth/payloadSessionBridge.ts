import { APIError, createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import type { AuthStrategyResult, BasePayload, CollectionSlug } from "payload";
import type { BetterAuthPlugin } from "better-auth";
import { setSessionCookie } from "better-auth/cookies";

// eslint-disable-next-line max-lines-per-function
const payloadSessionBridge = (payload: BasePayload, userCollection: CollectionSlug): BetterAuthPlugin =>
    ({
        id: "payload-session-bridge",
        endpoints: {
            createSessionFromPayload: createAuthEndpoint(
                "/payload-session-bridge",
                {
                    method: "POST",
                    requireHeaders: true
                },
                // eslint-disable-next-line max-lines-per-function, max-statements
                async (ctx) => {
                    const { headers } = ctx;

                    const origin = headers.get("origin");

                    if (
                        !origin ||
                        !ctx.context.isTrustedOrigin(origin, {
                            allowRelativePaths: false
                        })
                    ) {
                        throw new APIError("FORBIDDEN", {
                            message: "Untrusted origin"
                        });
                    }

                    const result = await payload.auth({
                        headers
                    });

                    // The type assertion is required to access the `_strategy` property
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                    const user = result.user as AuthStrategyResult["user"];

                    if (user?.collection !== userCollection) {
                        throw new APIError("UNAUTHORIZED", {
                            message: "A valid Payload local session is required"
                        });
                    }

                    // eslint-disable-next-line no-underscore-dangle
                    const authenticationStrategy = user._strategy;
                    const payloadUserID = user.id;

                    // Allow TOTP authentication when TOTP is configured, or password authentication when it is not
                    const hasTotp = user["hasTotp"] as boolean | null | undefined;
                    const hasValidAuthenticationStrategy =
                        // With `enableTotpCompatibility: true`, passkey login results in `totp` even when TOTP is not configured
                        // Ref: ./passkeyAsTotpStrategy.ts
                        authenticationStrategy === "totp" ||
                        (!hasTotp && ["local-jwt", "better-auth"].includes(authenticationStrategy ?? ""));
                    if (!hasValidAuthenticationStrategy) {
                        throw new APIError("UNAUTHORIZED", {
                            message: "A valid Payload local session is required"
                        });
                    }

                    const existingSession = await getSessionFromCtx(ctx);

                    if (existingSession) {
                        if (String(payloadUserID) !== existingSession.user.id) {
                            throw new APIError("FORBIDDEN", {
                                message: "Payload and Better Auth sessions belong to different users"
                            });
                        }

                        return ctx.json({
                            success: true,
                            created: false
                        });
                    }

                    const betterAuthUser = await ctx.context.internalAdapter.findUserById(String(payloadUserID));

                    if (!betterAuthUser) {
                        throw new APIError("UNAUTHORIZED", {
                            message: "User was not found"
                        });
                    }

                    const session = await ctx.context.internalAdapter.createSession(String(payloadUserID));

                    await setSessionCookie(ctx, {
                        session,
                        user: betterAuthUser
                    });

                    return ctx.json({
                        success: true,
                        created: true
                    });
                }
            )
        }
    }) as const satisfies BetterAuthPlugin;

export { payloadSessionBridge };
