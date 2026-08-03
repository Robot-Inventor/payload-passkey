import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const az = {
    passkeyPlugin: {
        loginButton: {
            or: "və ya",
            failedToLogin: "Keçid açarı ilə daxil olmaq mümkün olmadı.",
            notAllowed: "Keçid açarı əməliyyatı ləğv edilib və ya icazə verilmir.",
            loginWithPasskey: "Keçid açarı ilə daxil olun"
        },
        managementClient: {
            failedToLoad: "Keçid açarlarını yükləmək mümkün olmadı.",
            failedToRegister: "Keçid açarını qeydiyyatdan keçirmək mümkün olmadı.",
            successfullyRegistered: "Keçid açarı uğurla qeydiyyatdan keçirildi.",
            notAllowed: "Keçid açarının qeydiyyatı ləğv edilib və ya icazə verilmir.",
            alreadyRegistered: "Bu keçid açarı artıq qeydiyyatdan keçirilib.",
            confirmDelete: {
                heading: "Bu keçid açarı silinsin?",
                body: "«{{name}}» keçid açarını silmək üzrəsiniz. Bu əməliyyat geri qaytarıla bilməz."
            },
            failedToDelete: "Keçid açarını silmək mümkün olmadı.",
            successfullyDeleted: "Keçid açarı uğurla silindi.",
            addPasskey: "Keçid açarı əlavə edin",
            passkeyName: "Ad (istəyə bağlı)",
            register: "Qeydiyyatdan keçirin",
            registering: "Qeydiyyatdan keçirilir...",
            cancel: "Ləğv edin",
            unknownAuthenticator: "Naməlum autentifikator",
            createdAt: "Yaradılma tarixi: ",
            delete: "Silin",
            deleting: "Silinir...",
            notFound: "Qeydiyyatdan keçirilmiş keçid açarı tapılmadı."
        },
        managementField: {
            passkey: "Keçid açarı",
            ownPasskeysOnly: "Yalnız öz keçid açarlarınızı idarə edə bilərsiniz.",
            preparingManagement: "Keçid açarlarının idarə edilməsi hazırlanır...",
            failedToManage: "Keçid açarlarının idarə edilməsinə başlamaq mümkün olmadı. Yenidən daxil olun.",
            reauthenticationRequired: "Keçid açarlarını idarə etmək üçün yenidən daxil olun.",
            reauthenticate: "Yenidən daxil ol"
        }
    }
} as const satisfies CustomTranslationsObject;

export { az };
