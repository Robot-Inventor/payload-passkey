"use client";

import { AUTH_SESSION_POLL_INTERVAL_SECONDS } from "../constants";
import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";

const betterAuthClient = createAuthClient({
    plugins: [passkeyClient()],
    sessionOptions: {
        refetchInterval: AUTH_SESSION_POLL_INTERVAL_SECONDS
    }
});

export { betterAuthClient };
