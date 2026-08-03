import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

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
            notAllowed: "Операцію з ключем доступу скасовано або не дозволено.",
            alreadyRegistered: "Цей ключ доступу вже зареєстровано.",
            confirmDelete: {
                heading: "Підтвердити видалення",
                body: "Ви бажаєте видалити ключ доступу {{name}}. Ви впевнені?"
            },
            failedToDelete: "Не вдалося видалити ключ доступу.",
            successfullyDeleted: "Ключ доступу успішно видалено.",
            addPasskey: "Додати ключ доступу",
            passkeyName: "Ім'я (необов’язково)",
            register: "Зареєструвати",
            registering: "Реєстрація...",
            cancel: "Скасувати",
            unknownAuthenticator: "Невідомий автентифікатор",
            createdAt: "Дата створення:",
            delete: "Видалити",
            deleting: "Видалення...",
            notFound: "Зареєстрованих ключів доступу не знайдено."
        },
        managementField: {
            passkey: "Ключ доступу",
            ownPasskeysOnly: "Ви можете керувати лише власними ключами доступу.",
            preparingManagement: "Підготовка керування ключами доступу...",
            failedToManage: "Не вдалося почати керування ключами доступу. Увійдіть знову.",
            reauthenticationRequired: "У цілях вашої безпеки увійдіть знову, щоб керувати ключами доступу.",
            reauthenticate: "Увійти знову"
        }
    }
} as const satisfies CustomTranslationsObject;

export { uk };
