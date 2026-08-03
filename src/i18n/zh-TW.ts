import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const zhTw = {
    passkeyPlugin: {
        loginButton: {
            or: "或",
            failedToLogin: "無法使用通行密鑰登入。",
            notAllowed: "通行密鑰作業已取消或不允許執行。",
            loginWithPasskey: "使用通行密鑰登入"
        },
        managementClient: {
            failedToLoad: "無法載入通行密鑰。",
            failedToRegister: "無法註冊通行密鑰。",
            successfullyRegistered: "通行密鑰註冊成功。",
            notAllowed: "通行密鑰註冊已取消或不允許執行。",
            alreadyRegistered: "此通行密鑰已註冊。",
            confirmDelete: {
                heading: "要刪除此通行密鑰嗎？",
                body: "您即將刪除通行密鑰「{{name}}」。此動作無法復原。"
            },
            failedToDelete: "無法刪除通行密鑰。",
            successfullyDeleted: "通行密鑰刪除成功。",
            addPasskey: "新增通行密鑰",
            passkeyName: "名稱（選用）",
            register: "註冊",
            registering: "正在註冊...",
            cancel: "取消",
            unknownAuthenticator: "未知的驗證器",
            createdAt: "建立時間：",
            delete: "刪除",
            deleting: "正在刪除...",
            notFound: "找不到已註冊的通行密鑰。"
        },
        managementField: {
            passkey: "通行密鑰",
            ownPasskeysOnly: "您只能管理自己的通行密鑰。",
            preparingManagement: "正在準備通行密鑰管理...",
            failedToManage: "無法開始通行密鑰管理。請重新登入。"
        }
    }
} as const satisfies CustomTranslationsObject;

export { zhTw };
