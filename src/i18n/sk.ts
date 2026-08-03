import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const sk = {
    passkeyPlugin: {
        loginButton: {
            or: "alebo",
            failedToLogin: "Prihlásenie pomocou prístupového kľúča zlyhalo.",
            notAllowed: "Operácia s prístupovým kľúčom bola zrušená alebo nie je povolená.",
            loginWithPasskey: "Prihlásiť sa pomocou prístupového kľúča"
        },
        managementClient: {
            failedToLoad: "Prístupové kľúče sa nepodarilo načítať.",
            failedToRegister: "Prístupový kľúč sa nepodarilo zaregistrovať.",
            successfullyRegistered: "Prístupový kľúč bol úspešne zaregistrovaný.",
            notAllowed: "Registrácia prístupového kľúča bola zrušená alebo nie je povolená.",
            alreadyRegistered: "Tento prístupový kľúč je už zaregistrovaný.",
            confirmDelete: {
                heading: "Odstrániť tento prístupový kľúč?",
                body: "Chystáte sa odstrániť prístupový kľúč „{{name}}“. Túto akciu nemožno vrátiť späť."
            },
            failedToDelete: "Prístupový kľúč sa nepodarilo odstrániť.",
            successfullyDeleted: "Prístupový kľúč bol úspešne odstránený.",
            addPasskey: "Pridať prístupový kľúč",
            passkeyName: "Názov (voliteľné)",
            register: "Registrovať",
            registering: "Registruje sa...",
            cancel: "Zrušiť",
            unknownAuthenticator: "Neznámy autentifikátor",
            createdAt: "Vytvorené: ",
            delete: "Odstrániť",
            deleting: "Odstraňuje sa...",
            notFound: "Nenašli sa žiadne zaregistrované prístupové kľúče."
        },
        managementField: {
            passkey: "Prístupový kľúč",
            ownPasskeysOnly: "Spravovať môžete iba vlastné prístupové kľúče.",
            preparingManagement: "Pripravuje sa správa prístupových kľúčov...",
            failedToManage: "Správu prístupových kľúčov sa nepodarilo spustiť. Znova sa prihláste."
        }
    }
} as const satisfies CustomTranslationsObject;

export { sk };
