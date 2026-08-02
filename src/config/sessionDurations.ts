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
    const sessionUpdateSeconds =
        // eslint-disable-next-line no-magic-numbers
        sessionSeconds - ($sessionRefreshBufferSeconds ?? AUTH_SESSION_POLL_INTERVAL_SECONDS * 2);

    // eslint-disable-next-line no-magic-numbers
    if (sessionUpdateSeconds <= 0) {
        throw new Error(`[payload-passkey] \`sessionSeconds\` must be greater than \`sessionRefreshBufferSeconds\`.`);
    }

    if (AUTH_SESSION_POLL_INTERVAL_SECONDS >= sessionUpdateSeconds) {
        throw new Error(
            `[payload-passkey] \`sessionPollIntervalSeconds\` must be less than \`sessionSeconds - sessionRefreshBufferSeconds\`.`
        );
    }

    return { sessionSeconds, sessionUpdateSeconds };
};

export { PAYLOAD_DEFAULT_TOKEN_EXPIRATION_SECONDS, calculateSessionDurations };
