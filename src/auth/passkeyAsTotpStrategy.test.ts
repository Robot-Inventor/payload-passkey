import type { AuthStrategyFunctionArgs, AuthStrategyResult } from "payload";
import { describe, expect, it } from "vitest";
import { passkeyAsTotpStrategy } from "./passkeyAsTotpStrategy";

type User = NonNullable<AuthStrategyResult["user"]>;

const createArgs = (
    pathname: string,
    resultUser: User | null = {
        id: "user-1"
    } as User
): AuthStrategyFunctionArgs =>
    ({
        headers: new Headers({ "x-pathname": pathname }),
        payload: {
            config: {
                routes: {
                    api: "/api"
                }
            },
            collections: {
                users: {
                    config: {
                        auth: {
                            verify: false
                        }
                    }
                }
            },
            betterAuth: {
                api: {
                    getSession: (): Promise<{ user: { id: string }; session: Record<string, never> } | null> =>
                        Promise.resolve(resultUser ? { user: { id: String(resultUser.id) }, session: {} } : null)
                }
            },
            find: (): Promise<{ docs: User[] }> => Promise.resolve({ docs: resultUser ? [resultUser] : [] })
        }
    }) as unknown as AuthStrategyFunctionArgs;

describe("passkeyAsTotpStrategy", () => {
    it.each(["/api/setup-totp", "/api/setup-totp/", "/api/verify-totp", "/api/verify-totp/"])(
        "preserves the Better Auth strategy for the internal TOTP route %s",
        async (pathname) => {
            const strategy = passkeyAsTotpStrategy({});

            const result = await strategy.authenticate(createArgs(pathname));

            expect(result.user).toMatchObject({ id: "user-1", _strategy: "better-auth" });
        }
    );

    it("marks other authenticated requests as TOTP-compatible", async () => {
        const strategy = passkeyAsTotpStrategy({});

        const result = await strategy.authenticate(createArgs("/api/login"));

        expect(result.user).toMatchObject({ _strategy: "totp" });
    });

    it("does not decorate an unauthenticated result", async () => {
        const strategy = passkeyAsTotpStrategy({});

        const result = await strategy.authenticate(createArgs("/api/login", null));

        expect(result.user).toBeNull();
    });
});
