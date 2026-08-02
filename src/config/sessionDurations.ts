import { AUTH_SESSION_POLL_INTERVAL_SECONDS } from "../constants.js";
import type { PasskeyPluginOptions } from "../types.js";

const PAYLOAD_DEFAULT_TOKEN_EXPIRATION_SECONDS = 7200;

const calculateSessionDurations = ({
    sessionSeconds: $sessionSeconds,
    sessionRefreshBufferSeconds: $sessionRefreshBufferSeconds
}: Pick<PasskeyPluginOptions, "sessionSeconds" | "sessionRefreshBufferSeconds">): Record<
    "sessionSeconds" | "sessionUpdateSeconds",
    number
> => {
    const sessionSeconds = $sessionSeconds ?? PAYLOAD_DEFAULT_TOKEN_EXPIRATION_SECONDS;
    // eslint-disable-next-line no-magic-numbers
    const sessionRefreshBufferSeconds = $sessionRefreshBufferSeconds ?? AUTH_SESSION_POLL_INTERVAL_SECONDS * 2;

    if (
        !Number.isInteger(sessionSeconds) ||
        // eslint-disable-next-line no-magic-numbers
        sessionSeconds <= 0 ||
        !Number.isInteger(sessionRefreshBufferSeconds) ||
        // eslint-disable-next-line no-magic-numbers
        sessionRefreshBufferSeconds < 0 ||
        sessionRefreshBufferSeconds >= sessionSeconds
    ) {
        throw new Error(
            "[payload-passkey] `sessionSeconds` must be a positive integer and `sessionRefreshBufferSeconds` must be a non-negative integer less than `sessionSeconds`."
        );
    }

    const sessionUpdateSeconds = sessionSeconds - sessionRefreshBufferSeconds;

    if (AUTH_SESSION_POLL_INTERVAL_SECONDS >= sessionUpdateSeconds) {
        throw new Error(
            `[payload-passkey] \`sessionPollIntervalSeconds\` must be less than \`sessionSeconds - sessionRefreshBufferSeconds\`.`
        );
    }

    return { sessionSeconds, sessionUpdateSeconds };
};

export { PAYLOAD_DEFAULT_TOKEN_EXPIRATION_SECONDS, calculateSessionDurations };
