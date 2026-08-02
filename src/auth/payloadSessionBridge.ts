import { APIError, createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import type { AuthStrategyResult, BasePayload } from "payload";
import type { BetterAuthPlugin } from "better-auth";
import { setSessionCookie } from "better-auth/cookies";

// eslint-disable-next-line max-lines-per-function
const payloadSessionBridge = (payload: BasePayload): BetterAuthPlugin =>
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

                    // 型キャストしないと`_strategy`プロパティにアクセスできない
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                    const user = result.user as AuthStrategyResult["user"];
                    // eslint-disable-next-line no-underscore-dangle
                    const authenticationStrategy = user?._strategy;
                    const payloadUserID = user?.id;

                    if (typeof payloadUserID === "undefined") {
                        throw new APIError("UNAUTHORIZED", {
                            message: "A valid Payload local session is required"
                        });
                    }

                    // TOTPが設定済みの場合はTOTP、未設定の場合はパスワードで認証された場合に許可する
                    const hasTotp = user?.["hasTotp"];
                    const hasValidAuthenticationStrategy =
                        // `enableTotpCompatibility: true`の場合、TOTPが未設定でもパスキーでログインすると`totp`になる
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
