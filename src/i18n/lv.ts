import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const lv = {
    passkeyPlugin: {
        loginButton: {
            or: "vai",
            failedToLogin: "Neizdevās pierakstīties, izmantojot piekļuves atslēgu.",
            notAllowed: "Piekļuves atslēgas darbība tika atcelta vai nav atļauta.",
            loginWithPasskey: "Pierakstīties, izmantojot piekļuves atslēgu"
        },
        managementClient: {
            failedToLoad: "Neizdevās ielādēt piekļuves atslēgas.",
            failedToRegister: "Neizdevās reģistrēt piekļuves atslēgu.",
            successfullyRegistered: "Piekļuves atslēga ir veiksmīgi reģistrēta.",
            notAllowed: "Piekļuves atslēgas reģistrācija tika atcelta vai nav atļauta.",
            alreadyRegistered: "Šī piekļuves atslēga jau ir reģistrēta.",
            confirmDelete: {
                heading: "Vai dzēst šo piekļuves atslēgu?",
                body: "Jūs gatavojaties dzēst piekļuves atslēgu „{{name}}“. Šo darbību nevar atsaukt."
            },
            failedToDelete: "Neizdevās dzēst piekļuves atslēgu.",
            successfullyDeleted: "Piekļuves atslēga ir veiksmīgi dzēsta.",
            addPasskey: "Pievienot piekļuves atslēgu",
            passkeyName: "Nosaukums (neobligāti)",
            register: "Reģistrēt",
            registering: "Reģistrē...",
            cancel: "Atcelt",
            unknownAuthenticator: "Nezināms autentifikators",
            createdAt: "Izveidots: ",
            delete: "Dzēst",
            deleting: "Dzēš...",
            notFound: "Reģistrētas piekļuves atslēgas nav atrastas."
        },
        managementField: {
            passkey: "Piekļuves atslēga",
            ownPasskeysOnly: "Varat pārvaldīt tikai savas piekļuves atslēgas.",
            preparingManagement: "Notiek piekļuves atslēgu pārvaldības sagatavošana...",
            failedToManage: "Neizdevās sākt piekļuves atslēgu pārvaldību. Pierakstieties vēlreiz."
        }
    }
} as const satisfies CustomTranslationsObject;

export { lv };
