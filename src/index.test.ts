/* eslint-disable max-lines */
import type { CollectionConfig, Config } from "payload";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PayloadPasskeyOptions } from "./types";
import { RESERVED_COLLECTION_SLUGS } from "./constants";

const pluginMocks = vi.hoisted(() => ({
    collections: vi.fn(),
    auth: vi.fn(),
    createCollectionsPlugin: vi.fn(),
    createAuthPlugin: vi.fn()
}));

vi.mock("./config/betterAuthPlugins", () => ({
    betterAuthCollectionsPlugin: pluginMocks.createCollectionsPlugin,
    betterAuthPlugin: pluginMocks.createAuthPlugin
}));

const baseOptions = {
    modelName: "user",
    userCollection: "users",
    baseURL: "https://example.com",
    secret: "a-secret-that-is-long-enough-for-better-auth",
    trustedOrigins: ["https://example.com"],
    generateId: "serial"
} as const satisfies PayloadPasskeyOptions;

const configuredSessionSeconds = 3600;
const configuredRefreshBufferSeconds = 600;
const defaultSessionSeconds = 7200;
const invalidSessionSeconds = 0;
const minimumSessionSeconds = 120;
const invalidRefreshBufferSeconds = 60;
const negativeRefreshBufferSeconds = -1;
const expectedEmailVerifiedFieldCount = 1;

const createConfig = (userCollection: CollectionConfig = { slug: "users", auth: true, fields: [] }): Config =>
    ({
        collections: [userCollection, { slug: "posts", fields: [] }],
        i18n: {
            translations: {
                en: {
                    customMessage: "preserved"
                }
            }
        }
    }) as unknown as Config;

const applyPlugin = async (config: Config, options: Record<string, unknown> = baseOptions): Promise<Config> => {
    const { payloadPasskey } = await import("./index");
    return payloadPasskey(options as never)(config);
};

const configurePluginMocks = (): void => {
    vi.clearAllMocks();
    pluginMocks.collections.mockImplementation((config: Config) => config);
    pluginMocks.auth.mockImplementation((config: Config) => config);
    pluginMocks.createCollectionsPlugin.mockImplementation(() => pluginMocks.collections);
    pluginMocks.createAuthPlugin.mockImplementation(() => pluginMocks.auth);
};

type UserCollection = CollectionConfig & {
    auth: Exclude<NonNullable<CollectionConfig["auth"]>, boolean>;
};

const getUsersCollection = (config: Config): UserCollection => {
    const users = config.collections?.find(({ slug }) => slug === "users");

    if (!users || typeof users.auth !== "object") throw new Error("The users collection is not configured");

    return users as UserCollection;
};

const firstRegisteredUserRole = async (users: UserCollection, existingUserCount: number): Promise<unknown> => {
    const hook = (users.hooks?.beforeChange ?? [])[0] as
        ((args: never) => Promise<Record<string, unknown>>) | undefined;
    const data =
        hook &&
        (await hook({
            data: {},
            operation: "create",
            req: { payload: { count: vi.fn().mockResolvedValue({ totalDocs: existingUserCount }) }, user: null },
            context: {}
        } as never));

    return data?.["role"];
};

describe("payloadPasskey configuration", () => {
    beforeEach(configurePluginMocks);

    it("adds passkey fields while preserving existing configuration", async () => {
        const config = createConfig({
            slug: "users",
            auth: {
                tokenExpiration: configuredSessionSeconds,
                strategies: [{ name: "existing-strategy" } as never]
            },
            fields: []
        });

        const result = await applyPlugin(config, {
            ...baseOptions,
            sessionSeconds: configuredSessionSeconds,
            sessionRefreshBufferSeconds: configuredRefreshBufferSeconds,
            enableTotpCompatibility: true
        });
        const users = getUsersCollection(result);

        expect({
            tokenExpiration: users.auth.tokenExpiration,
            fields: users.fields.map((field) => ("name" in field ? field.name : null))
        }).toEqual({
            tokenExpiration: configuredSessionSeconds,
            fields: ["emailVerified", "image", "payloadPasskeyPluginPasskeyManagement"]
        });
        expect(result.collections?.find(({ slug }) => slug === "posts")).toMatchObject({ slug: "posts", fields: [] });
        expect(result.i18n?.translations?.en).toMatchObject({ customMessage: "preserved" });
        expect(result.i18n?.translations?.en).toHaveProperty("passkeyPlugin");
    });
});

describe("payloadPasskey default session duration", () => {
    beforeEach(configurePluginMocks);

    it("uses the documented default session duration", async () => {
        const result = await applyPlugin(createConfig());
        const users = getUsersCollection(result);

        expect(users.auth.tokenExpiration).toBe(defaultSessionSeconds);
    });
});

describe("payloadPasskey translation customization", () => {
    beforeEach(configurePluginMocks);

    it("preserves nested custom translations while adding missing defaults", async () => {
        const config = createConfig();
        config.i18n = {
            translations: {
                en: {
                    customMessage: "preserved",
                    passkeyPlugin: {
                        loginButton: {
                            or: "Use another option"
                        }
                    }
                }
            }
        };

        const result = await applyPlugin(config);

        expect(result.i18n?.translations?.en).toMatchObject({
            customMessage: "preserved",
            passkeyPlugin: {
                loginButton: {
                    failedToLogin: "Failed to login with a passkey.",
                    or: "Use another option"
                }
            }
        });
    });
});

