import type { ChangeEvent, ReactNode } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
    const fetch = vi.fn();
    const listUserPasskeys = vi.fn();
    const addPasskey = vi.fn();
    const deletePasskey = vi.fn();

    return {
        fetch,
        listUserPasskeys,
        addPasskey,
        deletePasskey,
        logOut: vi.fn(),
        push: vi.fn(),
        toastError: vi.fn(),
        toastSuccess: vi.fn(),
        user: { id: "user-1" },
        documentId: "user-1",
        client: {
            $fetch: fetch,
            passkey: {
                addPasskey,
                deletePasskey,
                listUserPasskeys
            }
        }
    };
});

const translations: Record<string, string> = {
    "passkeyPlugin:managementField:failedToManage": "failed to manage passkeys",
    "passkeyPlugin:managementField:ownPasskeysOnly": "manage your own passkeys only",
    "passkeyPlugin:managementField:passkey": "Passkeys",
    "passkeyPlugin:managementField:preparingManagement": "preparing passkeys",
    "passkeyPlugin:managementField:reauthenticate": "reauthenticate",
    "passkeyPlugin:managementField:reauthenticationRequired": "reauthentication required",
    "passkeyPlugin:managementClient:addPasskey": "manage passkeys",
    "passkeyPlugin:managementClient:cancel": "cancel",
    "passkeyPlugin:managementClient:failedToLoad": "failed to load",
    "passkeyPlugin:managementClient:failedToRegister": "failed to register",
    "passkeyPlugin:managementClient:notFound": "no passkeys",
    "passkeyPlugin:managementClient:passkeyName": "name",
    "passkeyPlugin:managementClient:register": "register",
    "passkeyPlugin:managementClient:registering": "registering",
    "authentication:loggedOutSuccessfully": "logged out successfully",
    "error:logoutFailed": "logout failed"
} as const;

const freshnessWindowMilliseconds = 1000;
const sessionFreshnessMilliseconds = 60_000;

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
        error: mocks.toastError,
        success: mocks.toastSuccess
    },
    useAuth: (): { logOut: typeof mocks.logOut; user: typeof mocks.user } => ({
        logOut: mocks.logOut,
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
    useRouter: (): { push: typeof mocks.push } => ({ push: mocks.push })
}));

vi.mock("@payloadcms/ui/icons/Plus", () => ({
    PlusIcon: (): null => null
}));

const configureFieldMocks = (): void => {
    vi.clearAllMocks();
    mocks.user = { id: "user-1" };
    mocks.documentId = "user-1";
    mocks.logOut.mockResolvedValue(null);
    mocks.listUserPasskeys.mockResolvedValue({ data: [], error: null });
    mocks.addPasskey.mockResolvedValue({ data: {}, error: null });
    mocks.deletePasskey.mockResolvedValue({ data: {}, error: null });
    location.pathname = "/admin/account";
    location.search = "?tab=security";
};

const renderField = async (): Promise<void> => {
    const { PasskeyManagementField } = await import("./PasskeyManagementField");
    render(<PasskeyManagementField />);
};

describe("PasskeyManagementField ownership", () => {
    beforeEach(configureFieldMocks);

    it("only shows passkey management for the current user", async () => {
        mocks.documentId = "other-user";

        await renderField();

        expect(screen.getByText("manage your own passkeys only")).toBeTruthy();
    });
});

describe("PasskeyManagementField bridge", () => {
    beforeEach(configureFieldMocks);

    it("shows the management client after establishing a fresh bridge session", async () => {
        mocks.fetch.mockResolvedValue({ data: { freshUntil: Date.now() + sessionFreshnessMilliseconds }, error: null });

        await renderField();

        await waitFor(() => {
            expect(screen.getByRole("button", { name: "manage passkeys" })).toBeTruthy();
        });
    });
});

describe("PasskeyManagementField reauthentication", () => {
    beforeEach(configureFieldMocks);

    it("asks the user to reauthenticate when the bridge reports a stale session", async () => {
        mocks.fetch.mockResolvedValue({ data: null, error: { code: "STEP_UP_REQUIRED" } });

        await renderField();

        await waitFor(() => {
            expect(screen.getByText("reauthentication required")).toBeTruthy();
        });
        fireEvent.click(screen.getByRole("button", { name: "reauthenticate" }));

        await waitFor(() => {
            expect(mocks.push).toHaveBeenCalledWith(
                "/admin/login?redirect=%2Fadmin%2Faccount%3Ftab%3Dsecurity%23payload-passkey-passkey-management"
            );
            expect(mocks.toastSuccess).toHaveBeenCalledWith("logged out successfully");
        });
    });

    it("shows an error toast when reauthentication logout fails", async () => {
        mocks.fetch.mockResolvedValue({ data: null, error: { code: "STEP_UP_REQUIRED" } });
        mocks.logOut.mockRejectedValue(new Error("logout failed"));

        await renderField();

        await waitFor(() => {
            expect(screen.getByText("reauthentication required")).toBeTruthy();
        });
        fireEvent.click(screen.getByRole("button", { name: "reauthenticate" }));

        await waitFor(() => {
            expect(mocks.toastError).toHaveBeenCalledWith("logout failed");
        });
        expect(mocks.push).not.toHaveBeenCalled();
    });
});

describe("PasskeyManagementField bridge failures", () => {
    beforeEach(configureFieldMocks);

    it("shows a failure message when the session bridge cannot be established", async () => {
        mocks.fetch.mockRejectedValue(new Error("network unavailable"));

        await renderField();

        await waitFor(() => {
            expect(screen.getByText("failed to manage passkeys")).toBeTruthy();
        });
    });
});

describe("PasskeyManagementField freshness", () => {
    beforeEach(configureFieldMocks);

    it("moves to reauthentication when management reports a step-up requirement", async () => {
        mocks.fetch.mockResolvedValue({ data: { freshUntil: Date.now() + sessionFreshnessMilliseconds }, error: null });
        mocks.addPasskey.mockResolvedValue({ error: { code: "STEP_UP_REQUIRED" } });

        await renderField();
        fireEvent.click(await screen.findByRole("button", { name: "manage passkeys" }));
        fireEvent.click(screen.getByRole("button", { name: "register" }));

        await waitFor(() => {
            expect(screen.getByText("reauthentication required")).toBeTruthy();
        });
    });

    it("moves to reauthentication when the bridge freshness deadline expires", async () => {
        vi.useFakeTimers();

        try {
            mocks.fetch.mockResolvedValue({
                data: { freshUntil: Date.now() + freshnessWindowMilliseconds },
                error: null
            });

            await renderField();
            await act(async () => {
                await Promise.resolve();
            });
            expect(screen.getByRole("button", { name: "manage passkeys" })).toBeTruthy();

            act(() => {
                vi.advanceTimersByTime(freshnessWindowMilliseconds);
            });

            expect(screen.getByText("reauthentication required")).toBeTruthy();
        } finally {
            vi.useRealTimers();
        }
    });
});
