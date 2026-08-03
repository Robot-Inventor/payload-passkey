import type { CustomTranslationsObject } from "./customTranslations";

const nl = {
    passkeyPlugin: {
        loginButton: {
            or: "Of",
            failedToLogin: "Inloggen met een passkey is mislukt.",
            notAllowed: "De passkey-bewerking is geannuleerd of niet toegestaan.",
            loginWithPasskey: "Inloggen met een passkey"
        },
        managementClient: {
            failedToLoad: "Kan passkeys niet laden.",
            failedToRegister: "Kan de passkey niet registreren.",
            successfullyRegistered: "Passkey is geregistreerd.",
            notAllowed: "De passkey-bewerking is geannuleerd of niet toegestaan.",
            alreadyRegistered: "Deze passkey is al geregistreerd.",
            confirmDelete: {
                heading: "Bevestig verwijdering",
                body: "U staat op het punt om passkey {{name}} te verwijderen. Weet u het zeker?"
            },
            failedToDelete: "Kan de passkey niet verwijderen.",
            successfullyDeleted: "Passkey is verwijderd.",
            addPasskey: "Voeg passkey toe",
            passkeyName: "Naam (optioneel)",
            register: "Registreren",
            registering: "Registreren...",
            cancel: "Annuleren",
            unknownAuthenticator: "Onbekende verificator",
            createdAt: "Aangemaakt op:",
            delete: "Verwijderen",
            deleting: "Verwijderen...",
            notFound: "Geen geregistreerde passkeys gevonden."
        },
        managementField: {
            passkey: "Passkey",
            ownPasskeysOnly: "Je kunt alleen je eigen passkeys beheren.",
            preparingManagement: "Passkeybeheer voorbereiden...",
            failedToManage: "Kan passkeybeheer niet starten. Log opnieuw in.",
            reauthenticationRequired: "Log voor uw eigen veiligheid opnieuw in om passkeys te beheren.",
            reauthenticate: "Opnieuw inloggen"
        }
    }
} as const satisfies CustomTranslationsObject;

export { nl };
