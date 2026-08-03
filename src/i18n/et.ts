import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const et = {
    passkeyPlugin: {
        loginButton: {
            or: "või",
            failedToLogin: "Sisselogimine pääsuvõtmega nurjus.",
            notAllowed: "Pääsuvõtme toiming tühistati või pole lubatud.",
            loginWithPasskey: "Logi sisse pääsuvõtmega"
        },
        managementClient: {
            failedToLoad: "Pääsuvõtmeid ei saanud laadida.",
            failedToRegister: "Pääsuvõtit ei saanud registreerida.",
            successfullyRegistered: "Pääsuvõti registreeriti edukalt.",
            notAllowed: "Pääsuvõtme registreerimine tühistati või pole lubatud.",
            alreadyRegistered: "See pääsuvõti on juba registreeritud.",
            confirmDelete: {
                heading: "Kas kustutada see pääsuvõti?",
                body: "Oled kustutamas pääsuvõtit „{{name}}“. Seda toimingut ei saa tagasi võtta."
            },
            failedToDelete: "Pääsuvõtit ei saanud kustutada.",
            successfullyDeleted: "Pääsuvõti kustutati edukalt.",
            addPasskey: "Lisa pääsuvõti",
            passkeyName: "Nimi (valikuline)",
            register: "Registreeri",
            registering: "Registreerimine...",
            cancel: "Loobu",
            unknownAuthenticator: "Tundmatu autentija",
            createdAt: "Loodud: ",
            delete: "Kustuta",
            deleting: "Kustutamine...",
            notFound: "Registreeritud pääsuvõtmeid ei leitud."
        },
        managementField: {
            passkey: "Pääsuvõti",
            ownPasskeysOnly: "Saad hallata ainult enda pääsuvõtmeid.",
            preparingManagement: "Pääsuvõtmete haldust valmistatakse ette...",
            failedToManage: "Pääsuvõtmete haldust ei saanud käivitada. Logi uuesti sisse.",
            reauthenticationRequired: "Logige pääsuvõtmete haldamiseks uuesti sisse.",
            reauthenticate: "Logi uuesti sisse"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Väljalogimine nurjus: {{message}}",
            failedToLogout: "Väljalogimine nurjus.",
            logout: "Logi välja"
        }
    }
} as const satisfies CustomTranslationsObject;

export { et };
