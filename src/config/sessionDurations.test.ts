import { PAYLOAD_DEFAULT_TOKEN_EXPIRATION_SECONDS, calculateSessionDurations } from "./sessionDurations";
import { describe, expect, it } from "vitest";

const defaultRefreshBufferSeconds = 120;
const refreshBufferSeconds = 600;
const sessionSeconds = 3600;

describe("calculateSessionDurations", () => {
    it("uses the documented defaults", () => {
        expect(calculateSessionDurations({})).toEqual({
            sessionSeconds: PAYLOAD_DEFAULT_TOKEN_EXPIRATION_SECONDS,
            sessionUpdateSeconds: PAYLOAD_DEFAULT_TOKEN_EXPIRATION_SECONDS - defaultRefreshBufferSeconds
        });
    });

    it("derives the Better Auth update interval from the refresh buffer", () => {
        expect(
            calculateSessionDurations({ sessionRefreshBufferSeconds: refreshBufferSeconds, sessionSeconds })
        ).toEqual({
            sessionSeconds,
            sessionUpdateSeconds: sessionSeconds - refreshBufferSeconds
        });
    });

    it("rejects a refresh buffer that leaves no safe polling interval", () => {
        expect(() => calculateSessionDurations({ sessionRefreshBufferSeconds: 20, sessionSeconds })).toThrow(
            "sessionRefreshBufferSeconds"
        );
    });
});
