import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const hy = {
    passkeyPlugin: {
        loginButton: {
            or: "կամ",
            failedToLogin: "Չհաջողվեց մուտք գործել մուտքի բանալիով։",
            notAllowed: "Մուտքի բանալու գործողությունը չեղարկվել է կամ թույլատրված չէ։",
            loginWithPasskey: "Մուտք գործել մուտքի բանալիով"
        },
        managementClient: {
            failedToLoad: "Չհաջողվեց բեռնել մուտքի բանալիները։",
            failedToRegister: "Չհաջողվեց գրանցել մուտքի բանալին։",
            successfullyRegistered: "Մուտքի բանալին հաջողությամբ գրանցվեց։",
            notAllowed: "Մուտքի բանալու գրանցումը չեղարկվել է կամ թույլատրված չէ։",
            alreadyRegistered: "Այս մուտքի բանալին արդեն գրանցված է։",
            confirmDelete: {
                heading: "Ջնջե՞լ այս մուտքի բանալին։",
                body: "Դուք պատրաստվում եք ջնջել «{{name}}» մուտքի բանալին։ Այս գործողությունը հնարավոր չէ չեղարկել։"
            },
            failedToDelete: "Չհաջողվեց ջնջել մուտքի բանալին։",
            successfullyDeleted: "Մուտքի բանալին հաջողությամբ ջնջվեց։",
            addPasskey: "Ավելացնել մուտքի բանալի",
            passkeyName: "Անուն (ըստ ցանկության)",
            register: "Գրանցել",
            registering: "Գրանցվում է...",
            cancel: "Չեղարկել",
            unknownAuthenticator: "Անհայտ վավերացուցիչ",
            createdAt: "Ստեղծվել է՝ ",
            delete: "Ջնջել",
            deleting: "Ջնջվում է...",
            notFound: "Գրանցված մուտքի բանալիներ չեն գտնվել։"
        },
        managementField: {
            passkey: "Մուտքի բանալի",
            ownPasskeysOnly: "Դուք կարող եք կառավարել միայն ձեր մուտքի բանալիները։",
            preparingManagement: "Մուտքի բանալիների կառավարումը նախապատրաստվում է...",
            failedToManage: "Չհաջողվեց սկսել մուտքի բանալիների կառավարումը։ Կրկին մուտք գործեք։",
            reauthenticationRequired: "Մուտքի բանալիները կառավարելու համար կրկին մուտք գործեք։",
            reauthenticate: "Կրկին մուտք գործել"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Չհաջողվեց դուրս գալ՝ {{message}}",
            failedToLogout: "Չհաջողվեց դուրս գալ։",
            logout: "Դուրս գալ"
        }
    }
} as const satisfies CustomTranslationsObject;

export { hy };
