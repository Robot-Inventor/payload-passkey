import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const th = {
    passkeyPlugin: {
        loginButton: {
            or: "หรือ",
            failedToLogin: "เข้าสู่ระบบด้วยพาสคีย์ไม่สำเร็จ",
            notAllowed: "การดำเนินการพาสคีย์ถูกยกเลิกหรือไม่ได้รับอนุญาต",
            loginWithPasskey: "เข้าสู่ระบบด้วยพาสคีย์"
        },
        managementClient: {
            failedToLoad: "โหลดพาสคีย์ไม่สำเร็จ",
            failedToRegister: "ลงทะเบียนพาสคีย์ไม่สำเร็จ",
            successfullyRegistered: "ลงทะเบียนพาสคีย์เรียบร้อยแล้ว",
            notAllowed: "การดำเนินการพาสคีย์ถูกยกเลิกหรือไม่ได้รับอนุญาต",
            alreadyRegistered: "พาสคีย์นี้ลงทะเบียนไว้แล้ว",
            confirmDelete: {
                heading: "ยืนยันการลบ",
                body: "คุณกำลังจะลบ พาสคีย์ {{name}} ต้องการดำเนินการต่อหรือไม่?"
            },
            failedToDelete: "ลบพาสคีย์ไม่สำเร็จ",
            successfullyDeleted: "ลบพาสคีย์เรียบร้อยแล้ว",
            addPasskey: "เพิ่ม พาสคีย์",
            passkeyName: "ชื่อ (ไม่บังคับ)",
            register: "ลงทะเบียน",
            registering: "กำลังลงทะเบียน...",
            cancel: "ยกเลิก",
            unknownAuthenticator: "ตัวตรวจสอบสิทธิ์ที่ไม่รู้จัก",
            createdAt: "สร้างเมื่อ:",
            delete: "ลบ",
            deleting: "กำลังลบ...",
            notFound: "ไม่พบพาสคีย์ที่ลงทะเบียนไว้"
        },
        managementField: {
            passkey: "พาสคีย์",
            ownPasskeysOnly: "คุณจัดการได้เฉพาะพาสคีย์ของคุณเองเท่านั้น",
            preparingManagement: "กำลังเตรียมการจัดการพาสคีย์...",
            failedToManage: "เริ่มการจัดการพาสคีย์ไม่ได้ โปรดเข้าสู่ระบบอีกครั้ง",
            reauthenticationRequired: "เพื่อความปลอดภัย โปรดเข้าสู่ระบบอีกครั้งเพื่อจัดการพาสคีย์",
            reauthenticate: "เข้าสู่ระบบอีกครั้ง"
        }
    }
} as const satisfies CustomTranslationsObject;

export { th };
