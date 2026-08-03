import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const hy = {
    passkeyPlugin: {
        loginButton: {
            or: "Կամ",
            failedToLogin: "Չհաջողվեց մուտք գործել մուտքի բանալիով։",
            notAllowed: "Մուտքի բանալու գործողությունը չեղարկվել է կամ թույլատրված չէ։",
            loginWithPasskey: "Մուտք գործել մուտքի բանալիով"
        },
        managementClient: {
            failedToLoad: "Չհաջողվեց բեռնել մուտքի բանալիները։",
            failedToRegister: "Չհաջողվեց գրանցել մուտքի բանալին։",
            successfullyRegistered: "Մուտքի բանալին հաջողությամբ գրանցվեց։",
            notAllowed: "Մուտքի բանալու գործողությունը չեղարկվել է կամ թույլատրված չէ։",
            alreadyRegistered: "Այս մուտքի բանալին արդեն գրանցված է։",
            confirmDelete: {
                heading: "Հաստատել ջնջելը",
                body: "Դուք պատրաստվում եք ջնջել մուտքի բանալի {{name}}-ը։ Համոզվա՞ծ եք։"
            },
            failedToDelete: "Չհաջողվեց ջնջել մուտքի բանալին։",
            successfullyDeleted: "Մուտքի բանալին հաջողությամբ ջնջվեց։",
            addPasskey: "Ավելացնել մուտքի բանալի",
            passkeyName: "Անուն (ըստ ցանկության)",
            register: "Գրանցել",
            registering: "Գրանցվում է...",
            cancel: "Չեղարկել",
            unknownAuthenticator: "Անհայտ վավերացուցիչ",
            createdAt: "Ստեղծման ժամանակ:",
            delete: "Ջնջել",
            deleting: "Ջնջվում է...",
            notFound: "Գրանցված մուտքի բանալիներ չեն գտնվել։"
        },
        managementField: {
            passkey: "Մուտքի բանալի",
            ownPasskeysOnly: "Դուք կարող եք կառավարել միայն ձեր մուտքի բանալիները։",
            preparingManagement: "Մուտքի բանալիների կառավարումը նախապատրաստվում է...",
            failedToManage: "Չհաջողվեց սկսել մուտքի բանալիների կառավարումը։ Կրկին մուտք գործեք։",
            reauthenticationRequired: "Ձեր իսկ անվտանգության համար մուտքի բանալիները կառավարելու համար կրկին մուտք գործեք։",
            reauthenticate: "Կրկին մուտք գործել"
        }
    }
} as const satisfies CustomTranslationsObject;

export { hy };
