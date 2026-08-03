import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const nb = {
    passkeyPlugin: {
        loginButton: {
            or: "eller",
            failedToLogin: "Kunne ikke logge på med en passnøkkel.",
            notAllowed: "Passnøkkeloperasjonen ble avbrutt eller er ikke tillatt.",
            loginWithPasskey: "Logg på med en passnøkkel"
        },
        managementClient: {
            failedToLoad: "Kunne ikke laste inn passnøkler.",
            failedToRegister: "Kunne ikke registrere passnøkkelen.",
            successfullyRegistered: "Passnøkkelen ble registrert.",
            notAllowed: "Registreringen av passnøkkelen ble avbrutt eller er ikke tillatt.",
            alreadyRegistered: "Denne passnøkkelen er allerede registrert.",
            confirmDelete: {
                heading: "Vil du slette denne passnøkkelen?",
                body: "Du er i ferd med å slette passnøkkelen «{{name}}». Denne handlingen kan ikke angres."
            },
            failedToDelete: "Kunne ikke slette passnøkkelen.",
            successfullyDeleted: "Passnøkkelen ble slettet.",
            addPasskey: "Legg til en passnøkkel",
            passkeyName: "Navn (valgfritt)",
            register: "Registrer",
            registering: "Registrerer...",
            cancel: "Avbryt",
            unknownAuthenticator: "Ukjent godkjenner",
            createdAt: "Opprettet: ",
            delete: "Slett",
            deleting: "Sletter...",
            notFound: "Fant ingen registrerte passnøkler."
        },
        managementField: {
            passkey: "Passnøkkel",
            ownPasskeysOnly: "Du kan bare administrere dine egne passnøkler.",
            preparingManagement: "Forbereder passnøkkeladministrasjon...",
            failedToManage: "Kunne ikke starte passnøkkeladministrasjon. Logg på på nytt."
        }
    }
} as const satisfies CustomTranslationsObject;

export { nb };
