import type { CustomTranslationsObject } from "./customTranslations";

const lv = {
    passkeyPlugin: {
        loginButton: {
            or: "Vai",
            failedToLogin: "Neizdevās pieslēgties, izmantojot piekļuves atslēgu.",
            notAllowed: "Piekļuves atslēgas darbība tika atcelta vai nav atļauta.",
            loginWithPasskey: "Pieslēgties, izmantojot piekļuves atslēgu"
        },
        managementClient: {
            failedToLoad: "Neizdevās ielādēt piekļuves atslēgas.",
            failedToRegister: "Neizdevās reģistrēt piekļuves atslēgu.",
            successfullyRegistered: "Piekļuves atslēga ir veiksmīgi reģistrēta.",
            notAllowed: "Piekļuves atslēgas darbība tika atcelta vai nav atļauta.",
            alreadyRegistered: "Šī piekļuves atslēga jau ir reģistrēta.",
            confirmDelete: {
                heading: "Apstiprināt dzēšanu",
                body: "Jūs grasāties dzēst Piekļuves atslēga {{name}}. Vai esat pārliecināts?"
            },
            failedToDelete: "Neizdevās dzēst piekļuves atslēgu.",
            successfullyDeleted: "Piekļuves atslēga ir veiksmīgi dzēsta.",
            addPasskey: "Pievienot Piekļuves atslēga",
            passkeyName: "Vārds (neobligāti)",
            register: "Reģistrēt",
            registering: "Reģistrē...",
            cancel: "Atcelt",
            unknownAuthenticator: "Nezināms autentifikators",
            createdAt: "Izveidots:",
            delete: "Dzēst",
            deleting: "Dzēš...",
            notFound: "Reģistrētas piekļuves atslēgas nav atrastas."
        },
        managementField: {
            passkey: "Piekļuves atslēga",
            ownPasskeysOnly: "Varat pārvaldīt tikai savas piekļuves atslēgas.",
            preparingManagement: "Notiek piekļuves atslēgu pārvaldības sagatavošana...",
            failedToManage: "Neizdevās sākt piekļuves atslēgu pārvaldību. Pieslēdzieties atkārtoti.",
            reauthenticationRequired: "Drošības nolūkos, lai pārvaldītu piekļuves atslēgas, pieslēdzieties atkārtoti.",
            reauthenticate: "Pieslēgties atkārtoti"
        }
    }
} as const satisfies CustomTranslationsObject;

export { lv };
