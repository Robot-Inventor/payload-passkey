import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const my = {
    passkeyPlugin: {
        loginButton: {
            or: "သို့မဟုတ်",
            failedToLogin: "Passkey ဖြင့် လော့ဂ်အင်ဝင်ရန် မအောင်မြင်ပါ။",
            notAllowed: "Passkey လုပ်ဆောင်မှုကို ပယ်ဖျက်လိုက်သည် သို့မဟုတ် ခွင့်မပြုပါ။",
            loginWithPasskey: "Passkey ဖြင့် လော့ဂ်အင်ဝင်ရန်"
        },
        managementClient: {
            failedToLoad: "Passkey များကို ဖွင့်မရပါ။",
            failedToRegister: "Passkey ကို မှတ်ပုံတင်မရပါ။",
            successfullyRegistered: "Passkey မှတ်ပုံတင်ပြီးပါပြီ။",
            notAllowed: "Passkey လုပ်ဆောင်မှုကို ပယ်ဖျက်လိုက်သည် သို့မဟုတ် ခွင့်မပြုပါ။",
            alreadyRegistered: "ဤ Passkey ကို မှတ်ပုံတင်ပြီးဖြစ်သည်။",
            confirmDelete: {
                heading: "ဖျက်တော့မယ်နော်။",
                body: "Passkey {{name}} ကို ဖျက်ပါတော့မည်။ သေချာပြီလား။ ဖျက်ပြီးရင် ပြန်မရဘူးနော်။"
            },
            failedToDelete: "Passkey ဖျက်မရပါ။",
            successfullyDeleted: "Passkey ဖျက်ပြီးပါပြီ။",
            addPasskey: "Passkey ထည့်သွင်းမည်။",
            passkeyName: "နာမည် (ရွေးချယ်နိုင်သည်)",
            register: "မှတ်ပုံတင်ရန်",
            registering: "မှတ်ပုံတင်နေသည်...",
            cancel: "မလုပ်တော့ပါ။",
            unknownAuthenticator: "မသိသော အထောက်အထားစစ်ဆေးကိရိယာ",
            createdAt: "ဖန်တီးခဲ့သည့်အချိန်:",
            delete: "ဖျက်မည်။",
            deleting: "ဖျက်နေဆဲ ...",
            notFound: "မှတ်ပုံတင်ထားသော Passkey မတွေ့ပါ။"
        },
        managementField: {
            passkey: "Passkey",
            ownPasskeysOnly: "မိမိ၏ Passkey များကိုသာ စီမံနိုင်ပါသည်။",
            preparingManagement: "Passkey စီမံခန့်ခွဲမှုကို ပြင်ဆင်နေသည်...",
            failedToManage: "Passkey စီမံခန့်ခွဲမှုကို စတင်၍ မရပါ။ အကောင့်ထဲ ပြန်ဝင်မည်။",
            reauthenticationRequired: "သင့်အကောင့် လုံခြုံရေးအတွက် Passkey များကို စီမံရန် အကောင့်ထဲ ပြန်ဝင်မည်။",
            reauthenticate: "အကောင့်ထဲ ပြန်ဝင်မည်။"
        }
    }
} as const satisfies CustomTranslationsObject;

export { my };
