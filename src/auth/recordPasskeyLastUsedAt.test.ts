import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AuthContext } from "better-auth";
import { generateBetterAuthOptions } from "./betterAuthOptions";
import { getAuthTables } from "better-auth/db";

const lastUsedAt = new Date("2026-06-15T12:30:00.000Z");
const credentialID = "credential-1";
const expectedLogCount = 1;
const updates: Array<Parameters<AuthContext["adapter"]["update"]>[number]> = [];
const loggedErrors: Array<{ message: unknown; error: unknown }> = [];

const adapter: Pick<AuthContext["adapter"], "update"> = {
    update: (input) => {
        updates.push(input);

        return Promise.resolve(null);
    }
};

const logger: Pick<AuthContext["logger"], "error"> = {
    error: (...args: unknown[]) => {
        const [message, error] = args;

        loggedErrors.push({ message, error });
    }
};

interface RunAfterVerificationOptions {
    adapter?: Pick<AuthContext["adapter"], "update">;
    userVerified: boolean;
}

const runConfiguredAfterVerification = async ({
    adapter: usageAdapter = adapter,
    userVerified
}: RunAfterVerificationOptions): Promise<void> => {
    const [passkeyPlugin] = generateBetterAuthOptions({}).plugins;
    const afterVerification = passkeyPlugin.options?.authentication?.afterVerification;

    if (!afterVerification) {
        throw new Error("Passkey verification hook is missing");
    }

    await Reflect.apply(afterVerification, null, [
        {
            ctx: {
                context: {
                    adapter: usageAdapter,
                    logger
                }
            },
            verification: {
                authenticationInfo: {
                    userVerified
                }
            },
            clientData: {
                id: credentialID
            }
        }
    ]);
};

describe("passkey last-used tracking", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(lastUsedAt);
        updates.pop();
        loggedErrors.pop();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("adds an optional last-used timestamp to the passkey schema", () => {
        const options = generateBetterAuthOptions({});
        const [passkeyPlugin] = options.plugins;

        expect(getAuthTables(options)["passkey"]?.fields["lastUsedAt"]).toEqual({
            type: "date",
            required: false
        });

        expect(passkeyPlugin.options?.authentication?.afterVerification).toBeTypeOf("function");
    });

    it("records the credential ID through the configured verification hook", async () => {
        await runConfiguredAfterVerification({ userVerified: true });

        expect(updates).toMatchObject([
            {
                model: "passkey",
                where: [
                    {
                        field: "credentialID",
                        value: credentialID
                    }
                ],
                update: {
                    lastUsedAt
                }
            }
        ]);
    });

    it("does not record an unverified authentication", async () => {
        await expect(runConfiguredAfterVerification({ userVerified: false })).rejects.toBeTruthy();

        expect(updates).toEqual([]);
    });

    it("keeps authentication successful when saving the timestamp fails", async () => {
        const failedAdapter: Pick<AuthContext["adapter"], "update"> = {
            update: () => Promise.reject(new Error("database unavailable"))
        };

        await expect(
            runConfiguredAfterVerification({ adapter: failedAdapter, userVerified: true })
        ).resolves.toBeUndefined();

        expect(loggedErrors).toHaveLength(expectedLogCount);
        expect(loggedErrors).toMatchObject([
            {
                message: "Failed to record passkey last-used time."
            }
        ]);
    });
});
