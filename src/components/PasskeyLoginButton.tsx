"use client";

import { Button, toast, useAuth, useConfig, useTranslation } from "@payloadcms/ui";
import type { CustomTranslationsKeys, CustomTranslationsObject } from "../i18n/passkeyCustomTranslations";
import { buttonStyles, orTextStyles } from "./PasskeyLoginButton.css";
import { useRouter, useSearchParams } from "next/navigation";
import { LockIcon } from "@payloadcms/ui/icons/Lock";
import type { ReactNode } from "react";
import { betterAuthClient } from "../auth/client";
import { getSafeRedirect } from "payload/shared";

const PasskeyLoginButton = (): ReactNode => {
    const { config } = useConfig();
    const { fetchFullUser } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    // eslint-disable-next-line id-length
    const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    const handleClick = async (): Promise<void> => {
        try {
            const result = await betterAuthClient.signIn.passkey();
            if (result.error) {
                const errorMessage = result.error.message ?? t("passkeyPlugin:loginButton:failedToLogin");
                toast.error(errorMessage);
            } else {
                await fetchFullUser();
                router.push(
                    getSafeRedirect({
                        fallbackTo: config.routes.admin,
                        redirectTo: searchParams.get("redirect") ?? ""
                    })
                );
            }
        } catch (err) {
            if (err instanceof Error && err.name === "NotAllowedError") {
                toast.error(t("passkeyPlugin:loginButton:notAllowed"));
            } else {
                toast.error(err instanceof Error ? err.message : t("passkeyPlugin:loginButton:failedToLogin"));
            }
        }
    };

    return (
        <>
            <div className={orTextStyles}>{t("passkeyPlugin:loginButton:or")}</div>
            <Button
                className={buttonStyles}
                icon={<LockIcon />}
                iconPosition="left"
                onClick={() => {
                    void handleClick();
                }}
                buttonStyle="secondary"
                size="large"
            >
                {t("passkeyPlugin:loginButton:loginWithPasskey")}
            </Button>
        </>
    );
};

export { PasskeyLoginButton };
