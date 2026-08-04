import { type CollectionConfig, type Config, deepMergeSimple, definePlugin } from "payload";
import { PAYLOAD_DEFAULT_TOKEN_EXPIRATION_SECONDS, calculateSessionDurations } from "./config/sessionDurations";
import type { PasskeyOptions, PayloadPasskeyOptions, PayloadPasskeyPlugin } from "./types";
import { afterChange, afterLogin, afterLogout } from "./config/hooks";
import { betterAuthCollectionsPlugin, betterAuthPlugin } from "./config/betterAuthPlugins";
import { emailVerifiedField, imageField, passkeyManagementField } from "./config/userFields";
import {
    findFieldsByName,
    rewriteBetterAuthUserRelationships,
    validateReservedSlugs
} from "./config/userRelationships";
import { passkeyAsTotpStrategy } from "./auth/passkeyAsTotpStrategy";
import { payloadAuthStrategy } from "./auth/payloadAuthStrategy";
import { translations } from "./i18n";

const payloadPasskey: PayloadPasskeyPlugin = definePlugin<PayloadPasskeyOptions>({
    slug: "plugin-payload-passkey",
    order: 10,
    // eslint-disable-next-line max-lines-per-function
    plugin: async ({
        config,
        sessionSeconds: $sessionSeconds,
        sessionRefreshBufferSeconds: $sessionRefreshBufferSeconds,
        enableTotpCompatibility,
        modelName,
        userCollection,
        rpID,
        rpName,
        origin,
        baseURL,
        secret,
        trustedOrigins,
        generateId,
        firstUserAdmin = true
    }) => {
        validateReservedSlugs(config);

        const { sessionSeconds, sessionUpdateSeconds } = calculateSessionDurations({
            sessionSeconds: $sessionSeconds,
            sessionRefreshBufferSeconds: $sessionRefreshBufferSeconds
        });

        const configuredTranslations = config.i18n?.translations as Record<string, Record<string, unknown>> | undefined;
        const translationOverrides = deepMergeSimple(translations, configuredTranslations ?? {});

        const passkeyPluginConfig = {
            ...config,

            admin: {
                ...config.admin,
                components: {
                    ...config.admin?.components,
                    providers: [
                        ...(config.admin?.components?.providers ?? []),
                        "payload-passkey/components/BetterAuthSessionRefreshProvider#BetterAuthSessionRefreshProvider"
                    ],
                    afterLogin: [
                        ...(config.admin?.components?.afterLogin ?? []),
                        "payload-passkey/components/PasskeyLoginButton#PasskeyLoginButton"
                    ]
                }
            },

            // eslint-disable-next-line max-statements, max-lines-per-function, complexity
            collections: (config.collections ?? []).map((collection): CollectionConfig => {
                if (collection.slug !== userCollection) return collection;

                if (!collection.auth) {
                    throw new Error(
                        `[payload-passkey] \`auth\` in the \`${collection.slug}\` collection should not be set to \`false\` or \`undefined\`. Please explicitly enable authentication for this collection.`
                    );
                }

                if (typeof collection.auth === "object" && collection.auth.useSessions === false) {
                    throw new Error(
                        `[payload-passkey] \`auth.useSessions\` must be enabled in the \`${collection.slug}\` collection.`
                    );
                }

                const configuredTokenExpiration =
                    // eslint-disable-next-line no-undefined
                    typeof collection.auth === "object" ? collection.auth.tokenExpiration : undefined;

                if (
                    (typeof configuredTokenExpiration === "number" && configuredTokenExpiration !== sessionSeconds) ||
                    (typeof configuredTokenExpiration === "undefined" &&
                        sessionSeconds !== PAYLOAD_DEFAULT_TOKEN_EXPIRATION_SECONDS)
                ) {
                    throw new Error(
                        `[payload-passkey] \`auth.tokenExpiration\` in the \`${collection.slug}\` collection must be the same as the \`sessionSeconds\` option.`
                    );
                }

                if (collection.auth === true) {
                    collection.auth = {
                        tokenExpiration: sessionSeconds,
                        strategies: [
                            (enableTotpCompatibility ? passkeyAsTotpStrategy : payloadAuthStrategy)({
                                usersCollection: collection.slug
                            })
                        ]
                    };
                } else {
                    collection.auth.tokenExpiration = sessionSeconds;
                    collection.auth.strategies = [
                        ...(collection.auth.strategies ?? []),
                        ...[
                            (enableTotpCompatibility ? passkeyAsTotpStrategy : payloadAuthStrategy)({
                                usersCollection: collection.slug
                            })
                        ]
                    ];
                }

                collection.hooks = {
                    ...collection.hooks,
                    afterChange: [...(collection.hooks?.afterChange ?? []), afterChange],
                    afterLogin: [...(collection.hooks?.afterLogin ?? []), afterLogin],
                    afterLogout: [...(collection.hooks?.afterLogout ?? []), afterLogout]
                };

                const requiredFields = [emailVerifiedField, imageField, passkeyManagementField] as const;
                for (const field of requiredFields) {
                    const [existingField] = findFieldsByName(collection.fields, field.name);

                    if (existingField?.type && existingField.type !== field.type) {
                        throw new Error(
                            `[payload-passkey] Field name in the \`${collection.slug}\` collection conflicts with auto-injected field name: \`${field.name}\`.`
                        );
                    }

                    if (existingField) {
                        if (field.name === emailVerifiedField.name) {
                            // Field access functions can depend on request context and cannot be verified during config setup.
                            // eslint-disable-next-line no-console
                            console.warn(
                                `[payload-passkey] The \`${collection.slug}\` collection already defines the \`${field.name}\` field. Its \`access.create\` and \`access.update\` settings must always return \`false\` to protect the email verification state.`
                            );
                        }
                    } else {
                        collection.fields.push(field);
                    }
                }

                return collection;
            }),

            i18n: {
                ...config.i18n,
                translations: translationOverrides
            }
        } as const satisfies Config;

        const passkeyOptions = {
            rpID,
            rpName,
            origin
        } as const satisfies PasskeyOptions;

        // Payload CMS finalizes the plugin array before running the plugins, so the dependent plugin's processing must be executed directly
        const configWithAuthCollections = await betterAuthCollectionsPlugin({
            modelName,
            passkeyOptions,
            firstUserAdmin
        })(passkeyPluginConfig);

        rewriteBetterAuthUserRelationships(configWithAuthCollections, userCollection);

        return betterAuthPlugin({
            passkeyOptions,
            sessionSeconds,
            sessionUpdateSeconds,
            baseURL,
            secret,
            trustedOrigins,
            modelName,
            userCollection,
            generateId
        })(configWithAuthCollections);
    }
});

export { type PayloadPasskeyPlugin, type PayloadPasskeyOptions, payloadPasskey };
