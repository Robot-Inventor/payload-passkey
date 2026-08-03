import { APIError, createAuthEndpoint, freshSessionMiddleware, getSessionFromCtx } from "better-auth/api";
import {
    AUTH_ERROR_CODES,
    PASSKEY_FRESH_AGE_SECONDS,
    PAYLOAD_SESSION_BRIDGE_PATH,
    PAYLOAD_SESSION_BRIDGE_RATE_LIMIT_MAX_REQUESTS,
    PAYLOAD_SESSION_BRIDGE_RATE_LIMIT_WINDOW_SECONDS
} from "../constants";
import type { AuthStrategyResult, BasePayload, CollectionSlug } from "payload";
import type { BetterAuthPlugin } from "better-auth";
import { setSessionCookie } from "better-auth/cookies";

type PayloadSessionUser = NonNullable<AuthStrategyResult["user"]> & {
    _sid?: string;
};

const isFreshPayloadSession = (user: PayloadSessionUser): boolean => {
    // eslint-disable-next-line no-underscore-dangle
    const sessionID = user._sid;
    const createdAt = user.sessions?.find(({ id }) => id === sessionID)?.createdAt;

    if (!createdAt) return false;

    const age = Date.now() - new Date(createdAt).getTime();

    // eslint-disable-next-line no-magic-numbers
    return age >= 0 && age < PASSKEY_FRESH_AGE_SECONDS * 1000;
};

const getFreshUntil = (createdAt: Date): number =>
    // eslint-disable-next-line no-magic-numbers
    createdAt.getTime() + PASSKEY_FRESH_AGE_SECONDS * 1000;

const isFreshSession = (createdAt: Date): boolean => {
    const createdAtTime = createdAt.getTime();
    const freshUntil = getFreshUntil(createdAt);
    const now = Date.now();

    return now >= createdAtTime && now < freshUntil;
};

const throwStepUpRequired = (): never => {
    throw new APIError("FORBIDDEN", {
        code: AUTH_ERROR_CODES.STEP_UP_REQUIRED,
        message: "Recent authentication is required"
    });
};

// eslint-disable-next-line max-lines-per-function
const payloadSessionBridge = (payload: BasePayload, userCollection: CollectionSlug): BetterAuthPlugin =>
    ({
        id: "payload-session-bridge",
        rateLimit: [
            {
                pathMatcher: (path) => path === PAYLOAD_SESSION_BRIDGE_PATH,
                window: PAYLOAD_SESSION_BRIDGE_RATE_LIMIT_WINDOW_SECONDS,
                max: PAYLOAD_SESSION_BRIDGE_RATE_LIMIT_MAX_REQUESTS
            }
        ],
        endpoints: {
            createSessionFromPayload: createAuthEndpoint(
                PAYLOAD_SESSION_BRIDGE_PATH,
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

                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                    const user = result.user as PayloadSessionUser | null;

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

                        if (!isFreshSession(existingSession.session.createdAt)) {
                            throwStepUpRequired();
                        }

                        const freshUntil = getFreshUntil(existingSession.session.createdAt);

                        return ctx.json({
                            success: true,
                            created: false,
                            freshUntil
                        });
                    }

                    if (!isFreshPayloadSession(user)) {
                        throwStepUpRequired();
                    }

                    const betterAuthUser = await ctx.context.internalAdapter.findUserById(String(payloadUserID));
                    if (!betterAuthUser) {
                        throw new APIError("UNAUTHORIZED", {
                            message: "User was not found"
                        });
                    }

                    const session = await ctx.context.internalAdapter.createSession(String(payloadUserID));
                    const freshUntil = getFreshUntil(session.createdAt);

                    await setSessionCookie(ctx, {
                        session,
                        user: betterAuthUser
                    });

                    return ctx.json({
                        success: true,
                        created: true,
                        freshUntil
                    });
                }
            )
        },
        hooks: {
            before: [
                {
                    matcher: ({ path }) => path === "/passkey/delete-passkey" || path === "/passkey/update-passkey",
                    handler: freshSessionMiddleware
                }
            ]
        }
    }) as const satisfies BetterAuthPlugin;

export { payloadSessionBridge };
