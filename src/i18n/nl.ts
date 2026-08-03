import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const nl = {
    passkeyPlugin: {
        loginButton: {
            or: "of",
            failedToLogin: "Aanmelden met een passkey is mislukt.",
            notAllowed: "De passkey-bewerking is geannuleerd of niet toegestaan.",
            loginWithPasskey: "Aanmelden met een passkey"
        },
        managementClient: {
            failedToLoad: "Kan passkeys niet laden.",
            failedToRegister: "Kan de passkey niet registreren.",
            successfullyRegistered: "Passkey is geregistreerd.",
            notAllowed: "Het registreren van de passkey is geannuleerd of niet toegestaan.",
            alreadyRegistered: "Deze passkey is al geregistreerd.",
            confirmDelete: {
                heading: "Deze passkey verwijderen?",
                body: "Je staat op het punt passkey ‘{{name}}’ te verwijderen. Deze actie kan niet ongedaan worden gemaakt."
            },
            failedToDelete: "Kan de passkey niet verwijderen.",
            successfullyDeleted: "Passkey is verwijderd.",
            addPasskey: "Een passkey toevoegen",
            passkeyName: "Naam (optioneel)",
            register: "Registreren",
            registering: "Registreren...",
            cancel: "Annuleren",
            unknownAuthenticator: "Onbekende verificator",
            createdAt: "Gemaakt: ",
            delete: "Verwijderen",
            deleting: "Verwijderen...",
            notFound: "Geen geregistreerde passkeys gevonden."
        },
        managementField: {
            passkey: "Passkey",
            ownPasskeysOnly: "Je kunt alleen je eigen passkeys beheren.",
            preparingManagement: "Passkeybeheer voorbereiden...",
            failedToManage: "Kan passkeybeheer niet starten. Meld je opnieuw aan."
        }
    }
} as const satisfies CustomTranslationsObject;

export { nl };
