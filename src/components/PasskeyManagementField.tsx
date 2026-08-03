"use client";

import { AUTH_ERROR_CODES, PAYLOAD_SESSION_BRIDGE_PATH } from "../constants";
import { Button, useAuth, useConfig, useDocumentInfo, useTranslation } from "@payloadcms/ui";
import type { CustomTranslationsKeys, CustomTranslationsObject } from "../i18n/customTranslations";
import { type ReactNode, useEffect, useState } from "react";
import { PasskeysManagementClient } from "./PasskeyManagementClient";
import { betterAuthClient } from "../auth/client";
import { containerStyles } from "./PasskeyManagementField.css";
import { formatAdminURL } from "payload/shared";
import { mergeClassNames } from "../utils/mergeClassNames";
import { useRouter } from "next/navigation";

const PASSKEY_MANAGEMENT_ID = "payload-passkey-passkey-management";
type BridgeStatus = "loading" | "ready" | "reauthentication-required" | "error";

interface PasskeyManagementContainerProps {
    children: ReactNode;
}

const PasskeyManagementContainer = ({ children }: PasskeyManagementContainerProps): ReactNode => {
    // eslint-disable-next-line id-length
    const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    return (
        <div className={mergeClassNames("field-type", containerStyles)} id={PASSKEY_MANAGEMENT_ID}>
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

const PasskeyManagementReauthenticationMessage = (): ReactNode => {
    const { config } = useConfig();
    const { logOut } = useAuth();
    const router = useRouter();
    // eslint-disable-next-line id-length
    const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    const handleReauthenticate = async (): Promise<void> => {
        await logOut();

        const returnTo = `${location.pathname}${window.location.search}#${PASSKEY_MANAGEMENT_ID}`;
        const loginPath = `${config.admin.routes.login}?redirect=${encodeURIComponent(returnTo)}` as `/${string}`;
        router.push(formatAdminURL({ adminRoute: config.routes.admin, path: loginPath }));
    };

    return (
        <PasskeyManagementContainer>
            <p className="field-description">{t("passkeyPlugin:managementField:reauthenticationRequired")}</p>
            <Button
                buttonStyle="secondary"
                size="small"
                onClick={() => {
                    void handleReauthenticate();
                }}
            >
                {t("passkeyPlugin:managementField:reauthenticate")}
            </Button>
        </PasskeyManagementContainer>
    );
};

interface BridgeResponse {
    freshUntil?: unknown;
}

const isStepUpRequired = (error: unknown): boolean =>
    typeof error === "object" && error !== null && "code" in error && error.code === AUTH_ERROR_CODES.STEP_UP_REQUIRED;

const createBridgeSession = async (): Promise<number | false> => {
    const { data, error } = await betterAuthClient.$fetch<BridgeResponse>(PAYLOAD_SESSION_BRIDGE_PATH, {
        method: "POST",
        body: {}
    });

    if (error) {
        if (isStepUpRequired(error)) return false;
        throw new Error(`Session bridge failed: ${String(error.status)}`);
    }

    if (typeof data.freshUntil !== "number" || !Number.isFinite(data.freshUntil)) {
        throw new Error("Session bridge returned an invalid freshness deadline");
    }

    return data.freshUntil;
};

// eslint-disable-next-line max-lines-per-function, max-statements
const PasskeyManagementField = (): ReactNode => {
    const { user } = useAuth();
    const { id } = useDocumentInfo();
    // eslint-disable-next-line id-length
    const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    const [status, setStatus] = useState<BridgeStatus>("loading");
    const [freshUntil, setFreshUntil] = useState<number | null>(null);

    const isCurrentUser =
        typeof user?.id !== "undefined" && typeof id !== "undefined" && String(user.id) === String(id);

    useEffect((): (() => void) => {
        // eslint-disable-next-line no-undefined
        if (!isCurrentUser) return (): void => undefined;

        let cancelled = false;

        // eslint-disable-next-line max-statements
        const $createBridgeSession = async (): Promise<void> => {
            setStatus("loading");

            try {
                const responseFreshUntil = await createBridgeSession();

                if (!cancelled) {
                    if (!responseFreshUntil) {
                        setStatus("reauthentication-required");
                        return;
                    }

                    setFreshUntil(responseFreshUntil);
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

        void $createBridgeSession();

        return (): void => {
            cancelled = true;
        };
    }, [isCurrentUser]);

    useEffect((): (() => void) => {
        // eslint-disable-next-line no-undefined
        if (status !== "ready" || freshUntil === null) return (): void => undefined;

        const remainingMilliseconds = freshUntil - Date.now();
        const timeoutID = setTimeout(() => {
            setStatus("reauthentication-required");
        }, remainingMilliseconds);

        return () => {
            clearTimeout(timeoutID);
        };
    }, [freshUntil, status]);

    if (!isCurrentUser) {
        return <PasskeyManagementMessage message={t("passkeyPlugin:managementField:ownPasskeysOnly")} />;
    }

    if (status === "reauthentication-required") {
        return <PasskeyManagementReauthenticationMessage />;
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
            <PasskeysManagementClient
                onStepUpRequired={() => {
                    setStatus("reauthentication-required");
                }}
            />
        </PasskeyManagementContainer>
    );
};

export { PasskeyManagementField };
