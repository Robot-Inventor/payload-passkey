import { Button, TextInput, toast, useTranslation } from "@payloadcms/ui";
import { type ChangeEvent, type ReactNode, useState } from "react";
import type { CustomTranslationsKeys, CustomTranslationsObject } from "../i18n/customTranslations";
import { registerButtonContainerStyles, registerFormStyles } from "./PasskeyRegistrationForm.css";
import { isStepUpRequired } from "../utils/isStepUpRequired";
import { useBetterAuthClient } from "../auth/client";

interface RegistrationFormProps {
    onStepUpRequired: () => void;
    onRegistrationCancel: () => void;
    onRegistrationSuccess: () => void;
}

const PasskeyRegistrationForm = ({
    onStepUpRequired,
    onRegistrationCancel,
    onRegistrationSuccess
}: RegistrationFormProps): ReactNode => {
    const betterAuthClient = useBetterAuthClient();
    const [registering, setRegistering] = useState(false);
    const [passkeyName, setPasskeyName] = useState("");
    const { t: translate } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

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
                setPasskeyName("");
                onRegistrationSuccess();
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

    return (
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
                <Button buttonStyle="secondary" size="small" onClick={onRegistrationCancel}>
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
    );
};

export { PasskeyRegistrationForm };
