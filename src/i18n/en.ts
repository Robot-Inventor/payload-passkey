import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const en = {
    passkeyPlugin: {
        loginButton: {
            or: "or",
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
                heading: "Delete this passkey?",
                body: 'You are about to delete the passkey "{{name}}". This action cannot be undone.'
            },
            failedToDelete: "Failed to delete the passkey.",
            successfullyDeleted: "Passkey deleted successfully.",
            addPasskey: "Add a passkey",
            passkeyName: "Name (optional)",
            register: "Register",
            registering: "Registering...",
            cancel: "Cancel",
            unknownAuthenticator: "Unknown authenticator",
            createdAt: "Created: ",
            delete: "Delete",
            deleting: "Deleting...",
            notFound: "No registered passkeys found."
        },
        managementField: {
            passkey: "Passkey",
            ownPasskeysOnly: "You can only manage your own passkeys.",
            preparingManagement: "Preparing passkey management...",
            failedToManage: "Could not start passkey management. Please login again.",
            reauthenticationRequired: "Please login again to manage passkeys.",
            reauthenticate: "Login again"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Failed to log out: {{message}}",
            failedToLogout: "Failed to log out.",
            logout: "Log out"
        }
    }
} as const satisfies CustomTranslationsObject;

export { en };
