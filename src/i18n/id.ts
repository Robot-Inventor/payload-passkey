import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const id = {
    passkeyPlugin: {
        loginButton: {
            or: "atau",
            failedToLogin: "Gagal masuk dengan kunci sandi.",
            notAllowed: "Operasi kunci sandi dibatalkan atau tidak diizinkan.",
            loginWithPasskey: "Masuk dengan kunci sandi"
        },
        managementClient: {
            failedToLoad: "Gagal memuat kunci sandi.",
            failedToRegister: "Gagal mendaftarkan kunci sandi.",
            successfullyRegistered: "Kunci sandi berhasil didaftarkan.",
            notAllowed: "Pendaftaran kunci sandi dibatalkan atau tidak diizinkan.",
            alreadyRegistered: "Kunci sandi ini sudah terdaftar.",
            confirmDelete: {
                heading: "Hapus kunci sandi ini?",
                body: "Anda akan menghapus kunci sandi “{{name}}”. Tindakan ini tidak dapat dibatalkan."
            },
            failedToDelete: "Gagal menghapus kunci sandi.",
            successfullyDeleted: "Kunci sandi berhasil dihapus.",
            addPasskey: "Tambahkan kunci sandi",
            passkeyName: "Nama (opsional)",
            register: "Daftarkan",
            registering: "Mendaftarkan...",
            cancel: "Batal",
            unknownAuthenticator: "Authenticator tidak dikenal",
            createdAt: "Dibuat: ",
            delete: "Hapus",
            deleting: "Menghapus...",
            notFound: "Tidak ditemukan kunci sandi yang terdaftar."
        },
        managementField: {
            passkey: "Kunci sandi",
            ownPasskeysOnly: "Anda hanya dapat mengelola kunci sandi milik Anda sendiri.",
            preparingManagement: "Menyiapkan pengelolaan kunci sandi...",
            failedToManage: "Tidak dapat memulai pengelolaan kunci sandi. Silakan masuk kembali.",
            reauthenticationRequired: "Silakan masuk kembali untuk mengelola kunci sandi.",
            reauthenticate: "Masuk kembali"
        }
    }
} as const satisfies CustomTranslationsObject;

export { id };
