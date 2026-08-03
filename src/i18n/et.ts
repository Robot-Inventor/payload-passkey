import type { CustomTranslationsObject } from "./customTranslations";

const et = {
    passkeyPlugin: {
        loginButton: {
            or: "Või",
            failedToLogin: "Sisselogimine pääsuvõtmega nurjus.",
            notAllowed: "Pääsuvõtme toiming tühistati või pole lubatud.",
            loginWithPasskey: "Logi sisse pääsuvõtmega"
        },
        managementClient: {
            failedToLoad: "Pääsuvõtmeid ei saanud laadida.",
            failedToRegister: "Pääsuvõtit ei saanud registreerida.",
            successfullyRegistered: "Pääsuvõti registreeriti edukalt.",
            notAllowed: "Pääsuvõtme toiming tühistati või pole lubatud.",
            alreadyRegistered: "See pääsuvõti on juba registreeritud.",
            confirmDelete: {
                heading: "Kinnita kustutamine",
                body: "Olete kustutamas pääsuvõti {{name}}. Olete kindel?"
            },
            failedToDelete: "Pääsuvõtit ei saanud kustutada.",
            successfullyDeleted: "Pääsuvõti kustutati edukalt.",
            addPasskey: "Lisa pääsuvõti",
            passkeyName: "Nimi (valikuline)",
            register: "Registreeri",
            registering: "Registreerimine...",
            cancel: "Tühista",
            unknownAuthenticator: "Tundmatu autentija",
            createdAt: "Loomisaeg:",
            delete: "Kustuta",
            deleting: "Kustutamine...",
            notFound: "Registreeritud pääsuvõtmeid ei leitud."
        },
        managementField: {
            passkey: "Pääsuvõti",
            ownPasskeysOnly: "Saad hallata ainult enda pääsuvõtmeid.",
            preparingManagement: "Pääsuvõtmete haldust valmistatakse ette...",
            failedToManage: "Pääsuvõtmete haldust ei saanud käivitada. Logi uuesti sisse.",
            reauthenticationRequired: "Teie turvalisuse huvides logige pääsuvõtmete haldamiseks uuesti sisse.",
            reauthenticate: "Logi uuesti sisse"
        }
    }
} as const satisfies CustomTranslationsObject;

export { et };
