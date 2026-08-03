import type { CollectionAfterChangeHook, CollectionAfterLoginHook, CollectionAfterLogoutHook } from "payload";
import type { PayloadWithAuth } from "@delmaredigital/payload-better-auth";
import { revokeBetterAuthSessions } from "../auth/revokeBetterAuthSessions";

interface UserWithTotpSecret {
    id: number | string;
    totpSecret?: null | string;
}

const afterChange: CollectionAfterChangeHook<UserWithTotpSecret> = async ({ doc, operation, previousDoc, req }) => {
    if (operation !== "update") return doc;

    const hasJustEnabledTotp = !previousDoc.totpSecret && doc.totpSecret;
    const hasReenabledTotp = previousDoc.totpSecret && doc.totpSecret && previousDoc.totpSecret !== doc.totpSecret;
    const hasDisabledTotp = previousDoc.totpSecret && !doc.totpSecret;

    if (!hasJustEnabledTotp && !hasReenabledTotp && !hasDisabledTotp) return doc;

    await revokeBetterAuthSessions(req, doc.id);
    return doc;
};

const afterLogin: CollectionAfterLoginHook<UserWithTotpSecret> = async ({ req }): Promise<void> => {
    // Revoke old Better Auth session when logging in via Payload
    await (req.payload as PayloadWithAuth).betterAuth.api.signOut({
        headers: req.headers
    });
};

const afterLogout: CollectionAfterLogoutHook<UserWithTotpSecret> = async ({ req }): Promise<void> => {
    const allSessions = req.searchParams.get("allSessions") === "true";

    if (allSessions) {
        const userId = req.user?.id;
        if (typeof userId === "undefined") return;
        await revokeBetterAuthSessions(req, userId);
    } else {
        await (req.payload as PayloadWithAuth).betterAuth.api.signOut({
            headers: req.headers
        });
    }
};

export { afterChange, afterLogin, afterLogout };
