import type { ChangeEvent, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

interface FieldResponse {
    data: unknown;
    error: unknown;
}

interface FieldTestState {
    addPasskeyResponse: FieldResponse;
    bridge: Error | FieldResponse;
    logoutError: Error | null;
    pushedPath: string | null;
}

// eslint-disable-next-line max-lines-per-function
const mocks = vi.hoisted(() => {
    const state: FieldTestState = {
        addPasskeyResponse: {
            data: {},
            error: null
        },
        bridge: {
            data: null,
            error: null
        },
        logoutError: null,
        pushedPath: null
    };

    const showToast = (message: string): void => {
        const notification = document.createElement("div");
        notification.setAttribute("role", "alert");
        notification.textContent = message;
        document.body.append(notification);
    };

    const clearToasts = (): void => {
        document.querySelectorAll('[role="alert"]').forEach((notification) => {
            notification.remove();
        });
    };

    const fetch = (): Promise<FieldResponse> =>
        state.bridge instanceof Error ? Promise.reject(state.bridge) : Promise.resolve(state.bridge);
    const addPasskey = (): Promise<FieldResponse> => Promise.resolve(state.addPasskeyResponse);
    const noPasskeys = (): Promise<FieldResponse> =>
        Promise.resolve({
            data: [],
            error: null
        });

    return {
        showToast,
        clearToasts,
        state,
        user: {
            id: "user-1"
        },
        documentId: "user-1",
        client: {
            $fetch: fetch,
            passkey: {
                addPasskey,
                deletePasskey: noPasskeys,
                listUserPasskeys: noPasskeys
            }
        }
    };
});

const translations: Record<string, string> = {
    "passkeyPlugin:managementField:failedToManage": "failed to manage passkeys",
    "passkeyPlugin:managementField:ownPasskeysOnly": "manage your own passkeys only",
    "passkeyPlugin:managementField:reauthenticate": "reauthenticate",
    "passkeyPlugin:managementField:reauthenticationRequired": "reauthentication required",
    "passkeyPlugin:managementClient:addPasskey": "manage passkeys",
    "passkeyPlugin:managementClient:register": "register",
    "authentication:loggedOutSuccessfully": "logged out successfully",
    "error:logoutFailed": "logout failed"
} as const;

const sessionFreshnessMilliseconds = 60_000;
const freshnessWindowMilliseconds = 100;

const createFreshBridge = (freshUntil: number): FieldResponse => ({
    data: {
        freshUntil
    },
    error: null
});

const staleBridge: FieldResponse = {
    data: null,
    error: {
        code: "STEP_UP_REQUIRED"
    }
};

const ignoreModal = (): void => {
    // Delete confirmation is covered by PasskeyManagementClient tests.
};

const fieldButton = ({
    children,
    disabled,
    onClick
}: {
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}): ReactNode => (
    <button type="button" disabled={disabled} onClick={onClick}>
        {children}
    </button>
);

const fieldTextInput = ({
    label,
    value,
    onChange
}: {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}): ReactNode => (
    <label>
        {label}
        <input aria-label={label} value={value} onChange={onChange} />
    </label>
);

vi.mock("@payloadcms/ui", () => ({
    Button: fieldButton,
    ConfirmationModal: (): null => null,
    TextInput: fieldTextInput,
    toast: {
        error: mocks.showToast,
        success: mocks.showToast
    },
    useAuth: (): { logOut: () => Promise<void>; user: typeof mocks.user } => ({
        logOut: (): Promise<void> =>
            mocks.state.logoutError ? Promise.reject(mocks.state.logoutError) : Promise.resolve(),
        user: mocks.user
    }),
    useConfig: (): {
        config: {
            admin: { routes: { login: string } };
            routes: { admin: string; api: string };
        };
    } => ({
        config: {
            admin: { routes: { login: "/login" } },
            routes: { admin: "/admin", api: "/backend" }
        }
    }),
    useDocumentInfo: (): { id: string } => ({ id: mocks.documentId }),
    useModal: (): { openModal: () => void } => ({ openModal: ignoreModal }),
    useTranslation: (): { t: (translationKey: string) => string } => ({
        // eslint-disable-next-line id-length
        t: (translationKey: string): string => translations[translationKey] ?? translationKey
    })
}));

vi.mock("better-auth/client", () => ({
    createAuthClient: (): typeof mocks.client => mocks.client
}));

vi.mock("next/navigation", () => ({
    useRouter: (): { push: (path: string) => void } => ({
        push: (path: string): void => {
            mocks.state.pushedPath = path;
        }
    })
}));

vi.mock("@payloadcms/ui/icons/Plus", () => ({
    PlusIcon: (): null => null
}));

const configureFieldMocks = (): void => {
    mocks.clearToasts();
    mocks.state.addPasskeyResponse = {
        data: {},
        error: null
    };
    mocks.state.bridge = {
        data: null,
        error: null
    };
    mocks.state.logoutError = null;
    mocks.state.pushedPath = null;
    mocks.documentId = "user-1";
    location.pathname = "/admin/account";
    location.search = "?tab=security";
};

beforeEach(configureFieldMocks);

const renderField = async (): Promise<void> => {
    const { PasskeyManagementField } = await import("./PasskeyManagementField");
    render(<PasskeyManagementField />);
};

describe("PasskeyManagementField ownership", () => {
    it("only shows passkey management for the current user", async () => {
        mocks.documentId = "other-user";

        await renderField();

        expect(screen.getByText("manage your own passkeys only")).toBeTruthy();
    });
});

describe("PasskeyManagementField reauthentication", () => {
    it("asks the user to reauthenticate when the bridge reports a stale session", async () => {
        mocks.state.bridge = staleBridge;

        await renderField();

        await screen.findByText("reauthentication required");
        fireEvent.click(screen.getByRole("button", { name: "reauthenticate" }));

        const alert = await screen.findByRole("alert");
        expect(alert.textContent).toBe("logged out successfully");
        expect(mocks.state.pushedPath).toBe(
            "/admin/login?redirect=%2Fadmin%2Faccount%3Ftab%3Dsecurity%23payload-passkey-passkey-management"
        );
    });

    it("shows an error toast when reauthentication logout fails", async () => {
        mocks.state.bridge = staleBridge;
        mocks.state.logoutError = new Error("logout failed");

        await renderField();

        await screen.findByText("reauthentication required");
        fireEvent.click(screen.getByRole("button", { name: "reauthenticate" }));

        const alert = await screen.findByRole("alert");
        expect(alert.textContent).toBe("logout failed");
        expect(mocks.state.pushedPath).toBeNull();
    });
});

describe("PasskeyManagementField bridge failures", () => {
    it("shows a failure message when the session bridge cannot be established", async () => {
        mocks.state.bridge = new Error("network unavailable");

        await renderField();

        await screen.findByText("failed to manage passkeys");
    });
});

describe("PasskeyManagementField freshness", () => {
    it("moves to reauthentication when management reports a step-up requirement", async () => {
        mocks.state.bridge = createFreshBridge(Date.now() + sessionFreshnessMilliseconds);
        mocks.state.addPasskeyResponse = {
            data: null,
            error: {
                code: "STEP_UP_REQUIRED"
            }
        };

        await renderField();
        fireEvent.click(await screen.findByRole("button", { name: "manage passkeys" }));
        fireEvent.click(screen.getByRole("button", { name: "register" }));

        await screen.findByText("reauthentication required");
    });

    it("moves to reauthentication when the bridge freshness deadline expires", async () => {
        mocks.state.bridge = createFreshBridge(Date.now() + freshnessWindowMilliseconds);

        await renderField();
        await screen.findByRole("button", { name: "manage passkeys" });

        expect(await screen.findByText("reauthentication required")).toBeTruthy();
    });
});
