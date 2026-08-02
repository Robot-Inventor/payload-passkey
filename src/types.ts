import type { CollectionSlug, Plugin } from "payload";
import type { PasskeyOptions as $PasskeyOptions } from "@better-auth/passkey";
import type { BetterAuthAdvancedOptions } from "better-auth";

type PasskeyOptions = Pick<$PasskeyOptions, "rpID" | "rpName" | "origin">;

type BetterAuthUserCollectionSlug<TModelName extends string> = (TModelName extends `${string}s`
    ? TModelName
    : `${TModelName}s`) &
    CollectionSlug;

type PasskeyPluginOptions<TModelName extends string = string> = {
    sessionSeconds?: number | undefined;
    sessionRefreshBufferSeconds?: number | undefined;
    enableTotpCompatibility?: boolean | undefined;
    modelName: TModelName;
    userCollection: BetterAuthUserCollectionSlug<NoInfer<TModelName>>;
    baseURL: string;
    secret: string;
    trustedOrigins: string[];
    generateId: NonNullable<BetterAuthAdvancedOptions["database"]>["generateId"];
} & PasskeyOptions;

type PasskeyPlugin = <TModelName extends string>(options: PasskeyPluginOptions<TModelName>) => Plugin;

export type { PasskeyOptions, PasskeyPluginOptions, PasskeyPlugin };
