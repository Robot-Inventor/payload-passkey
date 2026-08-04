import { beforeEach, describe, expect, it, vi } from "vitest";
import { PASSKEY_FRESH_AGE_SECONDS } from "../constants";
import type { PayloadPasskeyOptions } from "../types";

const bridgeMocks = vi.hoisted(() => ({
    getSessionFromCtx: vi.fn(),
    setSessionCookie: vi.fn(),
    freshSessionMiddleware: vi.fn(),
    createAuthEndpoint: vi.fn()
}));

const millisecondsPerSecond = 1000;
const oneMillisecond = 1;
const freshnessToleranceSeconds = 1;

class TestAPIError extends Error {
    public code: string | undefined;

    public constructor(_name: string, body: { code?: string; message?: string }) {
        super(body.message);
        this.code = body.code;
    }
}

vi.mock("better-auth/api", () => ({
    APIError: TestAPIError,
    createAuthEndpoint: bridgeMocks.createAuthEndpoint,
    freshSessionMiddleware: bridgeMocks.freshSessionMiddleware,
    getSessionFromCtx: bridgeMocks.getSessionFromCtx
}));

vi.mock("better-auth/cookies", () => ({
    setSessionCookie: bridgeMocks.setSessionCookie
}));

type Endpoint = (context: unknown) => Promise<unknown>;

interface TestContext {
    context: {
        internalAdapter: {
            createSession: ReturnType<typeof vi.fn>;
            findUserById: ReturnType<typeof vi.fn>;
        };
        isTrustedOrigin: ReturnType<typeof vi.fn>;
    };
    headers: Headers;
    json: ReturnType<typeof vi.fn>;
    payload: { auth: ReturnType<typeof vi.fn> };
}

const createPayloadUser = (overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
    collection: "users",
    id: "user-1",
    _sid: "payload-session-1",
    _strategy: "better-auth",
    hasTotp: false,
    sessions: [
        {
            id: "payload-session-1",
            createdAt: new Date(Date.now() - millisecondsPerSecond)
        }
    ],
    ...overrides
});

const makeTestContext = (payloadUser: Record<string, unknown> | null = createPayloadUser()): TestContext => {
    const json = vi.fn((body: unknown) => body);
    const context = {
        headers: new Headers({ origin: "https://example.com" }),
        context: {
            internalAdapter: {
                createSession: vi.fn(() => ({ createdAt: new Date() })),
                findUserById: vi.fn(() => ({ id: "user-1" }))
            },
            isTrustedOrigin: vi.fn(() => true)
        },
        json,
        payload: {
            auth: vi.fn(() => ({ user: payloadUser }))
        }
    };

    return context;
};

const getEndpoint = async (
    payload: unknown = {},
    enableTotpCompatibility: PayloadPasskeyOptions["enableTotpCompatibility"] = false
): Promise<Endpoint> => {
    const { payloadSessionBridge } = await import("./payloadSessionBridge");
    const plugin = payloadSessionBridge(payload as never, "users", enableTotpCompatibility);

    return plugin.endpoints?.["createSessionFromPayload"] as unknown as Endpoint;
};

const configureBridgeMocks = (): void => {
    vi.clearAllMocks();
    bridgeMocks.createAuthEndpoint.mockImplementation(
        (_path: string, _options: unknown, handler: (context: unknown) => unknown): ((context: unknown) => unknown) =>
            handler
    );
    bridgeMocks.getSessionFromCtx.mockResolvedValue(null);
};

const expectFreshUntil = (freshUntil: unknown): void => {
    const now = Date.now();

    expect(typeof freshUntil).toBe("number");
    expect(freshUntil).toBeGreaterThan(now);
    expect(freshUntil).toBeLessThanOrEqual(
        now + (PASSKEY_FRESH_AGE_SECONDS + freshnessToleranceSeconds) * millisecondsPerSecond
    );
};

describe("payloadSessionBridge session creation", () => {
    beforeEach(configureBridgeMocks);

    it("reports a newly created session for a fresh Payload session", async () => {
        const requestContext = makeTestContext();
        const endpoint = await getEndpoint(requestContext.payload);

        const response = (await endpoint(requestContext)) as Record<string, unknown>;

        expect(response).toMatchObject({ success: true, created: true });
        expectFreshUntil(response["freshUntil"]);
    });

    it("reports an existing fresh Better Auth session", async () => {
        const requestContext = makeTestContext();
        const endpoint = await getEndpoint(requestContext.payload);
        bridgeMocks.getSessionFromCtx.mockResolvedValue({
            user: { id: "user-1" },
            session: { createdAt: new Date(Date.now() - millisecondsPerSecond) }
        });

        const response = (await endpoint(requestContext)) as Record<string, unknown>;

        expect(response["success"]).toBe(true);
        expect(response["created"]).toBe(false);
        expectFreshUntil(response["freshUntil"]);
    });

    it("bridges a TOTP-enabled user when TOTP compatibility is disabled", async () => {
        const requestContext = makeTestContext(createPayloadUser({ hasTotp: true }));
        const endpoint = await getEndpoint(requestContext.payload, false);

        const response = (await endpoint(requestContext)) as Record<string, unknown>;

        expect(response).toMatchObject({ success: true, created: true });
        expectFreshUntil(response["freshUntil"]);
    });
});

