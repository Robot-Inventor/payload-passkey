import type { PasskeyOptions, PasskeyPluginOptions } from "../types.js";
import { betterAuthCollections, createBetterAuthPlugin, payloadAdapter } from "@delmaredigital/payload-better-auth";
import type { Plugin } from "payload";
import { betterAuth } from "better-auth";
import { generateBetterAuthOptions } from "../auth/betterAuthOptions.js";
import { payloadSessionBridge } from "../auth/payloadSessionBridge.js";

type DeepRequired<T> = T extends Record<string, unknown> ? { [K in keyof T]-?: DeepRequired<T[K]> } : NonNullable<T>;

const betterAuthCollectionsPlugin = ({
    modelName,
    passkeyOptions
}: DeepRequired<Pick<PasskeyPluginOptions, "modelName">> & {
    passkeyOptions: PasskeyOptions;
}): Plugin =>
    betterAuthCollections({
        betterAuthOptions: {
            ...generateBetterAuthOptions(passkeyOptions),
            user: {
                modelName
            }
        },
        skipCollections: ["user"]
    });

type BetterAuthPluginOptions = DeepRequired<
    Pick<
        PasskeyPluginOptions,
        "sessionSeconds" | "modelName" | "userCollection" | "baseURL" | "secret" | "trustedOrigins"
    >
> & {
    sessionUpdateSeconds: number;
    passkeyOptions: PasskeyOptions;
    generateId: PasskeyPluginOptions["generateId"];
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
    generateId
}: BetterAuthPluginOptions): Plugin => {
    const betterAuthOptions = generateBetterAuthOptions(passkeyOptions);

    return createBetterAuthPlugin({
        autoInjectAdminComponents: false,
        admin: {
            enableManagementUI: false
        },
        createAuth: (payload) =>
            betterAuth({
                ...betterAuthOptions,
                session: {
                    expiresIn: sessionSeconds,
                    updateAge: sessionUpdateSeconds
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
                secret,
                trustedOrigins,
                plugins: [...(betterAuthOptions.plugins ?? []), payloadSessionBridge(payload, userCollection)]
            })
    });
};

export { betterAuthCollectionsPlugin, betterAuthPlugin };
