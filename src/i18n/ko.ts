import type { CustomTranslationsObject } from "./passkeyCustomTranslations";

const ko = {
    passkeyPlugin: {
        loginButton: {
            or: "또는",
            failedToLogin: "패스키로 로그인하지 못했습니다.",
            notAllowed: "패스키 작업이 취소되었거나 허용되지 않습니다.",
            loginWithPasskey: "패스키로 로그인"
        },
        managementClient: {
            failedToLoad: "패스키를 불러오지 못했습니다.",
            failedToRegister: "패스키를 등록하지 못했습니다.",
            successfullyRegistered: "패스키가 성공적으로 등록되었습니다.",
            notAllowed: "패스키 작업이 취소되었거나 허용되지 않습니다.",
            alreadyRegistered: "이 패스키는 이미 등록되어 있습니다.",
            confirmDelete: {
                heading: "삭제하시겠습니까?",
                body: "패스키 {{name}}를 삭제하려고 합니다. 계속하시겠습니까?"
            },
            failedToDelete: "패스키를 삭제하지 못했습니다.",
            successfullyDeleted: "패스키가 성공적으로 삭제되었습니다.",
            addPasskey: "패스키 추가",
            passkeyName: "이름(선택 사항)",
            register: "등록",
            registering: "등록 중...",
            cancel: "취소",
            unknownAuthenticator: "알 수 없는 인증자",
            createdAt: "생성 일시:",
            delete: "삭제",
            deleting: "삭제 중...",
            notFound: "등록된 패스키를 찾을 수 없습니다."
        },
        managementField: {
            passkey: "패스키",
            ownPasskeysOnly: "자신의 패스키만 관리할 수 있습니다.",
            preparingManagement: "패스키 관리 준비 중...",
            failedToManage: "패스키 관리를 시작할 수 없습니다. 다시 로그인하세요.",
            reauthenticationRequired: "보안을 위해 패스키를 관리하려면 다시 로그인하세요.",
            reauthenticate: "다시 로그인"
        }
    }
} as const satisfies CustomTranslationsObject;

export { ko };
