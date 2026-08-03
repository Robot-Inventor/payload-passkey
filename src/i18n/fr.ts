import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const fr = {
    passkeyPlugin: {
        loginButton: {
            or: "ou",
            failedToLogin: "Échec de la connexion avec une clé d’accès.",
            notAllowed: "L’opération de la clé d’accès a été annulée ou n’est pas autorisée.",
            loginWithPasskey: "Se connecter avec une clé d’accès"
        },
        managementClient: {
            failedToLoad: "Échec du chargement des clés d’accès.",
            failedToRegister: "Échec de l’enregistrement de la clé d’accès.",
            successfullyRegistered: "Clé d’accès enregistrée avec succès.",
            notAllowed: "L’opération de la clé d’accès a été annulée ou n’est pas autorisée.",
            alreadyRegistered: "Cette clé d’accès est déjà enregistrée.",
            confirmDelete: {
                heading: "Confirmer la suppression",
                body: "Vous êtes sur le point de supprimer ce ou cette clé d’accès {{name}}. Êtes-vous sûr ?"
            },
            failedToDelete: "Échec de la suppression de la clé d’accès.",
            successfullyDeleted: "Clé d’accès supprimée avec succès.",
            addPasskey: "Ajouter clé d’accès",
            passkeyName: "Nom (facultatif)",
            register: "Enregistrer",
            registering: "Enregistrement...",
            cancel: "Annuler",
            unknownAuthenticator: "Authentificateur inconnu",
            createdAt: "Créé(e) à:",
            delete: "Supprimer",
            deleting: "Suppression en cours...",
            notFound: "Aucune clé d’accès enregistrée trouvée."
        },
        managementField: {
            passkey: "Clé d’accès",
            ownPasskeysOnly: "Vous pouvez uniquement gérer vos propres clés d’accès.",
            preparingManagement: "Préparation de la gestion des clés d’accès...",
            failedToManage: "Impossible de démarrer la gestion des clés d’accès. Veuillez vous reconnecter.",
            reauthenticationRequired:
                "Pour votre propre sécurité, veuillez vous reconnecter pour gérer les clés d’accès.",
            reauthenticate: "Se reconnecter"
        }
    }
} as const satisfies CustomTranslationsObject;

export { fr };
