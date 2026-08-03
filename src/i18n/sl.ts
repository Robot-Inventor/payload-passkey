import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const sl = {
    passkeyPlugin: {
        loginButton: {
            or: "ali",
            failedToLogin: "Prijava s ključem za dostop ni uspela.",
            notAllowed: "Postopek s ključem za dostop je bil preklican ali ni dovoljen.",
            loginWithPasskey: "Prijava s ključem za dostop"
        },
        managementClient: {
            failedToLoad: "Nalaganje ključev za dostop ni uspelo.",
            failedToRegister: "Registracija ključa za dostop ni uspela.",
            successfullyRegistered: "Ključ za dostop je bil uspešno registriran.",
            notAllowed: "Registracija ključa za dostop je bila preklicana ali ni dovoljena.",
            alreadyRegistered: "Ta ključ za dostop je že registriran.",
            confirmDelete: {
                heading: "Želite izbrisati ta ključ za dostop?",
                body: "Izbrisali boste ključ za dostop »{{name}}«. Tega dejanja ni mogoče razveljaviti."
            },
            failedToDelete: "Brisanje ključa za dostop ni uspelo.",
            successfullyDeleted: "Ključ za dostop je bil uspešno izbrisan.",
            addPasskey: "Dodaj ključ za dostop",
            passkeyName: "Ime (izbirno)",
            register: "Registriraj",
            registering: "Registriranje...",
            cancel: "Prekliči",
            unknownAuthenticator: "Neznani preverjevalnik pristnosti",
            createdAt: "Ustvarjeno: ",
            delete: "Izbriši",
            deleting: "Brisanje...",
            notFound: "Registrirani ključi za dostop niso bili najdeni."
        },
        managementField: {
            passkey: "Ključ za dostop",
            ownPasskeysOnly: "Upravljate lahko samo svoje ključe za dostop.",
            preparingManagement: "Priprava upravljanja ključev za dostop...",
            failedToManage: "Upravljanja ključev za dostop ni bilo mogoče začeti. Ponovno se prijavite.",
            reauthenticationRequired: "Za upravljanje ključev za dostop se ponovno prijavite.",
            reauthenticate: "Ponovno se prijavi"
        }
    }
} as const satisfies CustomTranslationsObject;

export { sl };
