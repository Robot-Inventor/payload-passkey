import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const uk = {
    passkeyPlugin: {
        loginButton: {
            or: "або",
            failedToLogin: "Не вдалося ввійти за допомогою ключа доступу.",
            notAllowed: "Операцію з ключем доступу скасовано або не дозволено.",
            loginWithPasskey: "Увійти за допомогою ключа доступу"
        },
        managementClient: {
            failedToLoad: "Не вдалося завантажити ключі доступу.",
            failedToRegister: "Не вдалося зареєструвати ключ доступу.",
            successfullyRegistered: "Ключ доступу успішно зареєстровано.",
            notAllowed: "Реєстрацію ключа доступу скасовано або не дозволено.",
            alreadyRegistered: "Цей ключ доступу вже зареєстровано.",
            confirmDelete: {
                heading: "Видалити цей ключ доступу?",
                body: "Ви збираєтеся видалити ключ доступу «{{name}}». Цю дію не можна скасувати."
            },
            failedToDelete: "Не вдалося видалити ключ доступу.",
            successfullyDeleted: "Ключ доступу успішно видалено.",
            addPasskey: "Додати ключ доступу",
            passkeyName: "Ім’я (необов’язково)",
            register: "Зареєструвати",
            registering: "Реєстрація...",
            cancel: "Скасувати",
            unknownAuthenticator: "Невідомий автентифікатор",
            createdAt: "Створено: ",
            delete: "Видалити",
            deleting: "Видалення...",
            notFound: "Зареєстрованих ключів доступу не знайдено."
        },
        managementField: {
            passkey: "Ключ доступу",
            ownPasskeysOnly: "Ви можете керувати лише власними ключами доступу.",
            preparingManagement: "Підготовка керування ключами доступу...",
            failedToManage: "Не вдалося почати керування ключами доступу. Увійдіть знову."
        }
    }
} as const satisfies CustomTranslationsObject;

export { uk };
