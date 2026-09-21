"use client";

/**
 * @file
 * This file is based on the `PasskeyManagementClient.tsx` implementation from the `@delmaredigital/payload-better-auth` package
 * License: https://github.com/delmaredigital/payload-better-auth/blob/7ba5ae9db806492d514750ad09e07d18c2b86310/LICENSE
 * Ref: https://github.com/delmaredigital/payload-better-auth/blob/7ba5ae9db806492d514750ad09e07d18c2b86310/src/components/management/PasskeysManagementClient.tsx
 */

import { type BetterAuthClient, useBetterAuthClient } from "../auth/client";
import type { CustomTFunction, CustomTranslationsKeys, CustomTranslationsObject } from "../i18n/customTranslations";
import { type ReactNode, useEffect, useState } from "react";
import { toast, useTranslation } from "@payloadcms/ui";
import type { Passkey } from "@better-auth/passkey";
import { PasskeyList } from "./PasskeyList";
import { PasskeyRegistrationForm } from "./PasskeyRegistrationForm";

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

interface PasskeyManagementClientProps {
    onStepUpRequired: () => void;
}

const PasskeyManagementClient = ({ onStepUpRequired }: PasskeyManagementClientProps): ReactNode => {
    const betterAuthClient = useBetterAuthClient();
    const [passkeys, setPasskeys] = useState<Passkey[]>([]);
    const { t: translate } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    useEffect(() => {
        void fetchPasskeys({ betterAuthClient, onSuccess: setPasskeys, onError: toast.error, translate });
    }, [betterAuthClient, translate]);

    return (
        <>
            <PasskeyRegistrationForm
                onStepUpRequired={onStepUpRequired}
                onRegistrationSuccess={() => {
                    void (async (): Promise<void> => {
                        await fetchPasskeys({
                            betterAuthClient,
                            onSuccess: setPasskeys,
                            onError: toast.error,
                            translate
                        });
                    })();
                }}
            />
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

export { PasskeyManagementClient };
