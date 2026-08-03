import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const sv = {
    passkeyPlugin: {
        loginButton: {
            or: "eller",
            failedToLogin: "Det gick inte att logga in med en åtkomstnyckel.",
            notAllowed: "Åtkomstnyckelåtgärden avbröts eller tillåts inte.",
            loginWithPasskey: "Logga in med en åtkomstnyckel"
        },
        managementClient: {
            failedToLoad: "Det gick inte att läsa in åtkomstnycklar.",
            failedToRegister: "Det gick inte att registrera åtkomstnyckeln.",
            successfullyRegistered: "Åtkomstnyckeln har registrerats.",
            notAllowed: "Registreringen av åtkomstnyckeln avbröts eller tillåts inte.",
            alreadyRegistered: "Den här åtkomstnyckeln är redan registrerad.",
            confirmDelete: {
                heading: "Vill du ta bort den här åtkomstnyckeln?",
                body: "Du håller på att ta bort åtkomstnyckeln ”{{name}}”. Den här åtgärden kan inte ångras."
            },
            failedToDelete: "Det gick inte att ta bort åtkomstnyckeln.",
            successfullyDeleted: "Åtkomstnyckeln har tagits bort.",
            addPasskey: "Lägg till en åtkomstnyckel",
            passkeyName: "Namn (valfritt)",
            register: "Registrera",
            registering: "Registrerar...",
            cancel: "Avbryt",
            unknownAuthenticator: "Okänd autentiserare",
            createdAt: "Skapad: ",
            delete: "Ta bort",
            deleting: "Tar bort...",
            notFound: "Inga registrerade åtkomstnycklar hittades."
        },
        managementField: {
            passkey: "Åtkomstnyckel",
            ownPasskeysOnly: "Du kan bara hantera dina egna åtkomstnycklar.",
            preparingManagement: "Förbereder hantering av åtkomstnycklar...",
            failedToManage: "Det gick inte att starta hanteringen av åtkomstnycklar. Logga in igen."
        },
        logoutButton: {
            failedToLogoutWithMessage: "Det gick inte att logga ut: {{message}}",
            failedToLogout: "Det gick inte att logga ut.",
            logout: "Logga ut"
        }
    }
} as const satisfies CustomTranslationsObject;

export { sv };
