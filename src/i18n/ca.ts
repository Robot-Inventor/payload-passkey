import type { CustomTranslationsObject } from "./customTranslations";

const ca = {
    passkeyPlugin: {
        loginButton: {
            or: "O",
            failedToLogin: "No s'ha pogut iniciar sessió amb una clau d'accés.",
            notAllowed: "L'operació de la clau d'accés s'ha cancel·lat o no està permesa.",
            loginWithPasskey: "Inicia sessió amb una clau d'accés"
        },
        managementClient: {
            failedToLoad: "No s'han pogut carregar les claus d'accés.",
            failedToRegister: "No s'ha pogut registrar la clau d'accés.",
            successfullyRegistered: "La clau d'accés s'ha registrat correctament.",
            notAllowed: "L'operació de la clau d'accés s'ha cancel·lat o no està permesa.",
            alreadyRegistered: "Aquesta clau d'accés ja està registrada.",
            confirmDelete: {
                heading: "Confirma l'eliminació",
                body: "Estas apunt de eliminar clau d'accés {{name}}. Estas segur?"
            },
            failedToDelete: "No s'ha pogut suprimir la clau d'accés.",
            successfullyDeleted: "La clau d'accés s'ha suprimit correctament.",
            addPasskey: "Afegeix clau d'accés",
            passkeyName: "Nom (opcional)",
            register: "Registra",
            registering: "S'està registrant...",
            cancel: "Cancel·la",
            unknownAuthenticator: "Autenticador desconegut",
            createdAt: "Creat el:",
            delete: "Eliminar",
            deleting: "Eliminant...",
            notFound: "No s'han trobat claus d'accés registrades."
        },
        managementField: {
            passkey: "Clau d'accés",
            ownPasskeysOnly: "Només pots gestionar les teves pròpies claus d'accés.",
            preparingManagement: "S'està preparant la gestió de les claus d'accés...",
            failedToManage: "No s'ha pogut iniciar la gestió de les claus d'accés. Torna a iniciar sessió.",
            reauthenticationRequired:
                "Per la teva pròpia seguretat, torna a iniciar sessió per gestionar les claus d’accés.",
            reauthenticate: "Tornar a iniciar sessió"
        }
    }
} as const satisfies CustomTranslationsObject;

export { ca };
