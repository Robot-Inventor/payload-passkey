import type { CustomTranslationsObject } from "./customTranslations";

const zh = {
    passkeyPlugin: {
        loginButton: {
            or: "或",
            failedToLogin: "无法使用通行密钥登录。",
            notAllowed: "通行密钥操作已取消或不允许执行。",
            loginWithPasskey: "使用通行密钥登录"
        },
        managementClient: {
            failedToLoad: "无法加载通行密钥。",
            failedToRegister: "无法注册通行密钥。",
            successfullyRegistered: "通行密钥注册成功。",
            notAllowed: "通行密钥操作已取消或不允许执行。",
            alreadyRegistered: "此通行密钥已注册。",
            confirmDelete: {
                heading: "确认删除",
                body: "您即将删除 通行密钥 {{name}}。您确定要继续吗？"
            },
            failedToDelete: "无法删除通行密钥。",
            successfullyDeleted: "通行密钥删除成功。",
            addPasskey: "添加 通行密钥",
            passkeyName: "名称（可选）",
            register: "注册",
            registering: "正在注册...",
            cancel: "取消",
            unknownAuthenticator: "未知的身份验证器",
            createdAt: "创建于：",
            delete: "删除",
            deleting: "删除中...",
            notFound: "未找到已注册的通行密钥。"
        },
        managementField: {
            passkey: "通行密钥",
            ownPasskeysOnly: "你只能管理自己的通行密钥。",
            preparingManagement: "正在准备通行密钥管理...",
            failedToManage: "无法开始通行密钥管理。请重新登入。",
            reauthenticationRequired: "为了您的安全，请重新登入以管理通行密钥。",
            reauthenticate: "重新登入"
        }
    }
} as const satisfies CustomTranslationsObject;

export { zh };
