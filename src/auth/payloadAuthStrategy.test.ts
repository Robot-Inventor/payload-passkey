import type { AuthStrategyFunctionArgs, AuthStrategyResult } from "payload";
import { describe, expect, it } from "vitest";
import { payloadAuthStrategy } from "./payloadAuthStrategy";

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
    const strategy = payloadAuthStrategy({ usersCollection: "users" });

    return strategy.authenticate({
        headers: new Headers(),
        payload: {
            betterAuth: {
                api: {
                    getSession: (): Promise<{ user: { id: string }; session: Record<string, never> } | null> =>
                        Promise.resolve(resultUser ? { user: { id: String(resultUser.id) }, session: {} } : null)
                }
            },
            collections: collection ? { users: collection } : {},
            find: (): Promise<{ docs: User[] }> => Promise.resolve({ docs: resultUser ? [resultUser] : [] })
        }
    } as unknown as AuthStrategyFunctionArgs);
};

describe("payloadAuthStrategy", () => {
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
