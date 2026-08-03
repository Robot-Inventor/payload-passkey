import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const bg = {
    passkeyPlugin: {
        loginButton: {
            or: "Или",
            failedToLogin: "Влизането с ключ за достъп не бе успешно.",
            notAllowed: "Операцията с ключа за достъп е отменена или не е разрешена.",
            loginWithPasskey: "Влизане с ключ за достъп"
        },
        managementClient: {
            failedToLoad: "Ключовете за достъп не можаха да се заредят.",
            failedToRegister: "Ключът за достъп не можа да се регистрира.",
            successfullyRegistered: "Ключът за достъп е регистриран успешно.",
            notAllowed: "Операцията с ключа за достъп е отменена или не е разрешена.",
            alreadyRegistered: "Този ключ за достъп вече е регистриран.",
            confirmDelete: {
                heading: "Потвърди изтриване",
                body: "На път си да изтриеш Ключ за достъп {{name}}. Сигурен ли си?"
            },
            failedToDelete: "Ключът за достъп не можа да се изтрие.",
            successfullyDeleted: "Ключът за достъп е изтрит успешно.",
            addPasskey: "Добави ключ за достъп",
            passkeyName: "Име (по избор)",
            register: "Регистриране",
            registering: "Регистриране...",
            cancel: "Отмени",
            unknownAuthenticator: "Неизвестен удостоверител",
            createdAt: "Създаден на:",
            delete: "Изтрий",
            deleting: "Изтриване...",
            notFound: "Не са намерени регистрирани ключове за достъп."
        },
        managementField: {
            passkey: "Ключ за достъп",
            ownPasskeysOnly: "Можете да управлявате само собствените си ключове за достъп.",
            preparingManagement: "Подготвя се управлението на ключовете за достъп...",
            failedToManage: "Управлението на ключовете за достъп не можа да започне. Влезте отново.",
            reauthenticationRequired: "За ваша сигурност, моля, влезте отново, за да управлявате ключовете за достъп.",
            reauthenticate: "Влез обратно"
        }
    }
} as const satisfies CustomTranslationsObject;

export { bg };