describe("payloadPasskey validation", () => {
    beforeEach(configurePluginMocks);

    it.each([
        {
            name: "without authentication",
            collection: { slug: "users", fields: [] }
        },
        {
            name: "with sessions disabled",
            collection: { slug: "users", auth: { useSessions: false }, fields: [] }
        },
        {
            name: "with a conflicting token expiration",
            collection: { slug: "users", auth: { tokenExpiration: 3601 }, fields: [] }
        }
    ])("rejects a user collection $name", async ({ collection }) => {
        await expect(applyPlugin(createConfig(collection as CollectionConfig))).rejects.toThrow("[payload-passkey]");
    });

    it("rejects an explicitly mismatched session duration", async () => {
        await expect(
            applyPlugin(createConfig({ slug: "users", auth: true, fields: [] }), {
                ...baseOptions,
                sessionSeconds: configuredSessionSeconds
            })
        ).rejects.toThrow("auth.tokenExpiration");
    });

    it.each([
        { sessionSeconds: invalidSessionSeconds },
        { sessionSeconds: minimumSessionSeconds, sessionRefreshBufferSeconds: invalidRefreshBufferSeconds },
        { sessionSeconds: configuredSessionSeconds, sessionRefreshBufferSeconds: negativeRefreshBufferSeconds },
        { sessionSeconds: configuredSessionSeconds, sessionRefreshBufferSeconds: configuredSessionSeconds }
    ])("rejects invalid session duration options %#", async (durationOptions) => {
        await expect(applyPlugin(createConfig(), { ...baseOptions, ...durationOptions })).rejects.toThrow(
            "sessionRefreshBufferSeconds"
        );
    });
});

describe("payloadPasskey reserved slug validation", () => {
    beforeEach(configurePluginMocks);

    it.each([...RESERVED_COLLECTION_SLUGS])("rejects an existing collection with reserved slug %s", async (slug) => {
        const config = createConfig();
        config.collections = [...(config.collections ?? []), { slug, fields: [] }];
        await expect(applyPlugin(config)).rejects.toThrow("reserved for Better Auth");
    });
});

describe("payloadPasskey injected fields", () => {
    beforeEach(configurePluginMocks);

    it("keeps an existing emailVerified field", async () => {
        const result = await applyPlugin(
            createConfig({
                slug: "users",
                auth: true,
                fields: [{ name: "emailVerified", type: "checkbox" }]
            })
        );
        const users = getUsersCollection(result);

        expect(users.fields.filter((field) => "name" in field && field.name === "emailVerified")).toHaveLength(
            expectedEmailVerifiedFieldCount
        );
    });

    it("rejects a field that conflicts with an injected field", async () => {
        await expect(
            applyPlugin(
                createConfig({
                    slug: "users",
                    auth: true,
                    fields: [{ type: "group", fields: [{ name: "image", type: "number" }] }]
                })
            )
        ).rejects.toThrow("conflicts with auto-injected field name: `image`");
    });
});

describe("payloadPasskey relationships", () => {
    beforeEach(configurePluginMocks);

    it("rewrites Better Auth relationship fields to the configured user collection", async () => {
        const accounts = {
            slug: "accounts",
            fields: [{ name: "user", type: "relationship", relationTo: "users" }]
        } as const as CollectionConfig;
        const config = createConfig({ slug: "members", auth: true, fields: [] });
        pluginMocks.collections.mockImplementation((incoming: Config) => ({
            ...incoming,
            collections: [...(incoming.collections ?? []), accounts]
        }));

        const result = await applyPlugin(config, { ...baseOptions, userCollection: "members" });
        const relationship = result.collections?.find(({ slug }) => slug === "accounts")?.fields[0];

        expect(relationship).toMatchObject({ name: "user", relationTo: "members" });
    });
});

describe("payloadPasskey firstUserAdmin", () => {
    const noExistingUsers = 0;
    const oneExistingUser = 1;
    const noInjectedHooks = 0;

    beforeEach(async () => {
        configurePluginMocks();
        const real = await vi.importActual<{
            betterAuthCollectionsPlugin: (options: object) => (config: Config) => Config;
        }>("./config/betterAuthPlugins");
        pluginMocks.createCollectionsPlugin.mockImplementation(real.betterAuthCollectionsPlugin);
    });

    it("bootstraps the first registered user as an admin by default", async () => {
        const users = getUsersCollection(await applyPlugin(createConfig()));

        expect(await firstRegisteredUserRole(users, noExistingUsers)).toBe("admin");
    });

    it("honours a custom admin role for the first registered user", async () => {
        const users = getUsersCollection(
            await applyPlugin(createConfig(), {
                ...baseOptions,
                firstUserAdmin: { adminRole: "super-admin", defaultRole: "member" }
            })
        );

        expect(await firstRegisteredUserRole(users, noExistingUsers)).toBe("super-admin");
    });

    it("assigns the configured default role to subsequent users", async () => {
        const users = getUsersCollection(
            await applyPlugin(createConfig(), {
                ...baseOptions,
                firstUserAdmin: { adminRole: "super-admin", defaultRole: "member" }
            })
        );

        expect(await firstRegisteredUserRole(users, oneExistingUser)).toBe("member");
    });

    it("does not inject the first-user-admin hook when explicitly disabled", async () => {
        const users = getUsersCollection(await applyPlugin(createConfig(), { ...baseOptions, firstUserAdmin: false }));

        expect(users.hooks?.beforeChange ?? []).toHaveLength(noInjectedHooks);
    });
});
