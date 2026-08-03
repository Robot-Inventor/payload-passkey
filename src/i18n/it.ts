import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const it = {
    passkeyPlugin: {
        loginButton: {
            or: "Oppure",
            failedToLogin: "Accesso con una passkey non riuscito.",
            notAllowed: "L'operazione della passkey è stata annullata o non è consentita.",
            loginWithPasskey: "Login con una passkey"
        },
        managementClient: {
            failedToLoad: "Caricamento delle passkey non riuscito.",
            failedToRegister: "Registrazione della passkey non riuscita.",
            successfullyRegistered: "Passkey registrata correttamente.",
            notAllowed: "L'operazione della passkey è stata annullata o non è consentita.",
            alreadyRegistered: "Questa passkey è già registrata.",
            confirmDelete: {
                heading: "Conferma l'eliminazione",
                body: "Stai per eliminare passkey {{name}}. Sei sicuro?"
            },
            failedToDelete: "Eliminazione della passkey non riuscita.",
            successfullyDeleted: "Passkey eliminata correttamente.",
            addPasskey: "Aggiungi Passkey",
            passkeyName: "Nome (facoltativo)",
            register: "Registra",
            registering: "Registrazione...",
            cancel: "Cancella",
            unknownAuthenticator: "Autenticatore sconosciuto",
            createdAt: "Creato il:",
            delete: "Elimina",
            deleting: "Sto eliminando...",
            notFound: "Nessuna passkey registrata trovata."
        },
        managementField: {
            passkey: "Passkey",
            ownPasskeysOnly: "Puoi gestire solo le tue passkey.",
            preparingManagement: "Preparazione della gestione delle passkey...",
            failedToManage: "Impossibile avviare la gestione delle passkey. Vai al Log in.",
            reauthenticationRequired: "Per la tua sicurezza, vai al Log in per gestire le passkey.",
            reauthenticate: "Vai al Log in"
        }
    }
} as const satisfies CustomTranslationsObject;

export { it };
