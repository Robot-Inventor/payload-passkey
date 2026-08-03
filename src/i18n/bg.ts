import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const bg = {
    passkeyPlugin: {
        loginButton: {
            or: "или",
            failedToLogin: "Влизането с ключ за достъп не бе успешно.",
            notAllowed: "Операцията с ключа за достъп е отменена или не е разрешена.",
            loginWithPasskey: "Влизане с ключ за достъп"
        },
        managementClient: {
            failedToLoad: "Ключовете за достъп не можаха да се заредят.",
            failedToRegister: "Ключът за достъп не можа да се регистрира.",
            successfullyRegistered: "Ключът за достъп е регистриран успешно.",
            notAllowed: "Регистрацията на ключа за достъп е отменена или не е разрешена.",
            alreadyRegistered: "Този ключ за достъп вече е регистриран.",
            confirmDelete: {
                heading: "Да се изтрие ли този ключ за достъп?",
                body: "На път сте да изтриете ключа за достъп „{{name}}“. Това действие не може да бъде отменено."
            },
            failedToDelete: "Ключът за достъп не можа да се изтрие.",
            successfullyDeleted: "Ключът за достъп е изтрит успешно.",
            addPasskey: "Добавяне на ключ за достъп",
            passkeyName: "Име (по избор)",
            register: "Регистриране",
            registering: "Регистриране...",
            cancel: "Отказ",
            unknownAuthenticator: "Неизвестен удостоверител",
            createdAt: "Създаден: ",
            delete: "Изтриване",
            deleting: "Изтриване...",
            notFound: "Не са намерени регистрирани ключове за достъп."
        },
        managementField: {
            passkey: "Ключ за достъп",
            ownPasskeysOnly: "Можете да управлявате само собствените си ключове за достъп.",
            preparingManagement: "Подготвя се управлението на ключовете за достъп...",
            failedToManage: "Управлението на ключовете за достъп не можа да започне. Влезте отново.",
            reauthenticationRequired: "Моля, влезте отново, за да управлявате ключовете за достъп.",
            reauthenticate: "Влез обратно"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Излизането не бе успешно: {{message}}",
            failedToLogout: "Излизането не бе успешно.",
            logout: "Изход"
        }
    }
} as const satisfies CustomTranslationsObject;

export { bg };
