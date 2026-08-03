import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const sk = {
    passkeyPlugin: {
        loginButton: {
            or: "Alebo",
            failedToLogin: "Prihlásenie pomocou prístupového kľúča zlyhalo.",
            notAllowed: "Operácia s prístupovým kľúčom bola zrušená alebo nie je povolená.",
            loginWithPasskey: "Prihlásiť sa pomocou prístupového kľúča"
        },
        managementClient: {
            failedToLoad: "Prístupové kľúče sa nepodarilo načítať.",
            failedToRegister: "Prístupový kľúč sa nepodarilo zaregistrovať.",
            successfullyRegistered: "Prístupový kľúč bol úspešne zaregistrovaný.",
            notAllowed: "Operácia s prístupovým kľúčom bola zrušená alebo nie je povolená.",
            alreadyRegistered: "Tento prístupový kľúč je už zaregistrovaný.",
            confirmDelete: {
                heading: "Potvrdiť odstránenie",
                body: "Chystáte sa odstrániť prístupový kľúč {{name}}. Ste si istí?"
            },
            failedToDelete: "Prístupový kľúč sa nepodarilo odstrániť.",
            successfullyDeleted: "Prístupový kľúč bol úspešne odstránený.",
            addPasskey: "Pridať prístupový kľúč",
            passkeyName: "Meno (voliteľné)",
            register: "Registrovať",
            registering: "Registruje sa...",
            cancel: "Zrušiť",
            unknownAuthenticator: "Neznámy autentifikátor",
            createdAt: "Vytvorené v:",
            delete: "Odstrániť",
            deleting: "Odstraňovanie...",
            notFound: "Nenašli sa žiadne zaregistrované prístupové kľúče."
        },
        managementField: {
            passkey: "Prístupový kľúč",
            ownPasskeysOnly: "Spravovať môžete iba vlastné prístupové kľúče.",
            preparingManagement: "Pripravuje sa správa prístupových kľúčov...",
            failedToManage: "Správu prístupových kľúčov sa nepodarilo spustiť. Znovu sa prihláste.",
            reauthenticationRequired:
                "Z bezpečnostných dôvodov sa znovu prihláste, aby ste mohli spravovať prístupové kľúče.",
            reauthenticate: "Znovu sa prihlásiť"
        }
    }
} as const satisfies CustomTranslationsObject;

export { sk };
