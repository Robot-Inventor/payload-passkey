import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const hu = {
    passkeyPlugin: {
        loginButton: {
            or: "Vagy",
            failedToLogin: "Nem sikerült bejelentkezni hozzáférési kulccsal.",
            notAllowed: "A hozzáférési kulcs műveletét megszakították, vagy az nem engedélyezett.",
            loginWithPasskey: "Bejelentkezés hozzáférési kulccsal"
        },
        managementClient: {
            failedToLoad: "Nem sikerült betölteni a hozzáférési kulcsokat.",
            failedToRegister: "Nem sikerült regisztrálni a hozzáférési kulcsot.",
            successfullyRegistered: "A hozzáférési kulcs regisztrálása sikerült.",
            notAllowed: "A hozzáférési kulcs műveletét megszakították, vagy az nem engedélyezett.",
            alreadyRegistered: "Ez a hozzáférési kulcs már regisztrálva van.",
            confirmDelete: {
                heading: "Törlés megerősítése",
                body: "A hozzáférési kulcs {{name}} törlésére készül. Biztos benne?"
            },
            failedToDelete: "Nem sikerült törölni a hozzáférési kulcsot.",
            successfullyDeleted: "A hozzáférési kulcs törlése sikerült.",
            addPasskey: "Hozzáférési kulcs hozzáadása",
            passkeyName: "Név (nem kötelező)",
            register: "Regisztrálás",
            registering: "Regisztrálás...",
            cancel: "Mégsem",
            unknownAuthenticator: "Ismeretlen hitelesítő",
            createdAt: "Létrehozva:",
            delete: "Törlés",
            deleting: "Törlés...",
            notFound: "Nem találhatók regisztrált hozzáférési kulcsok."
        },
        managementField: {
            passkey: "Hozzáférési kulcs",
            ownPasskeysOnly: "Csak a saját hozzáférési kulcsait kezelheti.",
            preparingManagement: "A hozzáférési kulcsok kezelése előkészítés alatt...",
            failedToManage: "Nem sikerült elindítani a hozzáférési kulcsok kezelését. Jelentkezzen be újra.",
            reauthenticationRequired:
                "Saját biztonsága érdekében jelentkezzen be újra a hozzáférési kulcsok kezeléséhez.",
            reauthenticate: "Jelentkezzen be újra"
        }
    }
} as const satisfies CustomTranslationsObject;

export { hu };
