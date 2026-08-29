import type { AuthStrategyFunctionArgs, AuthStrategyResult } from "payload";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { passkeyAsTotpStrategy } from "./passkeyAsTotpStrategy";

const baseAuthenticate = vi.hoisted(() => vi.fn());

vi.mock("@delmaredigital/payload-better-auth", () => ({
    betterAuthStrategy: (): { name: string; authenticate: typeof baseAuthenticate } => ({
        name: "better-auth",
        authenticate: baseAuthenticate
    })
}));

type User = NonNullable<AuthStrategyResult["user"]>;

const createArgs = (pathname: string): AuthStrategyFunctionArgs =>
    ({
        headers: new Headers({ "x-pathname": pathname }),
        payload: {
            config: {
                routes: {
                    api: "/api"
                }
            },
            collections: {
                users: { config: { auth: { verify: false } } }
            }
        }
    }) as unknown as AuthStrategyFunctionArgs;

describe("passkeyAsTotpStrategy", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it.each(["/api/setup-totp", "/api/setup-totp/", "/api/verify-totp", "/api/verify-totp/"])(
        "preserves the Better Auth strategy for the internal TOTP route %s",
        async (pathname) => {
            const user = { id: "user-1" } as User;
            baseAuthenticate.mockResolvedValue({ user });
            const strategy = passkeyAsTotpStrategy({});

            const result = await strategy.authenticate(createArgs(pathname));

            expect(result.user).toMatchObject({ id: "user-1", _strategy: "better-auth" });
        }
    );

    it("marks other authenticated requests as TOTP-compatible", async () => {
        baseAuthenticate.mockResolvedValue({ user: { id: "user-1" } });
        const strategy = passkeyAsTotpStrategy({});

        const result = await strategy.authenticate(createArgs("/api/login"));

        expect(result.user).toMatchObject({ _strategy: "totp" });
    });

    it("does not decorate an unauthenticated result", async () => {
        baseAuthenticate.mockResolvedValue({ user: null });
        const strategy = passkeyAsTotpStrategy({});

        const result = await strategy.authenticate(createArgs("/api/login"));

        expect(result.user).toBeNull();
    });
});
