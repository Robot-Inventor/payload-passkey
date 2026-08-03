import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const hr = {
    passkeyPlugin: {
        loginButton: {
            or: "ili",
            failedToLogin: "Prijava pomoću pristupnog ključa nije uspjela.",
            notAllowed: "Operacija pristupnog ključa otkazana je ili nije dopuštena.",
            loginWithPasskey: "Prijava pomoću pristupnog ključa"
        },
        managementClient: {
            failedToLoad: "Učitavanje pristupnih ključeva nije uspjelo.",
            failedToRegister: "Registracija pristupnog ključa nije uspjela.",
            successfullyRegistered: "Pristupni ključ uspješno je registriran.",
            notAllowed: "Registracija pristupnog ključa otkazana je ili nije dopuštena.",
            alreadyRegistered: "Ovaj je pristupni ključ već registriran.",
            confirmDelete: {
                heading: "Izbrisati ovaj pristupni ključ?",
                body: "Spremate se izbrisati pristupni ključ „{{name}}“. Ovu radnju nije moguće poništiti."
            },
            failedToDelete: "Brisanje pristupnog ključa nije uspjelo.",
            successfullyDeleted: "Pristupni ključ uspješno je izbrisan.",
            addPasskey: "Dodaj pristupni ključ",
            passkeyName: "Naziv (neobavezno)",
            register: "Registriraj",
            registering: "Registriranje...",
            cancel: "Odustani",
            unknownAuthenticator: "Nepoznati autentifikator",
            createdAt: "Stvoreno: ",
            delete: "Izbriši",
            deleting: "Brisanje...",
            notFound: "Registrirani pristupni ključevi nisu pronađeni."
        },
        managementField: {
            passkey: "Pristupni ključ",
            ownPasskeysOnly: "Možete upravljati samo vlastitim pristupnim ključevima.",
            preparingManagement: "Priprema se upravljanje pristupnim ključevima...",
            failedToManage: "Upravljanje pristupnim ključevima nije moguće pokrenuti. Ponovno se prijavite.",
            reauthenticationRequired: "Ponovno se prijavite za upravljanje pristupnim ključevima.",
            reauthenticate: "Ponovno se prijavite"
        }
    }
} as const satisfies CustomTranslationsObject;

export { hr };
