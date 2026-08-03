import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const tr = {
    passkeyPlugin: {
        loginButton: {
            or: "Or",
            failedToLogin: "Geçiş anahtarıyla giriş yapılamadı.",
            notAllowed: "Geçiş anahtarı işlemi iptal edildi veya izin verilmiyor.",
            loginWithPasskey: "Geçiş anahtarıyla giriş yap"
        },
        managementClient: {
            failedToLoad: "Geçiş anahtarları yüklenemedi.",
            failedToRegister: "Geçiş anahtarı kaydedilemedi.",
            successfullyRegistered: "Geçiş anahtarı başarıyla kaydedildi.",
            notAllowed: "Geçiş anahtarı işlemi iptal edildi veya izin verilmiyor.",
            alreadyRegistered: "Bu geçiş anahtarı zaten kayıtlı.",
            confirmDelete: {
                heading: "Silmeyi onayla",
                body: "{{name}} geçiş anahtarı silinmek üzere. Silme işlemine devam etmek istiyor musunuz?"
            },
            failedToDelete: "Geçiş anahtarı silinemedi.",
            successfullyDeleted: "Geçiş anahtarı başarıyla silindi.",
            addPasskey: "Geçiş anahtarı ekle",
            passkeyName: "İsim (isteğe bağlı)",
            register: "Kaydet",
            registering: "Kaydediliyor...",
            cancel: "İptal",
            unknownAuthenticator: "Bilinmeyen kimlik doğrulayıcı",
            createdAt: "Oluşturma tarihi:",
            delete: "Sil",
            deleting: "Siliniyor...",
            notFound: "Kayıtlı geçiş anahtarı bulunamadı."
        },
        managementField: {
            passkey: "Geçiş anahtarı",
            ownPasskeysOnly: "Yalnızca kendi geçiş anahtarlarınızı yönetebilirsiniz.",
            preparingManagement: "Geçiş anahtarı yönetimi hazırlanıyor...",
            failedToManage: "Geçiş anahtarı yönetimi başlatılamadı. Lütfen tekrar giriş yapın.",
            reauthenticationRequired: "Güvenliğiniz için geçiş anahtarlarını yönetmek üzere tekrar giriş yapın.",
            reauthenticate: "Tekrar giriş yapın"
        }
    }
} as const satisfies CustomTranslationsObject;

export { tr };
