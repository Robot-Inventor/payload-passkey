import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const id = {
    passkeyPlugin: {
        loginButton: {
            or: "Atau",
            failedToLogin: "Gagal masuk dengan kunci sandi.",
            notAllowed: "Operasi kunci sandi dibatalkan atau tidak diizinkan.",
            loginWithPasskey: "Masuk dengan kunci sandi"
        },
        managementClient: {
            failedToLoad: "Gagal memuat kunci sandi.",
            failedToRegister: "Gagal mendaftarkan kunci sandi.",
            successfullyRegistered: "Kunci sandi berhasil didaftarkan.",
            notAllowed: "Operasi kunci sandi dibatalkan atau tidak diizinkan.",
            alreadyRegistered: "Kunci sandi ini sudah terdaftar.",
            confirmDelete: {
                heading: "Konfirmasi penghapusan",
                body: "Anda akan menghapus kunci sandi {{name}}. Apakah Anda yakin?"
            },
            failedToDelete: "Gagal menghapus kunci sandi.",
            successfullyDeleted: "Kunci sandi berhasil dihapus.",
            addPasskey: "Tambah kunci sandi",
            passkeyName: "Nama (opsional)",
            register: "Daftarkan",
            registering: "Mendaftarkan...",
            cancel: "Batal",
            unknownAuthenticator: "Authenticator tidak dikenal",
            createdAt: "Dibuat Pada:",
            delete: "Hapus",
            deleting: "Menghapus...",
            notFound: "Tidak ditemukan kunci sandi yang terdaftar."
        },
        managementField: {
            passkey: "Kunci sandi",
            ownPasskeysOnly: "Anda hanya dapat mengelola kunci sandi milik Anda sendiri.",
            preparingManagement: "Menyiapkan pengelolaan kunci sandi...",
            failedToManage: "Tidak dapat memulai pengelolaan kunci sandi. Silakan masuk kembali.",
            reauthenticationRequired: "Demi keamanan Anda, silakan masuk kembali untuk mengelola kunci sandi.",
            reauthenticate: "Masuk kembali"
        }
    }
} as const satisfies CustomTranslationsObject;

export { id };
