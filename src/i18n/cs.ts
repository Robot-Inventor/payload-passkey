import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const cs = {
    passkeyPlugin: {
        loginButton: {
            or: "Nebo",
            failedToLogin: "Přihlášení pomocí přístupového klíče se nezdařilo.",
            notAllowed: "Operace s přístupovým klíčem byla zrušena nebo není povolena.",
            loginWithPasskey: "Přihlásit se pomocí přístupového klíče"
        },
        managementClient: {
            failedToLoad: "Přístupové klíče se nepodařilo načíst.",
            failedToRegister: "Přístupový klíč se nepodařilo zaregistrovat.",
            successfullyRegistered: "Přístupový klíč byl úspěšně zaregistrován.",
            notAllowed: "Operace s přístupovým klíčem byla zrušena nebo není povolena.",
            alreadyRegistered: "Tento přístupový klíč je již zaregistrován.",
            confirmDelete: {
                heading: "Potvrdit odstranění",
                body: "Chystáte se odstranit přístupový klíč {{name}}. Jste si jisti?"
            },
            failedToDelete: "Přístupový klíč se nepodařilo odstranit.",
            successfullyDeleted: "Přístupový klíč byl úspěšně odstraněn.",
            addPasskey: "Přidat přístupový klíč",
            passkeyName: "Jméno (volitelné)",
            register: "Registrovat",
            registering: "Registrace...",
            cancel: "Zrušit",
            unknownAuthenticator: "Neznámý autentizátor",
            createdAt: "Vytvořeno v:",
            delete: "Odstranit",
            deleting: "Odstraňování...",
            notFound: "Nebyly nalezeny žádné registrované přístupové klíče."
        },
        managementField: {
            passkey: "Přístupový klíč",
            ownPasskeysOnly: "Spravovat můžete pouze vlastní přístupové klíče.",
            preparingManagement: "Připravuje se správa přístupových klíčů...",
            failedToManage: "Správu přístupových klíčů se nepodařilo spustit. Přihlaste se znovu.",
            reauthenticationRequired: "Z bezpečnostních důvodů se znovu přihlaste, abyste mohli spravovat přístupové klíče.",
            reauthenticate: "Znovu se přihlásit"
        }
    }
} as const satisfies CustomTranslationsObject;

export { cs };
