import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const rsLatin = {
    passkeyPlugin: {
        loginButton: {
            or: "ili",
            failedToLogin: "Prijavljivanje pomoću ključa za pristup nije uspelo.",
            notAllowed: "Operacija ključa za pristup je otkazana ili nije dozvoljena.",
            loginWithPasskey: "Prijavite se pomoću ključa za pristup"
        },
        managementClient: {
            failedToLoad: "Učitavanje ključeva za pristup nije uspelo.",
            failedToRegister: "Registrovanje ključa za pristup nije uspelo.",
            successfullyRegistered: "Ključ za pristup je uspešno registrovan.",
            notAllowed: "Registrovanje ključa za pristup je otkazano ili nije dozvoljeno.",
            alreadyRegistered: "Ovaj ključ za pristup je već registrovan.",
            confirmDelete: {
                heading: "Izbrisati ovaj ključ za pristup?",
                body: "Spremate se da izbrišete ključ za pristup „{{name}}“. Ova radnja se ne može opozvati."
            },
            failedToDelete: "Brisanje ključa za pristup nije uspelo.",
            successfullyDeleted: "Ključ za pristup je uspešno izbrisan.",
            addPasskey: "Dodajte ključ za pristup",
            passkeyName: "Ime (opcionalno)",
            register: "Registrujte",
            registering: "Registrovanje...",
            cancel: "Otkaži",
            unknownAuthenticator: "Nepoznati autentifikator",
            createdAt: "Kreirano: ",
            delete: "Izbriši",
            deleting: "Brisanje...",
            notFound: "Nisu pronađeni registrovani ključevi za pristup."
        },
        managementField: {
            passkey: "Ključ za pristup",
            ownPasskeysOnly: "Možete da upravljate samo sopstvenim ključevima za pristup.",
            preparingManagement: "Priprema se upravljanje ključevima za pristup...",
            failedToManage: "Upravljanje ključevima za pristup nije moguće pokrenuti. Prijavite se ponovo.",
            reauthenticationRequired: "Prijavite se ponovo da biste upravljali ključevima za pristup.",
            reauthenticate: "Ponovna prijava"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Odjavljivanje nije uspelo: {{message}}",
            failedToLogout: "Odjavljivanje nije uspelo.",
            logout: "Odjavite se"
        }
    }
} as const satisfies CustomTranslationsObject;

export { rsLatin };
