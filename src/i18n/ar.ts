import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

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
            notAllowed: "تم إلغاء عملية مفتاح المرور أو لم يُسمح بها.",
            alreadyRegistered: "مفتاح المرور هذا مسجّل بالفعل.",
            confirmDelete: {
                heading: "تأكيد الحذف",
                body: "أنت على وشك حذف مفتاح مرور {{name}}. هل أنت متأكّد؟"
            },
            failedToDelete: "تعذّر حذف مفتاح المرور.",
            successfullyDeleted: "تم حذف مفتاح المرور بنجاح.",
            addPasskey: "أضف مفتاح مرور",
            passkeyName: "اسم (اختياري)",
            register: "تسجيل",
            registering: "جارٍ التسجيل...",
            cancel: "إلغاء",
            unknownAuthenticator: "موثِّق غير معروف",
            createdAt: "تمّ الإنشاء في:",
            delete: "حذف",
            deleting: "يتمّ الحذف...",
            notFound: "لم يتم العثور على مفاتيح مرور مسجّلة."
        },
        managementField: {
            passkey: "مفتاح مرور",
            ownPasskeysOnly: "يمكنك إدارة مفاتيح المرور الخاصة بك فقط.",
            preparingManagement: "جارٍ تجهيز إدارة مفاتيح المرور...",
            failedToManage: "تعذّر بدء إدارة مفاتيح المرور. يُرجى تسجيل الدّخول من جديد.",
            reauthenticationRequired: "من أجل أمنك، يُرجى تسجيل الدّخول من جديد لإدارة مفاتيح المرور.",
            reauthenticate: "تسجيل الدّخول من جديد"
        }
    }
} as const satisfies CustomTranslationsObject;

export { ar };
