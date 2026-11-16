import { type PasskeyOptions, passkey } from "@better-auth/passkey";
import { APIError } from "better-auth/api";
import type { BetterAuthOptions } from "better-auth";
import { recordPasskeyLastUsedAt } from "./recordPasskeyLastUsedAt";

const generateBetterAuthOptions = ({ rpID, rpName, origin }: Pick<PasskeyOptions, "rpID" | "rpName" | "origin">) =>
    ({
        emailAndPassword: {
            enabled: false
        },
        plugins: [
            passkey({
                rpID,
                rpName,
                origin,
                authenticatorSelection: {
                    userVerification: "required"
                },
                authentication: {
                    afterVerification: async ({ ctx, verification, clientData }) => {
                        if (!verification.authenticationInfo.userVerified) {
                            throw new APIError("UNAUTHORIZED", { message: "User verification required" });
                        }

                        await recordPasskeyLastUsedAt(ctx.context, clientData.id);
                    }
                }
            }),
            {
                id: "payload-passkey-last-used",
                schema: {
                    passkey: {
                        fields: {
                            lastUsedAt: {
                                type: "date",
                                required: false
                            }
                        }
                    }
                }
            }
        ]
    }) as const satisfies BetterAuthOptions;

export { generateBetterAuthOptions };
