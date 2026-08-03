import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const ta = {
    passkeyPlugin: {
        loginButton: {
            or: "அல்லது",
            failedToLogin: "பாஸ்கீ மூலம் உள்நுழைய முடியவில்லை.",
            notAllowed: "பாஸ்கீ செயல்பாடு ரத்துசெய்யப்பட்டது அல்லது அனுமதிக்கப்படவில்லை.",
            loginWithPasskey: "பாஸ்கீ மூலம் உள்நுழைக"
        },
        managementClient: {
            failedToLoad: "பாஸ்கிகளை ஏற்ற முடியவில்லை.",
            failedToRegister: "பாஸ்கீயைப் பதிவுசெய்ய முடியவில்லை.",
            successfullyRegistered: "பாஸ்கீ வெற்றிகரமாகப் பதிவுசெய்யப்பட்டது.",
            notAllowed: "பாஸ்கீ பதிவு ரத்துசெய்யப்பட்டது அல்லது அனுமதிக்கப்படவில்லை.",
            alreadyRegistered: "இந்தப் பாஸ்கீ ஏற்கனவே பதிவுசெய்யப்பட்டுள்ளது.",
            confirmDelete: {
                heading: "இந்தப் பாஸ்கீயை நீக்கவா?",
                body: "“{{name}}” பாஸ்கீயை நீக்க உள்ளீர்கள். இந்தச் செயலைச் செயல்தவிர்க்க முடியாது."
            },
            failedToDelete: "பாஸ்கீயை நீக்க முடியவில்லை.",
            successfullyDeleted: "பாஸ்கீ வெற்றிகரமாக நீக்கப்பட்டது.",
            addPasskey: "பாஸ்கீயைச் சேர்",
            passkeyName: "பெயர் (விருப்பத்தேர்வு)",
            register: "பதிவுசெய்",
            registering: "பதிவுசெய்கிறது...",
            cancel: "ரத்துசெய்",
            unknownAuthenticator: "தெரியாத அங்கீகரிப்பு சாதனம்",
            createdAt: "உருவாக்கப்பட்டது: ",
            delete: "நீக்கு",
            deleting: "நீக்குகிறது...",
            notFound: "பதிவுசெய்யப்பட்ட பாஸ்கிகள் எதுவும் இல்லை."
        },
        managementField: {
            passkey: "பாஸ்கீ",
            ownPasskeysOnly: "உங்கள் சொந்த பாஸ்கிகளை மட்டுமே நிர்வகிக்க முடியும்.",
            preparingManagement: "பாஸ்கீ நிர்வாகம் தயாராகிறது...",
            failedToManage: "பாஸ்கீ நிர்வாகத்தைத் தொடங்க முடியவில்லை. மீண்டும் உள்நுழையவும்."
        }
    }
} as const satisfies CustomTranslationsObject;

export { ta };
