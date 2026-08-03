import type { NestedKeysStripped } from "@payloadcms/translations";
import type { useTranslation } from "@payloadcms/ui";

interface CustomTranslationsObject {
    passkeyPlugin: {
        loginButton: {
            or: string;
            failedToLogin: string;
            notAllowed: string;
            loginWithPasskey: string;
        };
        managementClient: {
            failedToLoad: string;
            failedToRegister: string;
            successfullyRegistered: string;
            notAllowed: string;
            alreadyRegistered: string;
            confirmDelete: {
                heading: string;
                body: string;
            };
            failedToDelete: string;
            successfullyDeleted: string;
            addPasskey: string;
            passkeyName: string;
            register: string;
            registering: string;
            cancel: string;
            unknownAuthenticator: string;
            createdAt: string;
            delete: string;
            deleting: string;
            notFound: string;
        };
        managementField: {
            passkey: string;
            ownPasskeysOnly: string;
            preparingManagement: string;
            failedToManage: string;
        };
    };
}

type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>;
type CustomTFunction = ReturnType<typeof useTranslation<CustomTranslationsObject, CustomTranslationsKeys>>["t"];

export type { CustomTranslationsObject, CustomTranslationsKeys, CustomTFunction };
