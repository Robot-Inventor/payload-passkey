import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const da = {
    passkeyPlugin: {
        loginButton: {
            or: "eller",
            failedToLogin: "Kunne ikke logge på med en adgangsnøgle.",
            notAllowed: "Adgangsnøglehandlingen blev annulleret eller er ikke tilladt.",
            loginWithPasskey: "Log på med en adgangsnøgle"
        },
        managementClient: {
            failedToLoad: "Adgangsnøglerne kunne ikke indlæses.",
            failedToRegister: "Adgangsnøglen kunne ikke registreres.",
            successfullyRegistered: "Adgangsnøglen blev registreret.",
            notAllowed: "Registreringen af adgangsnøglen blev annulleret eller er ikke tilladt.",
            alreadyRegistered: "Denne adgangsnøgle er allerede registreret.",
            confirmDelete: {
                heading: "Vil du slette denne adgangsnøgle?",
                body: "Du er ved at slette adgangsnøglen „{{name}}“. Denne handling kan ikke fortrydes."
            },
            failedToDelete: "Adgangsnøglen kunne ikke slettes.",
            successfullyDeleted: "Adgangsnøglen blev slettet.",
            addPasskey: "Tilføj en adgangsnøgle",
            passkeyName: "Navn (valgfrit)",
            register: "Registrer",
            registering: "Registrerer...",
            cancel: "Annuller",
            unknownAuthenticator: "Ukendt godkendelsesapp",
            createdAt: "Oprettet: ",
            delete: "Slet",
            deleting: "Sletter...",
            notFound: "Ingen registrerede adgangsnøgler fundet."
        },
        managementField: {
            passkey: "Adgangsnøgle",
            ownPasskeysOnly: "Du kan kun administrere dine egne adgangsnøgler.",
            preparingManagement: "Forbereder administration af adgangsnøgler...",
            failedToManage: "Administration af adgangsnøgler kunne ikke startes. Log på igen."
        }
    }
} as const satisfies CustomTranslationsObject;

export { da };
