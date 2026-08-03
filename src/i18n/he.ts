import type { CustomTranslationsObject } from "./customTranslations";

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
            notAllowed: "פעולת מפתח הגישה בוטלה או אינה מורשית.",
            alreadyRegistered: "מפתח גישה זה כבר רשום.",
            confirmDelete: {
                heading: "אישור מחיקה",
                body: "אתה עומד למחוק את מפתח גישה {{name}}. האם אתה בטוח?"
            },
            failedToDelete: "מחיקת מפתח הגישה נכשלה.",
            successfullyDeleted: "מפתח הגישה נמחק בהצלחה.",
            addPasskey: "הוסף מפתח גישה",
            passkeyName: "שם (אופציונלי)",
            register: "רישום",
            registering: "נרשם...",
            cancel: "ביטול",
            unknownAuthenticator: "מאמת לא ידוע",
            createdAt: "נוצר בתאריך:",
            delete: "מחיקה",
            deleting: "מוחק...",
            notFound: "לא נמצאו מפתחות גישה רשומים."
        },
        managementField: {
            passkey: "מפתח גישה",
            ownPasskeysOnly: "ניתן לנהל רק את מפתחות הגישה שלך.",
            preparingManagement: "מכין את ניהול מפתחות הגישה...",
            failedToManage: "לא ניתן להתחיל את ניהול מפתחות הגישה. יש להתחבר שוב.",
            reauthenticationRequired: "כדי לשמור על אבטחת חשבונך, יש להתחבר שוב כדי לנהל מפתחות גישה.",
            reauthenticate: "התחברות מחדש"
        }
    }
} as const satisfies CustomTranslationsObject;

export { he };
