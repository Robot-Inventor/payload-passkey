import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const ar = {
    passkeyPlugin: {
        loginButton: {
            or: "أو",
            failedToLogin: "تعذّر تسجيل الدخول باستخدام مفتاح مرور.",
            notAllowed: "تم إلغاء عملية مفتاح المرور أو لم يُسمح بها.",
            loginWithPasskey: "تسجيل الدخول باستخدام مفتاح مرور"
        },
        managementClient: {
            failedToLoad: "تعذّر تحميل مفاتيح المرور.",
            failedToRegister: "تعذّر تسجيل مفتاح المرور.",
            successfullyRegistered: "تم تسجيل مفتاح المرور بنجاح.",
            notAllowed: "تم إلغاء عملية تسجيل مفتاح المرور أو لم يُسمح بها.",
            alreadyRegistered: "مفتاح المرور هذا مسجّل بالفعل.",
            confirmDelete: {
                heading: "حذف مفتاح المرور هذا؟",
                body: "أنت على وشك حذف مفتاح المرور «{{name}}». لا يمكن التراجع عن هذا الإجراء."
            },
            failedToDelete: "تعذّر حذف مفتاح المرور.",
            successfullyDeleted: "تم حذف مفتاح المرور بنجاح.",
            addPasskey: "إضافة مفتاح مرور",
            passkeyName: "الاسم (اختياري)",
            register: "تسجيل",
            registering: "جارٍ التسجيل...",
            cancel: "إلغاء",
            unknownAuthenticator: "موثِّق غير معروف",
            createdAt: "تاريخ الإنشاء: ",
            delete: "حذف",
            deleting: "جارٍ الحذف...",
            notFound: "لم يتم العثور على مفاتيح مرور مسجّلة."
        },
        managementField: {
            passkey: "مفتاح مرور",
            ownPasskeysOnly: "يمكنك إدارة مفاتيح المرور الخاصة بك فقط.",
            preparingManagement: "جارٍ تجهيز إدارة مفاتيح المرور...",
            failedToManage: "تعذّر بدء إدارة مفاتيح المرور. يُرجى تسجيل الدخول مرة أخرى."
        }
    }
} as const satisfies CustomTranslationsObject;

export { ar };
