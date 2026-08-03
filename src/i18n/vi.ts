import type { CustomTranslationsObject } from "./passkeyCustomTranslations.js";

const vi = {
    passkeyPlugin: {
        loginButton: {
            or: "hoặc",
            failedToLogin: "Không thể đăng nhập bằng passkey.",
            notAllowed: "Thao tác passkey đã bị hủy hoặc không được phép.",
            loginWithPasskey: "Đăng nhập bằng passkey"
        },
        managementClient: {
            failedToLoad: "Không thể tải passkey.",
            failedToRegister: "Không thể đăng ký passkey.",
            successfullyRegistered: "Đã đăng ký passkey thành công.",
            notAllowed: "Thao tác passkey đã bị hủy hoặc không được phép.",
            alreadyRegistered: "Passkey này đã được đăng ký.",
            confirmDelete: {
                heading: "Xác nhận xóa",
                body: "Chuẩn bị xóa passkey {{name}}. Bạn có muốn tiếp tục không?"
            },
            failedToDelete: "Không thể xóa passkey.",
            successfullyDeleted: "Đã xóa passkey thành công.",
            addPasskey: "Thêm: passkey",
            passkeyName: "Tên (tùy chọn)",
            register: "Đăng ký",
            registering: "Đang đăng ký...",
            cancel: "Hủy",
            unknownAuthenticator: "Trình xác thực không xác định",
            createdAt: "Ngày tạo:",
            delete: "Xóa",
            deleting: "Đang xóa...",
            notFound: "Không tìm thấy passkey nào đã đăng ký."
        },
        managementField: {
            passkey: "Passkey",
            ownPasskeysOnly: "Bạn chỉ có thể quản lý passkey của chính mình.",
            preparingManagement: "Đang chuẩn bị quản lý passkey...",
            failedToManage: "Không thể bắt đầu quản lý passkey. Vui lòng đăng nhập lại.",
            reauthenticationRequired: "Vì lý do bảo mật, vui lòng đăng nhập lại để quản lý passkey.",
            reauthenticate: "Đăng nhập lại"
        }
    }
} as const satisfies CustomTranslationsObject;

export { vi };
