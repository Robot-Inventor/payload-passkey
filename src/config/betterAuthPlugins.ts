import type { PasskeyOptions, PayloadPasskeyOptions } from "../types";
import { betterAuthCollections, createBetterAuthPlugin, payloadAdapter } from "@delmaredigital/payload-better-auth";
import { PASSKEY_FRESH_AGE_SECONDS } from "../constants.js";
import type { Plugin } from "payload";
import { betterAuth } from "better-auth";
import { generateBetterAuthOptions } from "../auth/betterAuthOptions";
import { payloadSessionBridge } from "../auth/payloadSessionBridge";

type DeepRequired<T> = T extends Record<string, unknown> ? { [K in keyof T]-?: DeepRequired<T[K]> } : NonNullable<T>;

const betterAuthCollectionsPlugin = ({
    modelName,
    passkeyOptions,
    firstUserAdmin
}: Required<Pick<PayloadPasskeyOptions, "modelName" | "firstUserAdmin">> & {
    passkeyOptions: PasskeyOptions;
}): Plugin =>
    betterAuthCollections({
        betterAuthOptions: {
            ...generateBetterAuthOptions(passkeyOptions),
            user: {
                modelName
            }
        },
        skipCollections: ["user"],
        // Hack for `exactOptionalPropertyTypes` behavior in TypeScript 6. Remove in TS 7.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        firstUserAdmin: firstUserAdmin!
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
    enableTotpCompatibility
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
