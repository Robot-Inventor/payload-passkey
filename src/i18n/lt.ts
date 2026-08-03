import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const lt = {
    passkeyPlugin: {
        loginButton: {
            or: "arba",
            failedToLogin: "Nepavyko prisijungti naudojant prieigos raktą.",
            notAllowed: "Prieigos rakto operacija atšaukta arba neleidžiama.",
            loginWithPasskey: "Prisijungti naudojant prieigos raktą"
        },
        managementClient: {
            failedToLoad: "Nepavyko įkelti prieigos raktų.",
            failedToRegister: "Nepavyko užregistruoti prieigos rakto.",
            successfullyRegistered: "Prieigos raktas sėkmingai užregistruotas.",
            notAllowed: "Prieigos rakto registracija atšaukta arba neleidžiama.",
            alreadyRegistered: "Šis prieigos raktas jau užregistruotas.",
            confirmDelete: {
                heading: "Pašalinti šį prieigos raktą?",
                body: "Ketinate pašalinti prieigos raktą „{{name}}“. Šio veiksmo anuliuoti negalima."
            },
            failedToDelete: "Nepavyko pašalinti prieigos rakto.",
            successfullyDeleted: "Prieigos raktas sėkmingai pašalintas.",
            addPasskey: "Įtraukti prieigos raktą",
            passkeyName: "Pavadinimas (pasirinktinai)",
            register: "Registruoti",
            registering: "Registruojama...",
            cancel: "Atšaukti",
            unknownAuthenticator: "Nežinomas autentifikatorius",
            createdAt: "Sukurta: ",
            delete: "Šalinti",
            deleting: "Šalinama...",
            notFound: "Registruotų prieigos raktų nerasta."
        },
        managementField: {
            passkey: "Prieigos raktas",
            ownPasskeysOnly: "Galite tvarkyti tik savo prieigos raktus.",
            preparingManagement: "Ruošiamas prieigos raktų tvarkymas...",
            failedToManage: "Nepavyko pradėti tvarkyti prieigos raktų. Prisijunkite dar kartą."
        },
        logoutButton: {
            failedToLogoutWithMessage: "Nepavyko atsijungti: {{message}}",
            failedToLogout: "Nepavyko atsijungti.",
            logout: "Atsijungti"
        }
    }
} as const satisfies CustomTranslationsObject;

export { lt };
