"use client";

/**
 * @file
 * This file is based on the `PasskeysManagementClient.tsx` implementation from the `@delmaredigital/payload-better-auth` package
 * License: https://github.com/delmaredigital/payload-better-auth/blob/7ba5ae9db806492d514750ad09e07d18c2b86310/LICENSE
 * Ref: https://github.com/delmaredigital/payload-better-auth/blob/7ba5ae9db806492d514750ad09e07d18c2b86310/src/components/management/PasskeysManagementClient.tsx
 */

import { type BetterAuthClient, useBetterAuthClient } from "../auth/client";
import { Button, ConfirmationModal, TextInput, toast, useModal, useTranslation } from "@payloadcms/ui";
import { type ChangeEvent, type ReactNode, useEffect, useState } from "react";
import type { CustomTFunction, CustomTranslationsKeys, CustomTranslationsObject } from "../i18n/customTranslations";
import { type Passkey, getAuthenticatorName } from "@better-auth/passkey";
import {
    passkeyItemDateStyles,
    passkeyItemDeleteButtonStyles,
    passkeyItemStyles,
    registerButtonContainerStyles,
    registerFormStyles
} from "./PasskeyManagementClient.css";
import { AUTH_ERROR_CODES } from "../constants";
import { PlusIcon } from "@payloadcms/ui/icons/Plus";
import { mergeClassNames } from "../utils/mergeClassNames";

interface PasskeysManagementClientProps {
    onStepUpRequired: () => void;
}

const isStepUpRequired = (error: unknown): boolean =>
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    ([AUTH_ERROR_CODES.SESSION_NOT_FRESH, AUTH_ERROR_CODES.STEP_UP_REQUIRED] as string[]).includes(
        error.code as string
    );

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

// oxlint-disable-next-line no-undefined
const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
});

