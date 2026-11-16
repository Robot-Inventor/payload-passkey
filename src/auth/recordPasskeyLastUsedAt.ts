import type { AuthContext } from "better-auth";

interface PasskeyUsageContext {
    adapter: AuthContext["adapter"];
    logger: AuthContext["logger"];
}

const recordPasskeyLastUsedAt = async (context: PasskeyUsageContext, credentialID: string): Promise<void> => {
    try {
        await context.adapter.update({
            model: "passkey",
            where: [
                {
                    field: "credentialID",
                    value: credentialID
                }
            ],
            update: {
                lastUsedAt: new Date()
            }
        });
    } catch (error) {
        context.logger.error("Failed to record passkey last-used time.", error);
    }
};

export { recordPasskeyLastUsedAt };
