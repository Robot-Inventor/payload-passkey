import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const da = {
    passkeyPlugin: {
        loginButton: {
            or: "Eller",
            failedToLogin: "Kunne ikke logge på med en adgangsnøgle.",
            notAllowed: "Adgangsnøglehandlingen blev annulleret eller er ikke tilladt.",
            loginWithPasskey: "Log på med en adgangsnøgle"
        },
        managementClient: {
            failedToLoad: "Adgangsnøglerne kunne ikke indlæses.",
            failedToRegister: "Adgangsnøglen kunne ikke registreres.",
            successfullyRegistered: "Adgangsnøglen blev registreret.",
            notAllowed: "Adgangsnøglehandlingen blev annulleret eller er ikke tilladt.",
            alreadyRegistered: "Denne adgangsnøgle er allerede registreret.",
            confirmDelete: {
                heading: "Bekræft sletning",
                body: "Du er ved at slette adgangsnøgle {{name}}. Er du sikker?"
            },
            failedToDelete: "Adgangsnøglen kunne ikke slettes.",
            successfullyDeleted: "Adgangsnøglen blev slettet.",
            addPasskey: "Tilføj adgangsnøgle",
            passkeyName: "Navn (valgfrit)",
            register: "Registrer",
            registering: "Registrerer...",
            cancel: "Anuller",
            unknownAuthenticator: "Ukendt godkendelsesapp",
            createdAt: "Oprettet til:",
            delete: "Slet",
            deleting: "Sletter...",
            notFound: "Ingen registrerede adgangsnøgler fundet."
        },
        managementField: {
            passkey: "Adgangsnøgle",
            ownPasskeysOnly: "Du kan kun administrere dine egne adgangsnøgler.",
            preparingManagement: "Forbereder administration af adgangsnøgler...",
            failedToManage: "Administration af adgangsnøgler kunne ikke startes. Log på igen.",
            reauthenticationRequired:
                "Af hensyn til din egen sikkerhed skal du logge på igen for at administrere adgangsnøgler.",
            reauthenticate: "Log på igen"
        }
    }
} as const satisfies CustomTranslationsObject;

export { da };
