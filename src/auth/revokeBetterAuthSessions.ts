import { BETTER_AUTH_COLLECTION_SLUGS } from "../constants.js";
import type { PayloadRequest } from "payload";

const revokeBetterAuthSessions = async (req: PayloadRequest, userId: number | string): Promise<void> => {
    await req.payload.delete({
        collection: BETTER_AUTH_COLLECTION_SLUGS.session,
        overrideAccess: true,
        req,
        where: {
            user: {
                equals: userId
            }
        }
    });
};

export { revokeBetterAuthSessions };
