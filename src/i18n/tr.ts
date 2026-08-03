import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const tr = {
    passkeyPlugin: {
        loginButton: {
            or: "veya",
            failedToLogin: "Geçiş anahtarıyla oturum açılamadı.",
            notAllowed: "Geçiş anahtarı işlemi iptal edildi veya izin verilmiyor.",
            loginWithPasskey: "Geçiş anahtarıyla oturum aç"
        },
        managementClient: {
            failedToLoad: "Geçiş anahtarları yüklenemedi.",
            failedToRegister: "Geçiş anahtarı kaydedilemedi.",
            successfullyRegistered: "Geçiş anahtarı başarıyla kaydedildi.",
            notAllowed: "Geçiş anahtarının kaydedilmesi iptal edildi veya izin verilmiyor.",
            alreadyRegistered: "Bu geçiş anahtarı zaten kayıtlı.",
            confirmDelete: {
                heading: "Bu geçiş anahtarı silinsin mi?",
                body: "“{{name}}” geçiş anahtarını silmek üzeresiniz. Bu işlem geri alınamaz."
            },
            failedToDelete: "Geçiş anahtarı silinemedi.",
            successfullyDeleted: "Geçiş anahtarı başarıyla silindi.",
            addPasskey: "Geçiş anahtarı ekle",
            passkeyName: "Ad (isteğe bağlı)",
            register: "Kaydet",
            registering: "Kaydediliyor...",
            cancel: "İptal",
            unknownAuthenticator: "Bilinmeyen kimlik doğrulayıcı",
            createdAt: "Oluşturulma: ",
            delete: "Sil",
            deleting: "Siliniyor...",
            notFound: "Kayıtlı geçiş anahtarı bulunamadı."
        },
        managementField: {
            passkey: "Geçiş anahtarı",
            ownPasskeysOnly: "Yalnızca kendi geçiş anahtarlarınızı yönetebilirsiniz.",
            preparingManagement: "Geçiş anahtarı yönetimi hazırlanıyor...",
            failedToManage: "Geçiş anahtarı yönetimi başlatılamadı. Lütfen tekrar giriş yapın.",
            reauthenticationRequired: "Geçiş anahtarlarını yönetmek için tekrar giriş yapın.",
            reauthenticate: "Tekrar giriş yapın"
        },
        logoutButton: {
            failedToLogoutWithMessage: "Oturum kapatılamadı: {{message}}",
            failedToLogout: "Oturum kapatılamadı.",
            logout: "Oturumu kapat"
        }
    }
} as const satisfies CustomTranslationsObject;

export { tr };
