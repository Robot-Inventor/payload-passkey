import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const en = {
    passkeyPlugin: {
        loginButton: {
            or: "Or",
            failedToLogin: "Failed to login with a passkey.",
            notAllowed: "The passkey operation was canceled or not allowed.",
            loginWithPasskey: "Login with a passkey"
        },
        managementClient: {
            failedToLoad: "Failed to load passkeys.",
            failedToRegister: "Failed to register the passkey.",
            successfullyRegistered: "Passkey registered successfully.",
            notAllowed: "The passkey operation was canceled or not allowed.",
            alreadyRegistered: "This passkey is already registered.",
            confirmDelete: {
                heading: "Confirm deletion",
                body: "You are about to delete the passkey {{name}}. Are you sure?"
            },
            failedToDelete: "Failed to delete the passkey.",
            successfullyDeleted: "Passkey deleted successfully.",
            addPasskey: "Add passkey",
            passkeyName: "Name (optional)",
            register: "Register",
            registering: "Registering...",
            cancel: "Cancel",
            unknownAuthenticator: "Unknown authenticator",
            createdAt: "Created At:",
            delete: "Delete",
            deleting: "Deleting...",
            notFound: "No registered passkeys found."
        },
        managementField: {
            passkey: "Passkey",
            ownPasskeysOnly: "You can only manage your own passkeys.",
            preparingManagement: "Preparing passkey management...",
            failedToManage: "Could not start passkey management. Please log back in.",
            reauthenticationRequired: "For your own security, please log back in to manage passkeys.",
            reauthenticate: "Log back in"
        }
    }
} as const satisfies CustomTranslationsObject;

export { en };
