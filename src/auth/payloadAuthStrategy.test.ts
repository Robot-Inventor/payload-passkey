import type { AuthStrategy, AuthStrategyFunctionArgs, AuthStrategyResult } from "payload";
import { beforeEach, describe, expect, it, vi } from "vitest";

const underlyingAuthenticate = vi.hoisted(() => vi.fn());

vi.mock("@delmaredigital/payload-better-auth", () => ({
    betterAuthStrategy: vi.fn(() => ({
        name: "better-auth",
        authenticate: underlyingAuthenticate
    }))
}));

type User = NonNullable<AuthStrategyResult["user"]>;

const user = (verified: boolean): User =>
    ({
        id: "user-1",
        _verified: verified
    }) as unknown as User;

const authenticate = async (
    resultUser: User | null,
    collection?: { config: { auth: { verify: boolean } } }
): Promise<AuthStrategyResult | undefined> => {
    underlyingAuthenticate.mockResolvedValue({ user: resultUser });
    const { payloadAuthStrategy } = await import("./payloadAuthStrategy");
    const strategy = payloadAuthStrategy({ usersCollection: "users" });

    return strategy.authenticate({
        payload: {
            collections: collection ? { users: collection } : {}
        }
    } as unknown as AuthStrategyFunctionArgs);
};

describe("payloadAuthStrategy", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns an unauthenticated result when Better Auth found no user", async () => {
        const result = await authenticate(null, { config: { auth: { verify: true } } });

        expect(result).toEqual({ user: null });
    });

    it("rejects a user when the configured collection is missing", async () => {
        const result = await authenticate(user(true));

        expect(result?.user).toBeNull();
    });

    it("keeps verified users when Payload verification is disabled", async () => {
        const result = await authenticate(user(false), { config: { auth: { verify: false } } });

        expect(result?.user).toMatchObject({ id: "user-1", _verified: false });
    });

    it("rejects unverified users when Payload verification is enabled", async () => {
        const result = await authenticate(user(false), { config: { auth: { verify: true } } });

        expect(result?.user).toBeNull();
    });

    it("keeps verified users when Payload verification is enabled", async () => {
        const result = await authenticate(user(true), { config: { auth: { verify: true } } });

        expect(result?.user).toMatchObject({ id: "user-1", _verified: true });
    });
});
