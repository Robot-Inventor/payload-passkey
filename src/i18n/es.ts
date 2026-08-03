import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const es = {
    passkeyPlugin: {
        loginButton: {
            or: "o",
            failedToLogin: "No se ha podido iniciar sesión con una clave de acceso.",
            notAllowed: "La operación de la clave de acceso se canceló o no está permitida.",
            loginWithPasskey: "Iniciar sesión con una clave de acceso"
        },
        managementClient: {
            failedToLoad: "No se han podido cargar las claves de acceso.",
            failedToRegister: "No se ha podido registrar la clave de acceso.",
            successfullyRegistered: "La clave de acceso se ha registrado correctamente.",
            notAllowed: "El registro de la clave de acceso se canceló o no está permitido.",
            alreadyRegistered: "Esta clave de acceso ya está registrada.",
            confirmDelete: {
                heading: "¿Eliminar esta clave de acceso?",
                body: "Estás a punto de eliminar la clave de acceso «{{name}}». Esta acción no se puede deshacer."
            },
            failedToDelete: "No se ha podido eliminar la clave de acceso.",
            successfullyDeleted: "La clave de acceso se ha eliminado correctamente.",
            addPasskey: "Añadir una clave de acceso",
            passkeyName: "Nombre (opcional)",
            register: "Registrar",
            registering: "Registrando...",
            cancel: "Cancelar",
            unknownAuthenticator: "Autenticador desconocido",
            createdAt: "Creada: ",
            delete: "Eliminar",
            deleting: "Eliminando...",
            notFound: "No se han encontrado claves de acceso registradas."
        },
        managementField: {
            passkey: "Clave de acceso",
            ownPasskeysOnly: "Solo puedes administrar tus propias claves de acceso.",
            preparingManagement: "Preparando la administración de claves de acceso...",
            failedToManage: "No se ha podido iniciar la administración de claves de acceso. Vuelve a iniciar sesión."
        }
    }
} as const satisfies CustomTranslationsObject;

export { es };
