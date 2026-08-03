import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const pt = {
    passkeyPlugin: {
        loginButton: {
            or: "Ou",
            failedToLogin: "Não foi possível fazer login com uma chave de acesso.",
            notAllowed: "A operação da chave de acesso foi cancelada ou não é permitida.",
            loginWithPasskey: "Fazer login com uma chave de acesso"
        },
        managementClient: {
            failedToLoad: "Não foi possível carregar as chaves de acesso.",
            failedToRegister: "Não foi possível registar a chave de acesso.",
            successfullyRegistered: "A chave de acesso foi registada com êxito.",
            notAllowed: "A operação da chave de acesso foi cancelada ou não é permitida.",
            alreadyRegistered: "Esta chave de acesso já está registada.",
            confirmDelete: {
                heading: "Confirmar exclusão",
                body: "Você está prestes a excluir o/a chave de acesso {{name}}. Tem certeza?"
            },
            failedToDelete: "Não foi possível eliminar a chave de acesso.",
            successfullyDeleted: "A chave de acesso foi eliminada com êxito.",
            addPasskey: "Adicionar chave de acesso",
            passkeyName: "Nome (opcional)",
            register: "Registar",
            registering: "A registar...",
            cancel: "Cancelar",
            unknownAuthenticator: "Autenticador desconhecido",
            createdAt: "Criado Em:",
            delete: "Excluir",
            deleting: "Excluindo...",
            notFound: "Não foram encontradas chaves de acesso registadas."
        },
        managementField: {
            passkey: "Chave de acesso",
            ownPasskeysOnly: "Só pode gerir as suas próprias chaves de acesso.",
            preparingManagement: "A preparar a gestão das chaves de acesso...",
            failedToManage: "Não foi possível iniciar a gestão das chaves de acesso. Faça login novamente.",
            reauthenticationRequired:
                "Para a sua própria segurança, faça login novamente para gerir as chaves de acesso.",
            reauthenticate: "Fazer login novamente"
        }
    }
} as const satisfies CustomTranslationsObject;

export { pt };
