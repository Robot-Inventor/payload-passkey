import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const de = {
    passkeyPlugin: {
        loginButton: {
            or: "oder",
            failedToLogin: "Die Anmeldung mit einem Passkey ist fehlgeschlagen.",
            notAllowed: "Die Passkey-Operation wurde abgebrochen oder ist nicht zulässig.",
            loginWithPasskey: "Mit einem Passkey anmelden"
        },
        managementClient: {
            failedToLoad: "Passkeys konnten nicht geladen werden.",
            failedToRegister: "Der Passkey konnte nicht registriert werden.",
            successfullyRegistered: "Passkey erfolgreich registriert.",
            notAllowed: "Die Registrierung des Passkeys wurde abgebrochen oder ist nicht zulässig.",
            alreadyRegistered: "Dieser Passkey ist bereits registriert.",
            confirmDelete: {
                heading: "Diesen Passkey löschen?",
                body: "Du bist dabei, den Passkey „{{name}}“ zu löschen. Diese Aktion kann nicht rückgängig gemacht werden."
            },
            failedToDelete: "Der Passkey konnte nicht gelöscht werden.",
            successfullyDeleted: "Passkey erfolgreich gelöscht.",
            addPasskey: "Passkey hinzufügen",
            passkeyName: "Name (optional)",
            register: "Registrieren",
            registering: "Wird registriert...",
            cancel: "Abbrechen",
            unknownAuthenticator: "Unbekannter Authenticator",
            createdAt: "Erstellt: ",
            delete: "Löschen",
            deleting: "Wird gelöscht...",
            notFound: "Keine registrierten Passkeys gefunden."
        },
        managementField: {
            passkey: "Passkey",
            ownPasskeysOnly: "Du kannst nur deine eigenen Passkeys verwalten.",
            preparingManagement: "Passkey-Verwaltung wird vorbereitet...",
            failedToManage: "Die Passkey-Verwaltung konnte nicht gestartet werden. Bitte melde dich wieder an.",
            reauthenticationRequired: "Melde dich wieder an, um Passkeys zu verwalten.",
            reauthenticate: "Wieder anmelden"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Abmeldung fehlgeschlagen: {{message}}",
            failedToLogout: "Abmeldung fehlgeschlagen.",
            logout: "Abmelden"
        }
    }
} as const satisfies CustomTranslationsObject;

export { de };
