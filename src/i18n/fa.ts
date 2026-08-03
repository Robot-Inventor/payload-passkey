import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const fa = {
    passkeyPlugin: {
        loginButton: {
            or: "یا",
            failedToLogin: "ورود با کلید دسترسی ناموفق بود.",
            notAllowed: "عملیات کلید دسترسی لغو شد یا مجاز نیست.",
            loginWithPasskey: "ورود با کلید دسترسی"
        },
        managementClient: {
            failedToLoad: "بارگیری کلیدهای دسترسی ناموفق بود.",
            failedToRegister: "ثبت کلید دسترسی ناموفق بود.",
            successfullyRegistered: "کلید دسترسی با موفقیت ثبت شد.",
            notAllowed: "ثبت کلید دسترسی لغو شد یا مجاز نیست.",
            alreadyRegistered: "این کلید دسترسی قبلاً ثبت شده است.",
            confirmDelete: {
                heading: "این کلید دسترسی حذف شود؟",
                body: "در حال حذف کلید دسترسی «{{name}}» هستید. این کار قابل بازگشت نیست."
            },
            failedToDelete: "حذف کلید دسترسی ناموفق بود.",
            successfullyDeleted: "کلید دسترسی با موفقیت حذف شد.",
            addPasskey: "افزودن کلید دسترسی",
            passkeyName: "نام (اختیاری)",
            register: "ثبت",
            registering: "در حال ثبت...",
            cancel: "لغو",
            unknownAuthenticator: "احرازکننده ناشناخته",
            createdAt: "ایجادشده در: ",
            delete: "حذف",
            deleting: "در حال حذف...",
            notFound: "کلید دسترسی ثبت‌شده‌ای پیدا نشد."
        },
        managementField: {
            passkey: "کلید دسترسی",
            ownPasskeysOnly: "فقط می‌توانید کلیدهای دسترسی خودتان را مدیریت کنید.",
            preparingManagement: "در حال آماده‌سازی مدیریت کلید دسترسی...",
            failedToManage: "شروع مدیریت کلید دسترسی ممکن نبود. دوباره وارد شوید."
        }
    }
} as const satisfies CustomTranslationsObject;

export { fa };
