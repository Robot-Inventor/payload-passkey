import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const is = {
    passkeyPlugin: {
        loginButton: {
            or: "eða",
            failedToLogin: "Ekki tókst að skrá inn með aðgangslykli.",
            notAllowed: "Aðgerð aðgangslykils var hætt við eða er ekki leyfð.",
            loginWithPasskey: "Skrá inn með aðgangslykli"
        },
        managementClient: {
            failedToLoad: "Ekki tókst að hlaða aðgangslyklum.",
            failedToRegister: "Ekki tókst að skrá aðgangslykil.",
            successfullyRegistered: "Aðgangslykill var skráður.",
            notAllowed: "Skráningu aðgangslykils var hætt við eða hún er ekki leyfð.",
            alreadyRegistered: "Þessi aðgangslykill er þegar skráður.",
            confirmDelete: {
                heading: "Eyða þessum aðgangslykli?",
                body: "Þú ert að fara að eyða aðgangslyklinum „{{name}}“. Ekki er hægt að afturkalla þessa aðgerð."
            },
            failedToDelete: "Ekki tókst að eyða aðgangslykli.",
            successfullyDeleted: "Aðgangslykill var eytt.",
            addPasskey: "Bæta við aðgangslykli",
            passkeyName: "Heiti (valfrjálst)",
            register: "Skrá",
            registering: "Skrái...",
            cancel: "Hætta við",
            unknownAuthenticator: "Óþekkt auðkenningartæki",
            createdAt: "Stofnað: ",
            delete: "Eyða",
            deleting: "Eyði...",
            notFound: "Engir skráðir aðgangslyklar fundust."
        },
        managementField: {
            passkey: "Aðgangslykill",
            ownPasskeysOnly: "Þú getur aðeins stjórnað þínum eigin aðgangslyklum.",
            preparingManagement: "Undirbý stjórnun aðgangslykla...",
            failedToManage: "Ekki tókst að hefja stjórnun aðgangslykla. Skráðu þig inn aftur.",
            reauthenticationRequired: "Skráðu þig inn aftur til að stjórna aðgangslykklum.",
            reauthenticate: "Innskrá aftur"
        }
    }
} as const satisfies CustomTranslationsObject;

export { is };
