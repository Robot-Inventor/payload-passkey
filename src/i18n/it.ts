import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const it = {
    passkeyPlugin: {
        loginButton: {
            or: "oppure",
            failedToLogin: "Accesso con una passkey non riuscito.",
            notAllowed: "L'operazione della passkey è stata annullata o non è consentita.",
            loginWithPasskey: "Accedi con una passkey"
        },
        managementClient: {
            failedToLoad: "Caricamento delle passkey non riuscito.",
            failedToRegister: "Registrazione della passkey non riuscita.",
            successfullyRegistered: "Passkey registrata correttamente.",
            notAllowed: "La registrazione della passkey è stata annullata o non è consentita.",
            alreadyRegistered: "Questa passkey è già registrata.",
            confirmDelete: {
                heading: "Eliminare questa passkey?",
                body: "Stai per eliminare la passkey «{{name}}». Questa azione non può essere annullata."
            },
            failedToDelete: "Eliminazione della passkey non riuscita.",
            successfullyDeleted: "Passkey eliminata correttamente.",
            addPasskey: "Aggiungi una passkey",
            passkeyName: "Nome (facoltativo)",
            register: "Registra",
            registering: "Registrazione...",
            cancel: "Annulla",
            unknownAuthenticator: "Autenticatore sconosciuto",
            createdAt: "Creata: ",
            delete: "Elimina",
            deleting: "Eliminazione...",
            notFound: "Nessuna passkey registrata trovata."
        },
        managementField: {
            passkey: "Passkey",
            ownPasskeysOnly: "Puoi gestire solo le tue passkey.",
            preparingManagement: "Preparazione della gestione delle passkey...",
            failedToManage: "Impossibile avviare la gestione delle passkey. Accedi di nuovo.",
            reauthenticationRequired: "Accedi di nuovo per gestire le passkey.",
            reauthenticate: "Accedi di nuovo"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Disconnessione non riuscita: {{message}}",
            failedToLogout: "Disconnessione non riuscita.",
            logout: "Disconnetti"
        }
    }
} as const satisfies CustomTranslationsObject;

export { it };
