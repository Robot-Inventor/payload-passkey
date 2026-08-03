import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const he = {
    passkeyPlugin: {
        loginButton: {
            or: "או",
            failedToLogin: "ההתחברות באמצעות מפתח גישה נכשלה.",
            notAllowed: "פעולת מפתח הגישה בוטלה או אינה מורשית.",
            loginWithPasskey: "התחברות באמצעות מפתח גישה"
        },
        managementClient: {
            failedToLoad: "טעינת מפתחות הגישה נכשלה.",
            failedToRegister: "רישום מפתח הגישה נכשל.",
            successfullyRegistered: "מפתח הגישה נרשם בהצלחה.",
            notAllowed: "רישום מפתח הגישה בוטל או אינו מורשה.",
            alreadyRegistered: "מפתח גישה זה כבר רשום.",
            confirmDelete: {
                heading: "למחוק את מפתח הגישה הזה?",
                body: "אתה עומד למחוק את מפתח הגישה „{{name}}“. אי אפשר לבטל פעולה זו."
            },
            failedToDelete: "מחיקת מפתח הגישה נכשלה.",
            successfullyDeleted: "מפתח הגישה נמחק בהצלחה.",
            addPasskey: "הוספת מפתח גישה",
            passkeyName: "שם (אופציונלי)",
            register: "רישום",
            registering: "נרשם...",
            cancel: "ביטול",
            unknownAuthenticator: "מאמת לא ידוע",
            createdAt: "נוצר: ",
            delete: "מחיקה",
            deleting: "נמחק...",
            notFound: "לא נמצאו מפתחות גישה רשומים."
        },
        managementField: {
            passkey: "מפתח גישה",
            ownPasskeysOnly: "ניתן לנהל רק את מפתחות הגישה שלך.",
            preparingManagement: "מכין את ניהול מפתחות הגישה...",
            failedToManage: "לא ניתן להתחיל את ניהול מפתחות הגישה. יש להתחבר שוב."
        }
    }
} as const satisfies CustomTranslationsObject;

export { he };
