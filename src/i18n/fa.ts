import type { CustomTranslationsObject } from "./customTranslations";

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
            notAllowed: "عملیات کلید دسترسی لغو شد یا مجاز نیست.",
            alreadyRegistered: "این کلید دسترسی قبلاً ثبت شده است.",
            confirmDelete: {
                heading: "تأیید حذف",
                body: 'آیا از حذف کلید دسترسی "{{name}}" مطمئن هستید؟'
            },
            failedToDelete: "حذف کلید دسترسی ناموفق بود.",
            successfullyDeleted: "کلید دسترسی با موفقیت حذف شد.",
            addPasskey: "افزودن کلید دسترسی",
            passkeyName: "نام (اختیاری)",
            register: "ثبت",
            registering: "در حال ثبت...",
            cancel: "انصراف",
            unknownAuthenticator: "احرازکننده ناشناخته",
            createdAt: "تاریخ ایجاد:",
            delete: "حذف",
            deleting: "در حال حذف...",
            notFound: "کلید دسترسی ثبت‌شده‌ای پیدا نشد."
        },
        managementField: {
            passkey: "کلید دسترسی",
            ownPasskeysOnly: "فقط می‌توانید کلیدهای دسترسی خودتان را مدیریت کنید.",
            preparingManagement: "در حال آماده‌سازی مدیریت کلید دسترسی...",
            failedToManage: "شروع مدیریت کلید دسترسی ممکن نبود. دوباره وارد شوید.",
            reauthenticationRequired: "برای امنیت، لطفاً برای مدیریت کلیدهای دسترسی دوباره وارد شوید.",
            reauthenticate: "دوباره وارد شوید"
        }
    }
} as const satisfies CustomTranslationsObject;

export { fa };
