import type { CustomTranslationsObject } from "./customTranslations";

const lt = {
    passkeyPlugin: {
        loginButton: {
            or: "Arba",
            failedToLogin: "Nepavyko prisijungti naudojant prieigos raktą.",
            notAllowed: "Prieigos rakto operacija atšaukta arba neleidžiama.",
            loginWithPasskey: "Prisijungti naudojant prieigos raktą"
        },
        managementClient: {
            failedToLoad: "Nepavyko įkelti prieigos raktų.",
            failedToRegister: "Nepavyko užregistruoti prieigos rakto.",
            successfullyRegistered: "Prieigos raktas sėkmingai užregistruotas.",
            notAllowed: "Prieigos rakto operacija atšaukta arba neleidžiama.",
            alreadyRegistered: "Šis prieigos raktas jau užregistruotas.",
            confirmDelete: {
                heading: "Patvirtinkite šalinimą",
                body: "Jūs ketinate ištrinti Prieigos raktas {{name}}. Ar esate tikri?"
            },
            failedToDelete: "Nepavyko pašalinti prieigos rakto.",
            successfullyDeleted: "Prieigos raktas sėkmingai pašalintas.",
            addPasskey: "Pridėkite Prieigos raktas",
            passkeyName: "Vardas (pasirinktinai)",
            register: "Registruoti",
            registering: "Registruojama...",
            cancel: "Atšaukti",
            unknownAuthenticator: "Nežinomas autentifikatorius",
            createdAt: "Sukurta:",
            delete: "Ištrinti",
            deleting: "Trinama...",
            notFound: "Registruotų prieigos raktų nerasta."
        },
        managementField: {
            passkey: "Prieigos raktas",
            ownPasskeysOnly: "Galite tvarkyti tik savo prieigos raktus.",
            preparingManagement: "Ruošiamas prieigos raktų tvarkymas...",
            failedToManage: "Nepavyko pradėti tvarkyti prieigos raktų. Prisijunkite vėl.",
            reauthenticationRequired: "Dėl jūsų pačių saugumo, norėdami tvarkyti prieigos raktus, prisijunkite vėl.",
            reauthenticate: "Prisijunkite vėl"
        }
    }
} as const satisfies CustomTranslationsObject;

export { lt };
