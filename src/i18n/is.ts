import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const is = {
    passkeyPlugin: {
        loginButton: {
            or: "Eða",
            failedToLogin: "Ekki tókst að skrá inn með aðgangslykli.",
            notAllowed: "Aðgerð aðgangslykils var hætt við eða er ekki leyfð.",
            loginWithPasskey: "Skrá inn með aðgangslykli"
        },
        managementClient: {
            failedToLoad: "Ekki tókst að hlaða aðgangslyklum.",
            failedToRegister: "Ekki tókst að skrá aðgangslykil.",
            successfullyRegistered: "Aðgangslykill var skráður.",
            notAllowed: "Aðgerð aðgangslykils var hætt við eða er ekki leyfð.",
            alreadyRegistered: "Þessi aðgangslykill er þegar skráður.",
            confirmDelete: {
                heading: "Staðfesta eyðingu",
                body: "Þú ert að fara að eyða Aðgangslykill {{name}}. Ertu viss?"
            },
            failedToDelete: "Ekki tókst að eyða aðgangslykli.",
            successfullyDeleted: "Aðgangslykill var eytt.",
            addPasskey: "Bæta við Aðgangslykill",
            passkeyName: "Nafn (valfrjálst)",
            register: "Skrá",
            registering: "Skrái...",
            cancel: "Hætta við",
            unknownAuthenticator: "Óþekkt auðkenningartæki",
            createdAt: "Nýskráð:",
            delete: "Eyða",
            deleting: "Eyði...",
            notFound: "Engir skráðir aðgangslyklar fundust."
        },
        managementField: {
            passkey: "Aðgangslykill",
            ownPasskeysOnly: "Þú getur aðeins stjórnað þínum eigin aðgangslyklum.",
            preparingManagement: "Undirbý stjórnun aðgangslykla...",
            failedToManage: "Ekki tókst að hefja stjórnun aðgangslykla. Skráðu þig inn aftur.",
            reauthenticationRequired: "Til öryggis skaltu skrá þig inn aftur til að stjórna aðgangslykklum.",
            reauthenticate: "Innskrá aftur"
        }
    }
} as const satisfies CustomTranslationsObject;

export { is };