// oxlint-disable-next-line max-lines-per-function, max-lines-per-function
const PasskeysManagementClient = ({ onStepUpRequired }: PasskeysManagementClientProps): ReactNode => {
    const modalSlug = "confirm-delete-passkey";
    const betterAuthClient = useBetterAuthClient();

    const [passkeys, setPasskeys] = useState<Passkey[]>([]);
    const [registering, setRegistering] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [passkeyName, setPasskeyName] = useState("");
    const [passkeyToDelete, setPasskeyToDelete] = useState<Passkey | null>(null);
    const { openModal } = useModal();
    const { t: translate } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    useEffect(() => {
        void fetchPasskeys({ betterAuthClient, onSuccess: setPasskeys, onError: toast.error, translate });
    }, [betterAuthClient, translate]);

    const handleRegister = async (): Promise<void> => {
        setRegistering(true);

        try {
            const result = await betterAuthClient.passkey.addPasskey({
                name: passkeyName
            });

            if (result.error) {
                if (isStepUpRequired(result.error)) {
                    setRegistering(false);
                    onStepUpRequired();
                    return;
                }

                toast.error(result.error.message ?? translate("passkeyPlugin:managementClient:failedToRegister"));
            } else {
                toast.success(translate("passkeyPlugin:managementClient:successfullyRegistered"));
                setShowRegisterForm(false);
                setPasskeyName("");
                await fetchPasskeys({
                    betterAuthClient,
                    onSuccess: setPasskeys,
                    onError: toast.error,
                    translate
                });
            }

            setRegistering(false);
        } catch (err) {
            if (err instanceof Error && err.name === "NotAllowedError") {
                toast.error(translate("passkeyPlugin:managementClient:notAllowed"));
            } else if (err instanceof Error && err.name === "InvalidStateError") {
                toast.error(translate("passkeyPlugin:managementClient:alreadyRegistered"));
            } else {
                toast.error(
                    err instanceof Error ? err.message : translate("passkeyPlugin:managementClient:failedToRegister")
                );
            }

            setRegistering(false);
        }
    };

    const handleDelete = async (passkeyId: string): Promise<void> => {
        setDeleting(passkeyId);

        try {
            const result = await betterAuthClient.passkey.deletePasskey({ id: passkeyId });

            if (result.error) {
                if (isStepUpRequired(result.error)) {
                    setDeleting(null);
                    onStepUpRequired();
                    return;
                }

                toast.error(result.error.message ?? translate("passkeyPlugin:managementClient:failedToDelete"));
            } else {
                setPasskeys((prev) => prev.filter((item) => item.id !== passkeyId));
                toast.success(translate("passkeyPlugin:managementClient:successfullyDeleted"));
            }

            setDeleting(null);
        } catch {
            toast.error(translate("passkeyPlugin:managementClient:failedToDelete"));
            setDeleting(null);
        }
    };

    const formatPasskeyName = (passkey: Passkey | null): string => {
        if (passkey?.name) return passkey.name;

        const authenticatorName =
            getAuthenticatorName(passkey?.aaguid) ?? translate("passkeyPlugin:managementClient:unknownAuthenticator");

        return authenticatorName;
    };

    return (
        <>
            {!showRegisterForm && (
                <Button
                    buttonStyle="secondary"
                    size="small"
                    icon=<PlusIcon />
                    onClick={() => {
                        setShowRegisterForm(true);
                    }}
                >
                    {translate("passkeyPlugin:managementClient:addPasskey")}
                </Button>
            )}
            {showRegisterForm && (
                <div className={registerFormStyles}>
                    <TextInput
                        label={translate("passkeyPlugin:managementClient:passkeyName")}
                        path="passkeyName"
                        value={passkeyName}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setPasskeyName(event.target.value);
                        }}
                    />
                    <div className={registerButtonContainerStyles}>
                        <Button
                            buttonStyle="secondary"
                            size="small"
                            onClick={() => {
                                setShowRegisterForm(false);
                            }}
                        >
                            {translate("passkeyPlugin:managementClient:cancel")}
                        </Button>
                        <Button
                            buttonStyle="primary"
                            size="small"
                            onClick={() => {
                                void handleRegister();
                            }}
                            disabled={registering}
                        >
                            {registering
                                ? translate("passkeyPlugin:managementClient:registering")
                                : translate("passkeyPlugin:managementClient:register")}
                        </Button>
                    </div>
                </div>
            )}
            {passkeys.length ? (
                <>
                    {passkeys.map((passkeyItem) => (
                        <div key={passkeyItem.id} className={passkeyItemStyles}>
                            <div>{formatPasskeyName(passkeyItem)}</div>
                            <p className={mergeClassNames("field-description", passkeyItemDateStyles)}>
                                {translate("passkeyPlugin:managementClient:createdAt")}{" "}
                                <time dateTime={passkeyItem.createdAt.toISOString()} suppressHydrationWarning>
                                    {dateFormatter.format(passkeyItem.createdAt)}
                                </time>
                            </p>
                            <Button
                                className={passkeyItemDeleteButtonStyles}
                                buttonStyle="secondary"
                                size="small"
                                onClick={() => {
                                    setPasskeyToDelete(passkeyItem);
                                    openModal(modalSlug);
                                }}
                                disabled={deleting === passkeyItem.id}
                            >
                                {deleting === passkeyItem.id
                                    ? translate("passkeyPlugin:managementClient:deleting")
                                    : translate("passkeyPlugin:managementClient:delete")}
                            </Button>
                        </div>
                    ))}
                </>
            ) : (
                <p className="field-description">{translate("passkeyPlugin:managementClient:notFound")}</p>
            )}
            <ConfirmationModal
                modalSlug={modalSlug}
                heading={translate("passkeyPlugin:managementClient:confirmDelete:heading")}
                body={translate("passkeyPlugin:managementClient:confirmDelete:body", {
                    name: formatPasskeyName(passkeyToDelete)
                })}
                onConfirm={() => {
                    if (!passkeyToDelete) {
                        toast.error(translate("passkeyPlugin:managementClient:failedToDelete"));
                        return;
                    }
                    void handleDelete(passkeyToDelete.id);
                }}
            />
        </>
    );
};

export { PasskeysManagementClient };
