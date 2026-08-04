"use client";

import { useAuth, useConfig } from "@payloadcms/ui";
import type { ReactNode } from "react";
import { useBetterAuthClient } from "../auth/client";
import { useStore } from "better-auth/react";

const ActiveBetterAuthSessionRefresh = (): null => {
    const betterAuthClient = useBetterAuthClient();
    useStore(betterAuthClient.useSession);

    return null;
};

interface BetterAuthSessionRefreshProviderProps {
    children?: ReactNode;
}

const BetterAuthSessionRefreshProvider = ({ children }: BetterAuthSessionRefreshProviderProps): ReactNode => {
    const { user } = useAuth();
    const { config } = useConfig();

    return (
        <>
            {user && config.admin.autoRefresh ? <ActiveBetterAuthSessionRefresh /> : null}
            {children}
        </>
    );
};

export { BetterAuthSessionRefreshProvider };
