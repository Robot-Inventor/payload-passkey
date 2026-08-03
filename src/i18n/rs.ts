import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const rs = {
    passkeyPlugin: {
        loginButton: {
            or: "или",
            failedToLogin: "Пријављивање помоћу кључа за приступ није успело.",
            notAllowed: "Операција кључа за приступ је отказана или није дозвољена.",
            loginWithPasskey: "Пријавите се помоћу кључа за приступ"
        },
        managementClient: {
            failedToLoad: "Учитавање кључева за приступ није успело.",
            failedToRegister: "Регистровање кључа за приступ није успело.",
            successfullyRegistered: "Кључ за приступ је успешно регистрован.",
            notAllowed: "Регистровање кључа за приступ је отказано или није дозвољено.",
            alreadyRegistered: "Овај кључ за приступ је већ регистрован.",
            confirmDelete: {
                heading: "Избрисати овај кључ за приступ?",
                body: "Спремате се да избришете кључ за приступ „{{name}}“. Ова радња се не може опозвати."
            },
            failedToDelete: "Брисање кључа за приступ није успело.",
            successfullyDeleted: "Кључ за приступ је успешно избрисан.",
            addPasskey: "Додајте кључ за приступ",
            passkeyName: "Име (опционално)",
            register: "Региструјте",
            registering: "Регистровање...",
            cancel: "Откажи",
            unknownAuthenticator: "Непознати аутентификатор",
            createdAt: "Креирано: ",
            delete: "Избриши",
            deleting: "Брисање...",
            notFound: "Нису пронађени регистровани кључеви за приступ."
        },
        managementField: {
            passkey: "Кључ за приступ",
            ownPasskeysOnly: "Можете да управљате само сопственим кључевима за приступ.",
            preparingManagement: "Припрема се управљање кључевима за приступ...",
            failedToManage: "Није могуће покренути управљање кључевима за приступ. Пријавите се поново.",
            reauthenticationRequired: "Пријавите се поново да бисте управљали кључевима за приступ.",
            reauthenticate: "Поновна пријава"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Одјављивање није успело: {{message}}",
            failedToLogout: "Одјављивање није успело.",
            logout: "Одјавите се"
        }
    }
} as const satisfies CustomTranslationsObject;

export { rs };
