import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const cs = {
    passkeyPlugin: {
        loginButton: {
            or: "nebo",
            failedToLogin: "Přihlášení pomocí přístupového klíče se nezdařilo.",
            notAllowed: "Operace s přístupovým klíčem byla zrušena nebo není povolena.",
            loginWithPasskey: "Přihlásit se pomocí přístupového klíče"
        },
        managementClient: {
            failedToLoad: "Přístupové klíče se nepodařilo načíst.",
            failedToRegister: "Přístupový klíč se nepodařilo zaregistrovat.",
            successfullyRegistered: "Přístupový klíč byl úspěšně zaregistrován.",
            notAllowed: "Registrace přístupového klíče byla zrušena nebo není povolena.",
            alreadyRegistered: "Tento přístupový klíč je již zaregistrován.",
            confirmDelete: {
                heading: "Odstranit tento přístupový klíč?",
                body: "Chystáte se odstranit přístupový klíč „{{name}}“. Tuto akci nelze vrátit zpět."
            },
            failedToDelete: "Přístupový klíč se nepodařilo odstranit.",
            successfullyDeleted: "Přístupový klíč byl úspěšně odstraněn.",
            addPasskey: "Přidat přístupový klíč",
            passkeyName: "Název (volitelné)",
            register: "Registrovat",
            registering: "Registrace...",
            cancel: "Zrušit",
            unknownAuthenticator: "Neznámý autentizátor",
            createdAt: "Vytvořeno: ",
            delete: "Odstranit",
            deleting: "Odstraňování...",
            notFound: "Nebyly nalezeny žádné registrované přístupové klíče."
        },
        managementField: {
            passkey: "Přístupový klíč",
            ownPasskeysOnly: "Spravovat můžete pouze vlastní přístupové klíče.",
            preparingManagement: "Připravuje se správa přístupových klíčů...",
            failedToManage: "Správu přístupových klíčů se nepodařilo spustit. Přihlaste se znovu.",
            reauthenticationRequired: "Chcete-li spravovat přístupové klíče, přihlaste se znovu.",
            reauthenticate: "Znovu se přihlásit"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Odhlášení se nezdařilo: {{message}}",
            failedToLogout: "Odhlášení se nezdařilo.",
            logout: "Odhlásit se"
        }
    }
} as const satisfies CustomTranslationsObject;

export { cs };
