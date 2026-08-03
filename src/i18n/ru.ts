import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const ru = {
    passkeyPlugin: {
        loginButton: {
            or: "или",
            failedToLogin: "Не удалось войти с помощью ключа доступа.",
            notAllowed: "Операция с ключом доступа отменена или не разрешена.",
            loginWithPasskey: "Войти с помощью ключа доступа"
        },
        managementClient: {
            failedToLoad: "Не удалось загрузить ключи доступа.",
            failedToRegister: "Не удалось зарегистрировать ключ доступа.",
            successfullyRegistered: "Ключ доступа успешно зарегистрирован.",
            notAllowed: "Регистрация ключа доступа отменена или не разрешена.",
            alreadyRegistered: "Этот ключ доступа уже зарегистрирован.",
            confirmDelete: {
                heading: "Удалить этот ключ доступа?",
                body: "Вы собираетесь удалить ключ доступа «{{name}}». Это действие нельзя отменить."
            },
            failedToDelete: "Не удалось удалить ключ доступа.",
            successfullyDeleted: "Ключ доступа успешно удален.",
            addPasskey: "Добавить ключ доступа",
            passkeyName: "Имя (необязательно)",
            register: "Зарегистрировать",
            registering: "Регистрация...",
            cancel: "Отмена",
            unknownAuthenticator: "Неизвестный аутентификатор",
            createdAt: "Создан: ",
            delete: "Удалить",
            deleting: "Удаление...",
            notFound: "Зарегистрированные ключи доступа не найдены."
        },
        managementField: {
            passkey: "Ключ доступа",
            ownPasskeysOnly: "Вы можете управлять только своими ключами доступа.",
            preparingManagement: "Подготовка управления ключами доступа...",
            failedToManage: "Не удалось начать управление ключами доступа. Войдите снова."
        },
        logoutButton: {
            failedToLogoutWithMessage: "Не удалось выйти: {{message}}",
            failedToLogout: "Не удалось выйти.",
            logout: "Выйти"
        }
    }
} as const satisfies CustomTranslationsObject;

export { ru };
