import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const ro = {
    passkeyPlugin: {
        loginButton: {
            or: "sau",
            failedToLogin: "Conectarea cu o cheie de acces a eșuat.",
            notAllowed: "Operațiunea cheii de acces a fost anulată sau nu este permisă.",
            loginWithPasskey: "Conectare cu o cheie de acces"
        },
        managementClient: {
            failedToLoad: "Încărcarea cheilor de acces a eșuat.",
            failedToRegister: "Înregistrarea cheii de acces a eșuat.",
            successfullyRegistered: "Cheia de acces a fost înregistrată cu succes.",
            notAllowed: "Înregistrarea cheii de acces a fost anulată sau nu este permisă.",
            alreadyRegistered: "Această cheie de acces este deja înregistrată.",
            confirmDelete: {
                heading: "Ștergeți această cheie de acces?",
                body: "Urmează să ștergeți cheia de acces „{{name}}”. Această acțiune nu poate fi anulată."
            },
            failedToDelete: "Ștergerea cheii de acces a eșuat.",
            successfullyDeleted: "Cheia de acces a fost ștearsă cu succes.",
            addPasskey: "Adăugați o cheie de acces",
            passkeyName: "Nume (opțional)",
            register: "Înregistrați",
            registering: "Se înregistrează...",
            cancel: "Anulați",
            unknownAuthenticator: "Autentificator necunoscut",
            createdAt: "Creată: ",
            delete: "Ștergeți",
            deleting: "Se șterge...",
            notFound: "Nu s-au găsit chei de acces înregistrate."
        },
        managementField: {
            passkey: "Cheie de acces",
            ownPasskeysOnly: "Puteți gestiona doar propriile chei de acces.",
            preparingManagement: "Se pregătește gestionarea cheilor de acces...",
            failedToManage: "Gestionarea cheilor de acces nu a putut fi pornită. Conectați-vă din nou."
        }
    }
} as const satisfies CustomTranslationsObject;

export { ro };
