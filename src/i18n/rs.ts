import type { CustomTranslationsObject } from "./customTranslations";

const rs = {
    passkeyPlugin: {
        loginButton: {
            or: "Или",
            failedToLogin: "Пријава помоћу кључа за приступ није успела.",
            notAllowed: "Операција кључа за приступ је отказана или није дозвољена.",
            loginWithPasskey: "Пријава помоћу кључа за приступ"
        },
        managementClient: {
            failedToLoad: "Учитавање кључева за приступ није успело.",
            failedToRegister: "Регистровање кључа за приступ није успело.",
            successfullyRegistered: "Кључ за приступ је успешно регистрован.",
            notAllowed: "Операција кључа за приступ је отказана или није дозвољена.",
            alreadyRegistered: "Овај кључ за приступ је већ регистрован.",
            confirmDelete: {
                heading: "Потврди брисање",
                body: "Избрисаћете кључ за приступ {{name}}. Да ли сте сигурни?"
            },
            failedToDelete: "Брисање кључа за приступ није успело.",
            successfullyDeleted: "Кључ за приступ је успешно избрисан.",
            addPasskey: "Додај кључ за приступ",
            passkeyName: "Ime (опционално)",
            register: "Региструјте",
            registering: "Регистровање...",
            cancel: "Откажи",
            unknownAuthenticator: "Непознати аутентификатор",
            createdAt: "Креирано у:",
            delete: "Обриши",
            deleting: "Брисање...",
            notFound: "Нису пронађени регистровани кључеви за приступ."
        },
        managementField: {
            passkey: "Кључ за приступ",
            ownPasskeysOnly: "Можете да управљате само сопственим кључевима за приступ.",
            preparingManagement: "Припрема се управљање кључевима за приступ...",
            failedToManage: "Није могуће покренути управљање кључевима за приступ. Пријавите се поново.",
            reauthenticationRequired: "Због сигурности, пријавите се поново да бисте управљали кључевима за приступ.",
            reauthenticate: "Поновна пријава"
        }
    }
} as const satisfies CustomTranslationsObject;

export { rs };
