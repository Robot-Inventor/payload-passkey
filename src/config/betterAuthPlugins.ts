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

const betterAuthPlugin = ({
    passkeyOptions,
    sessionSeconds,
    sessionUpdateSeconds,
    modelName,
    baseURL,
    secret,
    trustedOrigins,
    generateId
}: DeepRequired<
    Pick<PasskeyPluginOptions, "sessionSeconds" | "modelName" | "baseURL" | "secret" | "trustedOrigins">
> & {
    sessionUpdateSeconds: number;
    passkeyOptions: PasskeyOptions;
    generateId: PasskeyPluginOptions["generateId"];
}): Plugin => {
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
                plugins: [...(betterAuthOptions.plugins ?? []), payloadSessionBridge(payload)]
            })
    });
};

export { betterAuthCollectionsPlugin, betterAuthPlugin };
