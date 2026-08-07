import type { CollectionSlug, Plugin } from "payload";
import type { PasskeyOptions as $PasskeyOptions } from "@better-auth/passkey";
import type { BetterAuthAdvancedOptions } from "better-auth";
import type { FirstUserAdminOptions } from "@delmaredigital/payload-better-auth";

type BetterAuthUserCollectionSlug<TModelName extends string> = (TModelName extends `${string}s`
    ? TModelName
    : `${TModelName}s`) &
    CollectionSlug;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type PayloadPasskeyOptions<TModelName extends string = string> = {
    /**
     * The WebAuthn relying party ID used to scope passkeys to this website.
     * This is normally the hostname from `baseURL`, without a protocol, port, or path.
     * @default The hostname from `baseURL`
     */
    rpID?: $PasskeyOptions["rpID"];
    /**
     * The human-readable name shown by browsers and authenticator devices for this website.
     * @default "Better Auth"
     */
    rpName?: $PasskeyOptions["rpName"];
    /**
     * The origin where passkey registration and authentication take place.
     * Include the scheme, hostname, and optional port, but do not include a trailing slash.
     * Multiple origins may be provided when the application is served from more than one origin.
     * If omitted, the origin from each request is used.
     * @default The request's `Origin` header
     */
    origin?: $PasskeyOptions["origin"];
    /**
     * The maximum lifetime of a Payload and Better Auth session, in seconds.
     * This value is also used as the Payload user's `auth.tokenExpiration`, so that
     * collection setting must match this option when it is configured explicitly.
     * This must be a positive integer.
     * @default 7200 (2 hours)
     */
    sessionSeconds?: number | undefined;
    /**
     * The amount of time, in seconds, reserved at the end of a session's lifetime for
     * refreshing it. A larger value refreshes sessions earlier. This must be a non-negative
     * integer greater than 60 seconds.
     * @default 120 (2 minutes)
     */
    sessionRefreshBufferSeconds?: number | undefined;
    /**
     * Whether to enable compatibility with [Payload TOTP](https://github.com/GeorgeHulpoi/payload-totp).
     * Set to `true` when using payload-passkey alongside Payload TOTP.
     * @default false
     */
    enableTotpCompatibility?: boolean | undefined;
    /**
     * Whether to enable passkey autofill. When enabled, passkeys appear as
     * autocomplete suggestions alongside passwords saved in the user's password
     * manager when the Payload email input is focused, without requiring the
     * "Login with a passkey" button to be pressed.
     * @default false
     * @see {@link https://web.dev/articles/passkey-form-autofill|Sign in with a passkey through form autofill | web.dev}
     */
    enablePasskeyAutofill?: boolean | undefined;
    /**
     * The singular Better Auth model name for the user records stored in Payload.
     * The corresponding `userCollection` is normally the plural form of this value,
     * for example, `"user"` with `"users"` or `"member"` with `"members"`.
     * If `modelName` ends with `"s"`, the `userCollection` must be the same as `modelName`, for example, `"status"` with `"status"`.
     */
    modelName: TModelName;
    /**
     * The slug of the Payload collection that stores users and should receive passkey
     * authentication. Authentication must be enabled on this collection. Use the
     * collection slug corresponding to `modelName`, normally its plural form.
     */
    userCollection: BetterAuthUserCollectionSlug<NoInfer<TModelName>>;
    /**
     * The canonical URL of the application that hosts Better Auth.
     * Do not include a trailing slash. `http://localhost` and
     * `http://localhost:<port>` are valid for local development; every other host
     * must use `https://`.
     * @example "http://localhost:3000"
     * @example "https://example.com"
     */
    baseURL: string;
    /**
     * The secret Better Auth uses to encrypt, sign, and hash authentication data.
     * Specify a randomly generated string of 32 characters or more.
     */
    secret: string;
    /**
     * The origins that are allowed to make browser authentication requests.
     * Each origin should include its scheme, hostname, and optional port, but no path.
     * Better Auth trusts `baseURL` automatically; add other frontend origins here,
     * such as a separate frontend domain or a local development origin.
     */
    trustedOrigins: string[];
    /**
     * Automatically make the first registered user an admin.
     * Enabled by default. Set to false to disable, or provide options to customize.
     * @default true
     * @example
     * // Disable
     * betterAuthCollections({
     *     betterAuthOptions: authOptions,
     *     firstUserAdmin: false,
     * })
     * @example
     * // Custom roles
     * betterAuthCollections({
     *     betterAuthOptions: authOptions,
     *     firstUserAdmin: {
     *         adminRole: 'super-admin',
     *         defaultRole: 'member',
     *     },
     * })
     */
    firstUserAdmin?: boolean | FirstUserAdminOptions | undefined;
    /**
     * The ID generation strategy for Better Auth records stored through Payload.
     * If you are using PostgreSQL with default ID generation, set this to "serial".
     */
    generateId: NonNullable<BetterAuthAdvancedOptions["database"]>["generateId"];
};

type PasskeyOptions = Pick<PayloadPasskeyOptions, "rpID" | "rpName" | "origin">;

type PayloadPasskeyPlugin = <TModelName extends string>(options: PayloadPasskeyOptions<TModelName>) => Plugin;

export type { PayloadPasskeyOptions, PasskeyOptions, PayloadPasskeyPlugin };
