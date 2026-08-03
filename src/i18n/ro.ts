import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const ro = {
    passkeyPlugin: {
        loginButton: {
            or: "Sau",
            failedToLogin: "Autentificarea cu o cheie de acces a eșuat.",
            notAllowed: "Operațiunea cheii de acces a fost anulată sau nu este permisă.",
            loginWithPasskey: "Autentificare cu o cheie de acces"
        },
        managementClient: {
            failedToLoad: "Încărcarea cheilor de acces a eșuat.",
            failedToRegister: "Înregistrarea cheii de acces a eșuat.",
            successfullyRegistered: "Cheia de acces a fost înregistrată cu succes.",
            notAllowed: "Operațiunea cheii de acces a fost anulată sau nu este permisă.",
            alreadyRegistered: "Această cheie de acces este deja înregistrată.",
            confirmDelete: {
                heading: "Confirmați ștergerea",
                body: "Sunteți pe cale să ștergeți Cheie de acces {{name}}. Sunteți sigur?"
            },
            failedToDelete: "Ștergerea cheii de acces a eșuat.",
            successfullyDeleted: "Cheia de acces a fost ștearsă cu succes.",
            addPasskey: "Adăugați cheie de acces",
            passkeyName: "Nume (opțional)",
            register: "Înregistrați",
            registering: "Se înregistrează...",
            cancel: "Anulați",
            unknownAuthenticator: "Autentificator necunoscut",
            createdAt: "Creat la:",
            delete: "Șterge",
            deleting: "Deleting...",
            notFound: "Nu s-au găsit chei de acces înregistrate."
        },
        managementField: {
            passkey: "Cheie de acces",
            ownPasskeysOnly: "Puteți gestiona doar propriile chei de acces.",
            preparingManagement: "Se pregătește gestionarea cheilor de acces...",
            failedToManage: "Gestionarea cheilor de acces nu a putut fi pornită. Autentificați-vă din nou.",
            reauthenticationRequired:
                "Pentru propria dvs. securitate, autentificați-vă din nou pentru a gestiona cheile de acces.",
            reauthenticate: "Autentificați-vă din nou"
        }
    }
} as const satisfies CustomTranslationsObject;

export { ro };
