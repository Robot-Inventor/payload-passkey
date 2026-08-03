import type { CustomTranslationsObject } from "./customTranslations";

const ru = {
    passkeyPlugin: {
        loginButton: {
            or: "Или же",
            failedToLogin: "Не удалось войти с помощью ключа доступа.",
            notAllowed: "Операция с ключом доступа отменена или не разрешена.",
            loginWithPasskey: "Войти с помощью ключа доступа"
        },
        managementClient: {
            failedToLoad: "Не удалось загрузить ключи доступа.",
            failedToRegister: "Не удалось зарегистрировать ключ доступа.",
            successfullyRegistered: "Ключ доступа успешно зарегистрирован.",
            notAllowed: "Операция с ключом доступа отменена или не разрешена.",
            alreadyRegistered: "Этот ключ доступа уже зарегистрирован.",
            confirmDelete: {
                heading: "Подтвердить удаление",
                body: "Вы собираетесь удалить ключ доступа {{name}}. Вы уверены?"
            },
            failedToDelete: "Не удалось удалить ключ доступа.",
            successfullyDeleted: "Ключ доступа успешно удален.",
            addPasskey: "Добавить ключ доступа",
            passkeyName: "Имя (необязательно)",
            register: "Зарегистрировать",
            registering: "Регистрация...",
            cancel: "Отмена",
            unknownAuthenticator: "Неизвестный аутентификатор",
            createdAt: "Дата создания:",
            delete: "Удалить",
            deleting: "Удаление...",
            notFound: "Зарегистрированные ключи доступа не найдены."
        },
        managementField: {
            passkey: "Ключ доступа",
            ownPasskeysOnly: "Вы можете управлять только своими ключами доступа.",
            preparingManagement: "Подготовка управления ключами доступа...",
            failedToManage: "Не удалось начать управление ключами доступа. Войдите снова.",
            reauthenticationRequired: "В целях вашей безопасности войдите снова, чтобы управлять ключами доступа.",
            reauthenticate: "Войти снова"
        }
    }
} as const satisfies CustomTranslationsObject;

export { ru };
