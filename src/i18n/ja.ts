import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const ja = {
    passkeyPlugin: {
        loginButton: {
            or: "または",
            failedToLogin: "パスキーでのログインに失敗しました。",
            notAllowed: "パスキーでの認証がキャンセルされたか許可されていません。",
            loginWithPasskey: "パスキーでログイン"
        },
        managementClient: {
            failedToLoad: "パスキーの読み込みに失敗しました。",
            failedToRegister: "パスキーの登録に失敗しました。",
            successfullyRegistered: "パスキーの登録に成功しました。",
            notAllowed: "パスキーの登録がキャンセルされたか許可されていません。",
            alreadyRegistered: "このパスキーはすでに登録されています。",
            confirmDelete: {
                heading: "パスキーを削除しますか？",
                body: "パスキー「{{name}}」を削除しようとしています。この操作は取り消せません。"
            },
            failedToDelete: "パスキーの削除に失敗しました。",
            successfullyDeleted: "パスキーの削除に成功しました。",
            addPasskey: "パスキーを追加",
            passkeyName: "名前（省略可）",
            register: "登録",
            registering: "登録中...",
            cancel: "キャンセル",
            unknownAuthenticator: "不明な認証アプリ",
            createdAt: "作成日：",
            delete: "削除",
            deleting: "削除中...",
            notFound: "登録されたパスキーが見つかりませんでした。"
        },
        managementField: {
            passkey: "パスキー",
            ownPasskeysOnly: "自分自身のパスキーのみ管理できます。",
            preparingManagement: "パスキー管理を準備しています…",
            failedToManage: "パスキー管理を開始できませんでした。再ログインしてください。",
            reauthenticationRequired: "パスキーを管理するには、セキュリティ保護のため再ログインしてください。",
            reauthenticate: "再ログイン"
        }
    }
} as const satisfies CustomTranslationsObject;

export { ja };
