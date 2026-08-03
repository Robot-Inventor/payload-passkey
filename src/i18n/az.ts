import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const az = {
    passkeyPlugin: {
        loginButton: {
            or: "Və ya",
            failedToLogin: "Keçid açarı ilə daxil olmaq mümkün olmadı.",
            notAllowed: "Keçid açarı əməliyyatı ləğv edilib və ya icazə verilmir.",
            loginWithPasskey: "Keçid açarı ilə daxil olun"
        },
        managementClient: {
            failedToLoad: "Keçid açarlarını yükləmək mümkün olmadı.",
            failedToRegister: "Keçid açarını qeydiyyatdan keçirmək mümkün olmadı.",
            successfullyRegistered: "Keçid açarı uğurla qeydiyyatdan keçirildi.",
            notAllowed: "Keçid açarı əməliyyatı ləğv edilib və ya icazə verilmir.",
            alreadyRegistered: "Bu keçid açarı artıq qeydiyyatdan keçirilib.",
            confirmDelete: {
                heading: "Silməni təsdiqlə",
                body: "Siz keçid açarı {{name}} silməyə hazırsınız. Eminsiniz?"
            },
            failedToDelete: "Keçid açarını silmək mümkün olmadı.",
            successfullyDeleted: "Keçid açarı uğurla silindi.",
            addPasskey: "Keçid açarı əlavə et",
            passkeyName: "Ad (istəyə bağlı)",
            register: "Qeydiyyatdan keçirin",
            registering: "Qeydiyyatdan keçirilir...",
            cancel: "Ləğv et",
            unknownAuthenticator: "Naməlum autentifikator",
            createdAt: "Yaradıldığı tarix:",
            delete: "Sil",
            deleting: "Silinir...",
            notFound: "Qeydiyyatdan keçirilmiş keçid açarı tapılmadı."
        },
        managementField: {
            passkey: "Keçid açarı",
            ownPasskeysOnly: "Yalnız öz keçid açarlarınızı idarə edə bilərsiniz.",
            preparingManagement: "Keçid açarlarının idarə edilməsi hazırlanır...",
            failedToManage: "Keçid açarlarının idarə edilməsinə başlamaq mümkün olmadı. Yenidən daxil olun.",
            reauthenticationRequired: "Təhlükəsizliyiniz üçün keçid açarlarını idarə etmək məqsədilə yenidən daxil olun.",
            reauthenticate: "Yenidən daxil ol"
        }
    }
} as const satisfies CustomTranslationsObject;

export { az };
