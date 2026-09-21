import type { PasskeyOptions, PayloadPasskeyOptions } from "../types";
import { betterAuthCollections, createBetterAuthPlugin, payloadAdapter } from "@delmaredigital/payload-better-auth";
import { PASSKEY_FRESH_AGE_SECONDS } from "../constants.js";
import type { Plugin } from "payload";
import { betterAuth } from "better-auth";
import { generateBetterAuthOptions } from "../auth/betterAuthOptions";
import { getAuthBasePath } from "../auth/basePath";
import { payloadSessionBridge } from "../auth/payloadSessionBridge";

type DeepRequired<T> = T extends Record<string, unknown> ? { [K in keyof T]-?: DeepRequired<T[K]> } : NonNullable<T>;

const betterAuthCollectionsPlugin = ({
    modelName,
    passkeyOptions,
    firstUserAdmin
}: Required<Pick<PayloadPasskeyOptions, "modelName">> & {
    passkeyOptions: PasskeyOptions;
    firstUserAdmin: NonNullable<PayloadPasskeyOptions["firstUserAdmin"]>;
}): Plugin =>
    betterAuthCollections({
        betterAuthOptions: {
            ...generateBetterAuthOptions(passkeyOptions),
            user: {
                modelName
            }
        },
        skipCollections: ["user"],
        firstUserAdmin
    });

type BetterAuthPluginOptions = DeepRequired<
    Pick<
        PayloadPasskeyOptions,
        | "sessionSeconds"
        | "modelName"
        | "userCollection"
        | "baseURL"
        | "secret"
        | "trustedOrigins"
        | "enableTotpCompatibility"
    >
> & {
    sessionUpdateSeconds: number;
    passkeyOptions: PasskeyOptions;
    generateId: PayloadPasskeyOptions["generateId"];
    apiRoute: string;
};

const betterAuthPlugin = ({
    passkeyOptions,
    sessionSeconds,
    sessionUpdateSeconds,
    modelName,
    userCollection,
    baseURL,
    secret,
    trustedOrigins,
    generateId,
    enableTotpCompatibility,
    apiRoute
}: BetterAuthPluginOptions): Plugin => {
    const betterAuthOptions = generateBetterAuthOptions(passkeyOptions);
    const authBasePath = getAuthBasePath(apiRoute);

    return createBetterAuthPlugin({
        autoInjectAdminComponents: false,
        admin: {
            enableManagementUI: false
        },
        // Payload prefixes endpoint paths with `config.routes.api`, so this must remain relative to the API route.
        authBasePath: "/auth",
        createAuth: (payload) =>
            betterAuth({
                ...betterAuthOptions,
                session: {
                    expiresIn: sessionSeconds,
                    updateAge: sessionUpdateSeconds,
                    freshAge: PASSKEY_FRESH_AGE_SECONDS
                },
                user: {
                    modelName
                },
                database: payloadAdapter({
                    payloadClient: payload
                }),
                advanced: {
                    database: typeof generateId === "undefined" ? {} : { generateId },
                    skipTrailingSlashes: true
                },
                baseURL,
                basePath: authBasePath,
                secret,
                trustedOrigins,
                plugins: [
                    ...(betterAuthOptions.plugins ?? []),
                    payloadSessionBridge(payload, userCollection, enableTotpCompatibility)
                ]
            })
    });
};

export { betterAuthCollectionsPlugin, betterAuthPlugin };