describe("payloadSessionBridge origin validation", () => {
    beforeEach(configureBridgeMocks);

    it("rejects untrusted origins", async () => {
        const requestContext = makeTestContext();
        const endpoint = await getEndpoint(requestContext.payload);
        requestContext.context.isTrustedOrigin.mockReturnValue(false);

        await expect(endpoint(requestContext)).rejects.toThrow("Untrusted origin");
    });

    it("rejects requests without an origin", async () => {
        const requestContext = makeTestContext();
        const endpoint = await getEndpoint(requestContext.payload);
        requestContext.headers.delete("origin");

        await expect(endpoint(requestContext)).rejects.toThrow("Untrusted origin");
    });
});

describe("payloadSessionBridge authorization", () => {
    beforeEach(configureBridgeMocks);

    it("requires a Payload user from the configured collection", async () => {
        const requestContext = makeTestContext(createPayloadUser({ collection: "admins" }));
        const endpoint = await getEndpoint(requestContext.payload);

        await expect(endpoint(requestContext)).rejects.toThrow("valid Payload local session");
    });

    it("rejects a missing Payload user", async () => {
        const requestContext = makeTestContext(null);
        const endpoint = await getEndpoint(requestContext.payload);

        await expect(endpoint(requestContext)).rejects.toThrow("valid Payload local session");
    });

    it.each([
        { authenticationStrategy: "passkey", hasTotp: false },
        { authenticationStrategy: "better-auth", hasTotp: true },
        { authenticationStrategy: "local-jwt", hasTotp: true }
    ])(
        "rejects an unauthorized Payload authentication strategy with TOTP compatibility enabled %#",
        async ({ authenticationStrategy, hasTotp }) => {
            const requestContext = makeTestContext(
                createPayloadUser({
                    _strategy: authenticationStrategy,
                    hasTotp
                })
            );
            const endpoint = await getEndpoint(requestContext.payload, true);

            await expect(endpoint(requestContext)).rejects.toThrow("valid Payload local session");
        }
    );

    it("requires the Payload and Better Auth sessions to belong to the same user", async () => {
        const requestContext = makeTestContext();
        const endpoint = await getEndpoint(requestContext.payload);
        bridgeMocks.getSessionFromCtx.mockResolvedValue({
            user: { id: "other-user" },
            session: { createdAt: new Date() }
        });

        await expect(endpoint(requestContext)).rejects.toThrow("different users");
    });
});

describe("payloadSessionBridge freshness and lifecycle", () => {
    beforeEach(configureBridgeMocks);

    it("requires recent authentication when the existing Better Auth session is stale", async () => {
        const requestContext = makeTestContext();
        const endpoint = await getEndpoint(requestContext.payload);
        bridgeMocks.getSessionFromCtx.mockResolvedValue({
            user: { id: "user-1" },
            session: {
                createdAt: new Date(Date.now() - (PASSKEY_FRESH_AGE_SECONDS * millisecondsPerSecond + oneMillisecond))
            }
        });

        await expect(endpoint(requestContext)).rejects.toMatchObject({ code: "STEP_UP_REQUIRED" });
    });

    it("requires a fresh Payload session when no Better Auth session exists", async () => {
        const requestContext = makeTestContext(
            createPayloadUser({
                sessions: [
                    {
                        id: "payload-session-1",
                        createdAt: new Date(
                            Date.now() - (PASSKEY_FRESH_AGE_SECONDS * millisecondsPerSecond + oneMillisecond)
                        )
                    }
                ]
            })
        );
        const endpoint = await getEndpoint(requestContext.payload);

        await expect(endpoint(requestContext)).rejects.toMatchObject({ code: "STEP_UP_REQUIRED" });
    });

    it("rejects a Payload session when its Better Auth user no longer exists", async () => {
        const requestContext = makeTestContext();
        requestContext.context.internalAdapter.findUserById.mockResolvedValue(null);
        const endpoint = await getEndpoint(requestContext.payload);

        await expect(endpoint(requestContext)).rejects.toThrow("User was not found");
    });
});

describe("payloadSessionBridge hasTotp strictness with TOTP compatibility enabled", () => {
    beforeEach(configureBridgeMocks);

    it.each([
        { authenticationStrategy: "local-jwt", hasTotpState: "missing" },
        { authenticationStrategy: "local-jwt", hasTotpState: "null" },
        { authenticationStrategy: "better-auth", hasTotpState: "missing" },
        { authenticationStrategy: "better-auth", hasTotpState: "null" }
    ])(
        "rejects $authenticationStrategy when hasTotp is $hasTotpState instead of strictly false %#",
        async ({ authenticationStrategy, hasTotpState }) => {
            const user = createPayloadUser({ _strategy: authenticationStrategy });
            if (hasTotpState === "null") {
                user["hasTotp"] = null;
            } else {
                delete user["hasTotp"];
            }

            const requestContext = makeTestContext(user);
            const endpoint = await getEndpoint(requestContext.payload, true);

            await expect(endpoint(requestContext)).rejects.toThrow("valid Payload local session");
        }
    );
});
