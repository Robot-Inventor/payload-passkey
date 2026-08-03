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
            notAllowed: "Operacja klucza dostępu została anulowana lub jest niedozwolona.",
            alreadyRegistered: "Ten klucz dostępu jest już zarejestrowany.",
            confirmDelete: {
                heading: "Potwierdź usunięcie",
                body: "Zamierzasz usunąć klucz dostępu {{name}}. Jesteś pewien?"
            },
            failedToDelete: "Nie udało się usunąć klucza dostępu.",
            successfullyDeleted: "Klucz dostępu został usunięty.",
            addPasskey: "Dodaj klucz dostępu",
            passkeyName: "Nazwa (opcjonalnie)",
            register: "Zarejestruj",
            registering: "Rejestrowanie...",
            cancel: "Anuluj",
            unknownAuthenticator: "Nieznany uwierzytelniacz",
            createdAt: "Data utworzenia:",
            delete: "Usuń",
            deleting: "Usuwanie...",
            notFound: "Nie znaleziono zarejestrowanych kluczy dostępu."
        },
        managementField: {
            passkey: "Klucz dostępu",
            ownPasskeysOnly: "Możesz zarządzać tylko własnymi kluczami dostępu.",
            preparingManagement: "Przygotowywanie zarządzania kluczami dostępu...",
            failedToManage: "Nie można rozpocząć zarządzania kluczami dostępu. Zaloguj się ponownie.",
            reauthenticationRequired:
                "Dla własnego bezpieczeństwa zaloguj się ponownie, aby zarządzać kluczami dostępu.",
            reauthenticate: "Zaloguj się ponownie"
        }
    }
} as const satisfies CustomTranslationsObject;

export { pl };
