"use client";

import type { CustomTranslationsKeys, CustomTranslationsObject } from "../i18n/passkeyCustomTranslations";
import { type ReactNode, useEffect, useState } from "react";
import { useAuth, useDocumentInfo, useTranslation } from "@payloadcms/ui";
import { PasskeysManagementClient } from "./PasskeyManagementClient";
import { containerStyles } from "./PasskeyManagementField.css";
import { mergeClassNames } from "../utils/mergeClassNames";

type BridgeStatus = "loading" | "ready" | "error";

interface PasskeyManagementContainerProps {
    children: ReactNode;
}

const PasskeyManagementContainer = ({ children }: PasskeyManagementContainerProps): ReactNode => {
    // eslint-disable-next-line id-length
    const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    return (
        <div className={mergeClassNames("field-type", containerStyles)}>
            <h3>{t("passkeyPlugin:managementField:passkey")}</h3>
            {children}
        </div>
    );
};

interface PasskeyManagementMessageProps {
    message: string;
}

const PasskeyManagementMessage = ({ message }: PasskeyManagementMessageProps): ReactNode => (
    <PasskeyManagementContainer>
        <p className="field-description">{message}</p>
    </PasskeyManagementContainer>
);

// eslint-disable-next-line max-lines-per-function, max-statements
const PasskeyManagementField = (): ReactNode => {
    const { user } = useAuth();
    const { id } = useDocumentInfo();
    // eslint-disable-next-line id-length
    const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    const [status, setStatus] = useState<BridgeStatus>("loading");

    const isCurrentUser =
        typeof user?.id !== "undefined" && typeof id !== "undefined" && String(user.id) === String(id);

    useEffect((): (() => void) => {
        // eslint-disable-next-line no-undefined
        if (!isCurrentUser) return (): void => undefined;

        let cancelled = false;

        const createBridgeSession = async (): Promise<void> => {
            setStatus("loading");

            try {
                const response = await fetch("/api/auth/payload-session-bridge", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: "{}",
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(`Session bridge failed: ${String(response.status)}`);
                }

                if (!cancelled) {
                    setStatus("ready");
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);

                if (!cancelled) {
                    setStatus("error");
                }
            }
        };

        void createBridgeSession();

        return (): void => {
            cancelled = true;
        };
    }, [isCurrentUser]);

    if (!isCurrentUser) {
        return <PasskeyManagementMessage message={t("passkeyPlugin:managementField:ownPasskeysOnly")} />;
    }

    if (status === "loading" || status === "error") {
        return (
            <PasskeyManagementMessage
                message={
                    status === "loading"
                        ? t("passkeyPlugin:managementField:preparingManagement")
                        : t("passkeyPlugin:managementField:failedToManage")
                }
            />
        );
    }

    return (
        <PasskeyManagementContainer>
            <PasskeysManagementClient />
        </PasskeyManagementContainer>
    );
};

export { PasskeyManagementField };
