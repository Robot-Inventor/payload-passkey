import { Button, ConfirmationModal, toast, useModal, useTranslation } from "@payloadcms/ui";
import type { CustomTranslationsKeys, CustomTranslationsObject } from "../i18n/customTranslations";
import { type Passkey, getAuthenticatorName } from "@better-auth/passkey";
import { type ReactNode, useState } from "react";
import { passkeyItemDateStyles, passkeyItemDeleteButtonStyles, passkeyItemStyles } from "./PasskeyList.css";
import { isStepUpRequired } from "../utils/isStepUpRequired";
import { mergeClassNames } from "../utils/mergeClassNames";
import { useBetterAuthClient } from "../auth/client";

// oxlint-disable-next-line no-undefined
const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
});

interface PasskeyListProps {
    passkeys: Passkey[];
    onStepUpRequired: () => void;
    onDelete: (passkeyId: string) => void;
}

const PasskeyList = ({ passkeys, onStepUpRequired, onDelete }: PasskeyListProps): ReactNode => {
    const modalSlug = "confirm-delete-passkey";

    const betterAuthClient = useBetterAuthClient();
    const { openModal } = useModal();
    const [deleting, setDeleting] = useState<string | null>(null);
    const [passkeyToDelete, setPasskeyToDelete] = useState<Passkey | null>(null);
    const { t: translate } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

    const formatPasskeyName = (passkey: Passkey | null): string => {
        if (passkey?.name) return passkey.name;

        const authenticatorName =
            getAuthenticatorName(passkey?.aaguid) ?? translate("passkeyPlugin:managementClient:unknownAuthenticator");

        return authenticatorName;
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
            } else if (result.data.status) {
                onDelete(passkeyId);
                toast.success(translate("passkeyPlugin:managementClient:successfullyDeleted"));
            } else {
                toast.error(translate("passkeyPlugin:managementClient:failedToDelete"));
            }

            setDeleting(null);
        } catch {
            toast.error(translate("passkeyPlugin:managementClient:failedToDelete"));
            setDeleting(null);
        }
    };

    return (
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

export { PasskeyList };
