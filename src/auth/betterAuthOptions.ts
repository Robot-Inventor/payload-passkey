import { type PasskeyOptions, passkey } from "@better-auth/passkey";
import { APIError } from "better-auth/api";
import type { BetterAuthOptions } from "better-auth";

const generateBetterAuthOptions = ({
    rpID,
    rpName,
    origin
}: Pick<PasskeyOptions, "rpID" | "rpName" | "origin">): BetterAuthOptions =>
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
                    afterVerification: ({ verification }) => {
                        if (!verification.authenticationInfo.userVerified) {
                            throw new APIError("UNAUTHORIZED", { message: "User verification required" });
                        }
                    }
                }
            })
        ]
    }) as const satisfies BetterAuthOptions;

export { generateBetterAuthOptions };
