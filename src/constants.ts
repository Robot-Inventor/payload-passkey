import type { CollectionSlug } from "payload";

const AUTH_SESSION_POLL_INTERVAL_SECONDS = 60;
const PASSKEY_FRESH_AGE_SECONDS = 300;
const AUTH_ERROR_CODES = {
    SESSION_NOT_FRESH: "SESSION_NOT_FRESH",
    STEP_UP_REQUIRED: "STEP_UP_REQUIRED"
} as const;
const BETTER_AUTH_COLLECTION_SLUGS = {
    account: "accounts",
    passkey: "passkeys",
    session: "sessions"
} as const satisfies Record<"account" | "passkey" | "session", CollectionSlug>;

export {
    AUTH_ERROR_CODES,
    AUTH_SESSION_POLL_INTERVAL_SECONDS,
    BETTER_AUTH_COLLECTION_SLUGS,
    PASSKEY_FRESH_AGE_SECONDS
};
