import type { CustomTranslationsObject } from "./customTranslations";

const sv = {
    passkeyPlugin: {
        loginButton: {
            or: "Eller",
            failedToLogin: "Det gick inte att logga in med en åtkomstnyckel.",
            notAllowed: "Åtkomstnyckelåtgärden avbröts eller tillåts inte.",
            loginWithPasskey: "Logga in med en åtkomstnyckel"
        },
        managementClient: {
            failedToLoad: "Det gick inte att läsa in åtkomstnycklar.",
            failedToRegister: "Det gick inte att registrera åtkomstnyckeln.",
            successfullyRegistered: "Åtkomstnyckeln har registrerats.",
            notAllowed: "Åtkomstnyckelåtgärden avbröts eller tillåts inte.",
            alreadyRegistered: "Den här åtkomstnyckeln är redan registrerad.",
            confirmDelete: {
                heading: "Bekräfta radering",
                body: "Du är på väg att ta bort åtkomstnyckel {{name}}. Är du säker?"
            },
            failedToDelete: "Det gick inte att ta bort åtkomstnyckeln.",
            successfullyDeleted: "Åtkomstnyckeln har tagits bort.",
            addPasskey: "Lägg till åtkomstnyckel",
            passkeyName: "Namn (valfritt)",
            register: "Registrera",
            registering: "Registrerar...",
            cancel: "Avbryt",
            unknownAuthenticator: "Okänd autentiserare",
            createdAt: "Skapat:",
            delete: "Ta bort",
            deleting: "Tar bort...",
            notFound: "Inga registrerade åtkomstnycklar hittades."
        },
        managementField: {
            passkey: "Åtkomstnyckel",
            ownPasskeysOnly: "Du kan bara hantera dina egna åtkomstnycklar.",
            preparingManagement: "Förbereder hantering av åtkomstnycklar...",
            failedToManage: "Det gick inte att starta hanteringen av åtkomstnycklar. Logga in igen.",
            reauthenticationRequired: "För din egen säkerhet, logga in igen för att hantera åtkomstnycklar.",
            reauthenticate: "Logga in igen"
        }
    }
} as const satisfies CustomTranslationsObject;

export { sv };
