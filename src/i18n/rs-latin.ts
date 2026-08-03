import type { CustomTranslationsObject } from "./customTranslations";

const rsLatin = {
    passkeyPlugin: {
        loginButton: {
            or: "Ili",
            failedToLogin: "Prijava pomoću ključa za pristup nije uspela.",
            notAllowed: "Operacija ključa za pristup je otkazana ili nije dozvoljena.",
            loginWithPasskey: "Prijava pomoću ključa za pristup"
        },
        managementClient: {
            failedToLoad: "Učitavanje ključeva za pristup nije uspelo.",
            failedToRegister: "Registrovanje ključa za pristup nije uspelo.",
            successfullyRegistered: "Ključ za pristup je uspešno registrovan.",
            notAllowed: "Operacija ključa za pristup je otkazana ili nije dozvoljena.",
            alreadyRegistered: "Ovaj ključ za pristup je već registrovan.",
            confirmDelete: {
                heading: "Potvrdi brisanje",
                body: "Izbrisaćete ključ za pristup {{name}}. Da li ste sigurni?"
            },
            failedToDelete: "Brisanje ključa za pristup nije uspelo.",
            successfullyDeleted: "Ključ za pristup je uspešno izbrisan.",
            addPasskey: "Dodaj ključ za pristup",
            passkeyName: "Ime (opcionalno)",
            register: "Registrujte",
            registering: "Registrovanje...",
            cancel: "Otkaži",
            unknownAuthenticator: "Nepoznati autentifikator",
            createdAt: "Kreirano u:",
            delete: "Obriši",
            deleting: "Brisanje...",
            notFound: "Nisu pronađeni registrovani ključevi za pristup."
        },
        managementField: {
            passkey: "Ključ za pristup",
            ownPasskeysOnly: "Možete da upravljate samo sopstvenim ključevima za pristup.",
            preparingManagement: "Priprema se upravljanje ključevima za pristup...",
            failedToManage: "Upravljanje ključevima za pristup nije moguće pokrenuti. Prijavite se ponovo.",
            reauthenticationRequired: "Zbog sigurnosti, prijavite se ponovo da biste upravljali ključevima za pristup.",
            reauthenticate: "Ponovna prijava"
        }
    }
} as const satisfies CustomTranslationsObject;

export { rsLatin };
