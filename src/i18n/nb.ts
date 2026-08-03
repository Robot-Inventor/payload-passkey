import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const nb = {
    passkeyPlugin: {
        loginButton: {
            or: "Eller",
            failedToLogin: "Kunne ikke logge inn med en passnøkkel.",
            notAllowed: "Passnøkkeloperasjonen ble avbrutt eller er ikke tillatt.",
            loginWithPasskey: "Logg inn med en passnøkkel"
        },
        managementClient: {
            failedToLoad: "Kunne ikke laste inn passnøkler.",
            failedToRegister: "Kunne ikke registrere passnøkkelen.",
            successfullyRegistered: "Passnøkkelen ble registrert.",
            notAllowed: "Passnøkkeloperasjonen ble avbrutt eller er ikke tillatt.",
            alreadyRegistered: "Denne passnøkkelen er allerede registrert.",
            confirmDelete: {
                heading: "Bekreft sletting",
                body: "Du er i ferd med å slette passnøkkel {{name}}. Er du sikker?"
            },
            failedToDelete: "Kunne ikke slette passnøkkelen.",
            successfullyDeleted: "Passnøkkelen ble slettet.",
            addPasskey: "Legg til passnøkkel",
            passkeyName: "Navn (valgfritt)",
            register: "Registrer",
            registering: "Registrerer...",
            cancel: "Avbryt",
            unknownAuthenticator: "Ukjent godkjenner",
            createdAt: "Opprettet:",
            delete: "Slett",
            deleting: "Sletter...",
            notFound: "Fant ingen registrerte passnøkler."
        },
        managementField: {
            passkey: "Passnøkkel",
            ownPasskeysOnly: "Du kan bare administrere dine egne passnøkler.",
            preparingManagement: "Forbereder passnøkkeladministrasjon...",
            failedToManage: "Kunne ikke starte passnøkkeladministrasjon. Logg inn igjen.",
            reauthenticationRequired: "For din egen sikkerhet, logg inn igjen for å administrere passnøkler.",
            reauthenticate: "Logg inn igjen"
        }
    }
} as const satisfies CustomTranslationsObject;

export { nb };
