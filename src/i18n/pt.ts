import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const pt = {
    passkeyPlugin: {
        loginButton: {
            or: "ou",
            failedToLogin: "Não foi possível iniciar sessão com uma chave de acesso.",
            notAllowed: "A operação da chave de acesso foi cancelada ou não é permitida.",
            loginWithPasskey: "Iniciar sessão com uma chave de acesso"
        },
        managementClient: {
            failedToLoad: "Não foi possível carregar as chaves de acesso.",
            failedToRegister: "Não foi possível registar a chave de acesso.",
            successfullyRegistered: "A chave de acesso foi registada com êxito.",
            notAllowed: "O registo da chave de acesso foi cancelado ou não é permitido.",
            alreadyRegistered: "Esta chave de acesso já está registada.",
            confirmDelete: {
                heading: "Eliminar esta chave de acesso?",
                body: "Está prestes a eliminar a chave de acesso «{{name}}». Esta ação não pode ser anulada."
            },
            failedToDelete: "Não foi possível eliminar a chave de acesso.",
            successfullyDeleted: "A chave de acesso foi eliminada com êxito.",
            addPasskey: "Adicionar uma chave de acesso",
            passkeyName: "Nome (opcional)",
            register: "Registar",
            registering: "A registar...",
            cancel: "Cancelar",
            unknownAuthenticator: "Autenticador desconhecido",
            createdAt: "Criada em: ",
            delete: "Eliminar",
            deleting: "A eliminar...",
            notFound: "Não foram encontradas chaves de acesso registadas."
        },
        managementField: {
            passkey: "Chave de acesso",
            ownPasskeysOnly: "Só pode gerir as suas próprias chaves de acesso.",
            preparingManagement: "A preparar a gestão das chaves de acesso...",
            failedToManage: "Não foi possível iniciar a gestão das chaves de acesso. Faça login novamente.",
            reauthenticationRequired: "Faça login novamente para gerir as chaves de acesso.",
            reauthenticate: "Fazer login novamente"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Não foi possível terminar sessão: {{message}}",
            failedToLogout: "Não foi possível terminar sessão.",
            logout: "Terminar sessão"
        }
    }
} as const satisfies CustomTranslationsObject;

export { pt };
