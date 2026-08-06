"use client";

import { Button, toast, useAuth, useConfig, useTranslation } from "@payloadcms/ui";
import type { CustomTranslationsKeys, CustomTranslationsObject } from "../i18n/customTranslations";
import { type ReactNode, useEffect } from "react";
import { buttonStyles, orTextStyles } from "./PasskeyLoginButton.css";
import { useRouter, useSearchParams } from "next/navigation";
import { LockIcon } from "@payloadcms/ui/icons/Lock";
import { getSafeRedirect } from "payload/shared";
import { useBetterAuthClient } from "../auth/client";

interface PasskeyLoginButtonProps {
    enablePasskeyAutofill: boolean;
}

// eslint-disable-next-line max-lines-per-function
const PasskeyLoginButton = ({ enablePasskeyAutofill }: PasskeyLoginButtonProps): ReactNode => {
    const { config } = useConfig();
    const adminRoute = config.routes.admin;
    const betterAuthClient = useBetterAuthClient();
    const { fetchFullUser } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect");
    // eslint-disable-next-line id-length
    const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    useEffect((): (() => void) => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        if (!enablePasskeyAutofill) return (): void => {};

        const input = document.querySelector<HTMLInputElement>("#field-email");
        if (input) {
            input.autocomplete = "email webauthn";
        }

        const abortController = new AbortController();

        void (async (): Promise<void> => {
            try {
                const result = await betterAuthClient.signIn.passkey({
                    autoFill: true,
                    fetchOptions: { signal: abortController.signal }
                });
                if (result.error) return;

                await fetchFullUser();
                // eslint-disable-next-line react-doctor/nextjs-no-client-side-redirect
                router.push(
                    getSafeRedirect({
                        fallbackTo: adminRoute,
                        redirectTo: redirectTo ?? ""
                    })
                );
            } catch {
                // Do nothing if passkey autofill was not used
            }
        })();

        const cleanup = (): void => {
            abortController.abort();
            if (input) {
                input.autocomplete = "email";
            }
        };

        return cleanup;
    }, [betterAuthClient, adminRoute, enablePasskeyAutofill, fetchFullUser, router, redirectTo, t]);

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
                        fallbackTo: adminRoute,
                        redirectTo: redirectTo ?? ""
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

export { type PasskeyLoginButtonProps, PasskeyLoginButton };
