import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const bnIn = {
    passkeyPlugin: {
        loginButton: {
            or: "অথবা",
            failedToLogin: "পাসকি দিয়ে লগ ইন করা যায়নি।",
            notAllowed: "পাসকির কার্যক্রম বাতিল করা হয়েছে বা অনুমোদিত নয়।",
            loginWithPasskey: "পাসকি দিয়ে লগ ইন করুন"
        },
        managementClient: {
            failedToLoad: "পাসকিগুলো লোড করা যায়নি।",
            failedToRegister: "পাসকি নিবন্ধন করা যায়নি।",
            successfullyRegistered: "পাসকি সফলভাবে নিবন্ধিত হয়েছে।",
            notAllowed: "পাসকি নিবন্ধন বাতিল করা হয়েছে বা অনুমোদিত নয়।",
            alreadyRegistered: "এই পাসকিটি ইতিমধ্যে নিবন্ধিত হয়েছে।",
            confirmDelete: {
                heading: "এই পাসকিটি মুছে ফেলবেন?",
                body: "আপনি «{{name}}» পাসকিটি মুছে ফেলতে চলেছেন। এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।"
            },
            failedToDelete: "পাসকি মুছে ফেলা যায়নি।",
            successfullyDeleted: "পাসকি সফলভাবে মুছে ফেলা হয়েছে।",
            addPasskey: "পাসকি যোগ করুন",
            passkeyName: "নাম (ঐচ্ছিক)",
            register: "নিবন্ধন করুন",
            registering: "নিবন্ধন করা হচ্ছে...",
            cancel: "বাতিল",
            unknownAuthenticator: "অজানা প্রমাণীকরণকারী",
            createdAt: "তৈরি: ",
            delete: "মুছুন",
            deleting: "মুছে ফেলা হচ্ছে...",
            notFound: "কোনো নিবন্ধিত পাসকি পাওয়া যায়নি।"
        },
        managementField: {
            passkey: "পাসকি",
            ownPasskeysOnly: "আপনি শুধু নিজের পাসকিগুলো পরিচালনা করতে পারবেন।",
            preparingManagement: "পাসকি পরিচালনা প্রস্তুত করা হচ্ছে...",
            failedToManage: "পাসকি পরিচালনা শুরু করা যায়নি। আবার লগইন করুন।",
            reauthenticationRequired: "পাসকি পরিচালনা করতে আবার লগইন করুন।",
            reauthenticate: "আবার লগইন করুন"
        }
    }
} as const satisfies CustomTranslationsObject;

export { bnIn };
