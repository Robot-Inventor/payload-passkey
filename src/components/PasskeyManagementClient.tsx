"use client";

/**
 * @file
 * This file is based on the `PasskeysManagementClient.tsx` implementation from the `@delmaredigital/payload-better-auth` package
 * License: https://github.com/delmaredigital/payload-better-auth/blob/7ba5ae9db806492d514750ad09e07d18c2b86310/LICENSE
 * Ref: https://github.com/delmaredigital/payload-better-auth/blob/7ba5ae9db806492d514750ad09e07d18c2b86310/src/components/management/PasskeysManagementClient.tsx
 */

import { type BetterAuthClient, useBetterAuthClient } from "../auth/client";
import { Button, toast, useTranslation } from "@payloadcms/ui";
import type { CustomTFunction, CustomTranslationsKeys, CustomTranslationsObject } from "../i18n/customTranslations";
import { type ReactNode, useEffect, useState } from "react";
import type { Passkey } from "@better-auth/passkey";
import { PasskeyList } from "./PasskeyList";
import { PasskeyRegistrationForm } from "./PasskeyRegistrationForm";
import { PlusIcon } from "@payloadcms/ui/icons/Plus";

interface FetchPasskeysOptions {
    betterAuthClient: BetterAuthClient;
    onSuccess: (passkeyItems: Passkey[]) => void;
    onError: (message: string) => void;
    translate: CustomTFunction;
}

const fetchPasskeys = async ({
    betterAuthClient,
    onSuccess,
    onError,
    translate
}: FetchPasskeysOptions): Promise<void> => {
    try {
        const result = await betterAuthClient.passkey.listUserPasskeys();

        if (result.error) {
            onError(result.error.message ?? translate("passkeyPlugin:managementClient:failedToLoad"));
        } else {
            onSuccess(result.data);
        }
    } catch {
        onError(translate("passkeyPlugin:managementClient:failedToLoad"));
    }
};

interface PasskeysManagementClientProps {
    onStepUpRequired: () => void;
}

const PasskeysManagementClient = ({ onStepUpRequired }: PasskeysManagementClientProps): ReactNode => {
    const betterAuthClient = useBetterAuthClient();
    const [passkeys, setPasskeys] = useState<Passkey[]>([]);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const { t: translate } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    useEffect(() => {
        void fetchPasskeys({ betterAuthClient, onSuccess: setPasskeys, onError: toast.error, translate });
    }, [betterAuthClient, translate]);

    return (
        <>
            {!showRegistrationForm && (
                <Button
                    buttonStyle="secondary"
                    size="small"
                    icon=<PlusIcon />
                    onClick={() => {
                        setShowRegistrationForm(true);
                    }}
                >
                    {translate("passkeyPlugin:managementClient:addPasskey")}
                </Button>
            )}
            {showRegistrationForm && (
                <PasskeyRegistrationForm
                    onStepUpRequired={onStepUpRequired}
                    onRegistrationCancel={() => {
                        setShowRegistrationForm(false);
                    }}
                    onRegistrationSuccess={() => {
                        void (async (): Promise<void> => {
                            setShowRegistrationForm(false);
                            await fetchPasskeys({
                                betterAuthClient,
                                onSuccess: setPasskeys,
                                onError: toast.error,
                                translate
                            });
                        })();
                    }}
                />
            )}
            {passkeys.length ? (
                <PasskeyList
                    passkeys={passkeys}
                    onStepUpRequired={onStepUpRequired}
                    onDelete={(passkeyId) => {
                        setPasskeys((prev) => prev.filter((item) => item.id !== passkeyId));
                    }}
                />
            ) : (
                <p className="field-description">{translate("passkeyPlugin:managementClient:notFound")}</p>
            )}
        </>
    );
};

export { PasskeysManagementClient };
