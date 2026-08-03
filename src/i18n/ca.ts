import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const ca = {
    passkeyPlugin: {
        loginButton: {
            or: "o",
            failedToLogin: "No s'ha pogut iniciar la sessió amb una clau d'accés.",
            notAllowed: "L'operació de la clau d'accés s'ha cancel·lat o no està permesa.",
            loginWithPasskey: "Inicia la sessió amb una clau d'accés"
        },
        managementClient: {
            failedToLoad: "No s'han pogut carregar les claus d'accés.",
            failedToRegister: "No s'ha pogut registrar la clau d'accés.",
            successfullyRegistered: "La clau d'accés s'ha registrat correctament.",
            notAllowed: "El registre de la clau d'accés s'ha cancel·lat o no està permès.",
            alreadyRegistered: "Aquesta clau d'accés ja està registrada.",
            confirmDelete: {
                heading: "Vols suprimir aquesta clau d'accés?",
                body: "Estàs a punt de suprimir la clau d'accés «{{name}}». Aquesta acció no es pot desfer."
            },
            failedToDelete: "No s'ha pogut suprimir la clau d'accés.",
            successfullyDeleted: "La clau d'accés s'ha suprimit correctament.",
            addPasskey: "Afegeix una clau d'accés",
            passkeyName: "Nom (opcional)",
            register: "Registra",
            registering: "S'està registrant...",
            cancel: "Cancel·la",
            unknownAuthenticator: "Autenticador desconegut",
            createdAt: "Creat: ",
            delete: "Suprimeix",
            deleting: "S'està suprimint...",
            notFound: "No s'han trobat claus d'accés registrades."
        },
        managementField: {
            passkey: "Clau d'accés",
            ownPasskeysOnly: "Només pots gestionar les teves pròpies claus d'accés.",
            preparingManagement: "S'està preparant la gestió de les claus d'accés...",
            failedToManage: "No s'ha pogut iniciar la gestió de les claus d'accés. Torna a iniciar la sessió."
        }
    }
} as const satisfies CustomTranslationsObject;

export { ca };
