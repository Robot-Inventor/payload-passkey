import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const pl = {
    passkeyPlugin: {
        loginButton: {
            or: "lub",
            failedToLogin: "Logowanie za pomocą klucza dostępu nie powiodło się.",
            notAllowed: "Operacja klucza dostępu została anulowana lub jest niedozwolona.",
            loginWithPasskey: "Zaloguj się za pomocą klucza dostępu"
        },
        managementClient: {
            failedToLoad: "Nie udało się załadować kluczy dostępu.",
            failedToRegister: "Nie udało się zarejestrować klucza dostępu.",
            successfullyRegistered: "Klucz dostępu został zarejestrowany.",
            notAllowed: "Rejestrowanie klucza dostępu zostało anulowane lub jest niedozwolone.",
            alreadyRegistered: "Ten klucz dostępu jest już zarejestrowany.",
            confirmDelete: {
                heading: "Usunąć ten klucz dostępu?",
                body: "Za chwilę usuniesz klucz dostępu „{{name}}”. Tej czynności nie można cofnąć."
            },
            failedToDelete: "Nie udało się usunąć klucza dostępu.",
            successfullyDeleted: "Klucz dostępu został usunięty.",
            addPasskey: "Dodaj klucz dostępu",
            passkeyName: "Nazwa (opcjonalnie)",
            register: "Zarejestruj",
            registering: "Rejestrowanie...",
            cancel: "Anuluj",
            unknownAuthenticator: "Nieznany uwierzytelniacz",
            createdAt: "Utworzono: ",
            delete: "Usuń",
            deleting: "Usuwanie...",
            notFound: "Nie znaleziono zarejestrowanych kluczy dostępu."
        },
        managementField: {
            passkey: "Klucz dostępu",
            ownPasskeysOnly: "Możesz zarządzać tylko własnymi kluczami dostępu.",
            preparingManagement: "Przygotowywanie zarządzania kluczami dostępu...",
            failedToManage: "Nie można rozpocząć zarządzania kluczami dostępu. Zaloguj się ponownie."
        }
    }
} as const satisfies CustomTranslationsObject;

export { pl };
