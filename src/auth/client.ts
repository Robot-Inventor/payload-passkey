"use client";

import { type AuthClient, createAuthClient } from "better-auth/client";
import { AUTH_SESSION_POLL_INTERVAL_SECONDS } from "../constants";
import { getAuthBasePath } from "./basePath";
import { passkeyClient } from "@better-auth/passkey/client";
import { useConfig } from "@payloadcms/ui";

type BetterAuthClient = AuthClient<{ plugins: [ReturnType<typeof passkeyClient>] }>;

const useBetterAuthClient = (): BetterAuthClient => {
    const { config } = useConfig();
    const basePath = getAuthBasePath(config.routes.api);

    const authClient = createAuthClient({
        basePath,
        plugins: [passkeyClient()],
        sessionOptions: {
            refetchInterval: AUTH_SESSION_POLL_INTERVAL_SECONDS
        }
    });

    return authClient;
};

export { type BetterAuthClient, useBetterAuthClient };
