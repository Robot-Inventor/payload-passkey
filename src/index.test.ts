import {
    applyPlugin,
    baseOptions,
    configuredSessionSeconds,
    countFieldsByName,
    createConfig,
    defaultSessionSeconds,
    expectedFieldOccurrenceCount,
    firstRegisteredUserRole,
    getUsersCollection
} from "./index.testSupport";
import { describe, expect, it } from "vitest";
import type { CollectionConfig } from "payload";
import { RESERVED_COLLECTION_SLUGS } from "./constants";

describe("payloadPasskey configuration", () => {
    it("adds passkey fields while preserving existing configuration", async () => {
        const config = createConfig({
            slug: "users",
            auth: {
                tokenExpiration: configuredSessionSeconds
            },
            fields: []
        });

        const result = await applyPlugin(config, {
            ...baseOptions,
            sessionSeconds: configuredSessionSeconds,
            enableTotpCompatibility: true
        });

        const users = getUsersCollection(result);

        expect(users.auth.tokenExpiration).toBe(configuredSessionSeconds);
        for (const fieldName of ["emailVerified", "image", "payloadPasskeyPluginPasskeyManagement"]) {
            expect(countFieldsByName(users, fieldName)).toBe(expectedFieldOccurrenceCount);
        }

        expect(result.collections?.find(({ slug }) => slug === "posts")).toMatchObject({ slug: "posts", fields: [] });
    });

    it("uses the documented default session duration", async () => {
        const users = getUsersCollection(await applyPlugin(createConfig()));

        expect(users.auth.tokenExpiration).toBe(defaultSessionSeconds);
    });
});

describe("payloadPasskey translation customization", () => {
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
    const usersCollectionWithAuth = (auth: NonNullable<CollectionConfig["auth"]>): CollectionConfig => ({
        slug: "users",
        auth,
        fields: []
    });

    it.each([
        {
            name: "without authentication",
            auth: false
        },
        {
            name: "with sessions disabled",
            auth: {
                useSessions: false
            }
        },
        {
            name: "with a conflicting token expiration",
            auth: {
                tokenExpiration: 3601
            }
        }
    ])("rejects a user collection $name", async ({ auth }) => {
        await expect(applyPlugin(createConfig(usersCollectionWithAuth(auth)))).rejects.toThrow("[payload-passkey]");
    });

    it("rejects an explicitly mismatched session duration", async () => {
        await expect(
            applyPlugin(createConfig(), { ...baseOptions, sessionSeconds: configuredSessionSeconds })
        ).rejects.toThrow("auth.tokenExpiration");
    });

    it.each([
        {
            sessionSeconds: 0
        },
        {
            // Invalid because the buffer must be strictly greater than the session poll interval (60 seconds).
            sessionSeconds: 120,
            sessionRefreshBufferSeconds: 60
        },
        {
            sessionSeconds: configuredSessionSeconds,
            sessionRefreshBufferSeconds: -1
        },
        {
            sessionSeconds: configuredSessionSeconds,
            sessionRefreshBufferSeconds: configuredSessionSeconds
        }
    ])("rejects invalid session duration options %#", async (durationOptions) => {
        await expect(applyPlugin(createConfig(), { ...baseOptions, ...durationOptions })).rejects.toThrow(
            "sessionRefreshBufferSeconds"
        );
    });
});

describe("payloadPasskey reserved slug validation", () => {
    it.each([...RESERVED_COLLECTION_SLUGS])("rejects an existing collection with reserved slug %s", async (slug) => {
        const config = createConfig();
        config.collections = [
            ...(config.collections ?? []),
            {
                slug,
                fields: []
            }
        ];

        await expect(applyPlugin(config)).rejects.toThrow("reserved for Better Auth");
    });
});

describe("payloadPasskey injected fields", () => {
    it("keeps an existing emailVerified field", async () => {
        const result = await applyPlugin(
            createConfig({
                slug: "users",
                auth: true,
                fields: [
                    {
                        name: "emailVerified",
                        type: "checkbox"
                    }
                ]
            })
        );

        const users = getUsersCollection(result);

        expect(countFieldsByName(users, "emailVerified")).toBe(expectedFieldOccurrenceCount);
    });

    it("rejects a field that conflicts with an injected field", async () => {
        await expect(
            applyPlugin(
                createConfig({
                    slug: "users",
                    auth: true,
                    fields: [
                        {
                            type: "group",
                            fields: [
                                {
                                    name: "image",
                                    type: "number"
                                }
                            ]
                        }
                    ]
                })
            )
        ).rejects.toThrow("conflicts with auto-injected field name: `image`");
    });
});

describe("payloadPasskey relationships", () => {
    it("rewrites Better Auth relationship fields to the configured user collection", async () => {
        const config = createConfig({
            slug: "members",
            auth: true,
            fields: []
        });

        const result = await applyPlugin(config, { ...baseOptions, userCollection: "members" });
        const relationship = result.collections
            ?.find(({ slug }) => slug === "accounts")
            ?.fields.find((field) => "name" in field && field.name === "user");

        expect(relationship).toMatchObject({ name: "user", relationTo: "members" });
    });
});

describe("payloadPasskey firstUserAdmin", () => {
    const noExistingUsers = 0;
    const oneExistingUser = 1;
    const customFirstUserAdmin = {
        adminRole: "super-admin",
        defaultRole: "member"
    } as const;

    it("bootstraps the first registered user as an admin by default", async () => {
        const users = getUsersCollection(await applyPlugin(createConfig()));

        expect(await firstRegisteredUserRole(users, noExistingUsers)).toBe("admin");
    });

    it("honours a custom admin role for the first registered user", async () => {
        const users = getUsersCollection(
            await applyPlugin(createConfig(), { ...baseOptions, firstUserAdmin: customFirstUserAdmin })
        );

        expect(await firstRegisteredUserRole(users, noExistingUsers)).toBe("super-admin");
    });

    it("assigns the configured default role to subsequent users", async () => {
        const users = getUsersCollection(
            await applyPlugin(createConfig(), { ...baseOptions, firstUserAdmin: customFirstUserAdmin })
        );

        expect(await firstRegisteredUserRole(users, oneExistingUser)).toBe("member");
    });

    it("does not inject the first-user-admin hook when explicitly disabled", async () => {
        const users = getUsersCollection(await applyPlugin(createConfig(), { ...baseOptions, firstUserAdmin: false }));

        expect(users.hooks?.beforeChange).toBeUndefined();
    });
});
