import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

const mocks = vi.hoisted(() => ({
    fetch: vi.fn(),
    logOut: vi.fn(),
    push: vi.fn(),
    toastError: vi.fn(),
    toastSuccess: vi.fn(),
    user: { id: "user-1" },
    documentId: "user-1"
}));

const translations: Record<string, string> = {
    "passkeyPlugin:managementField:failedToManage": "failed to manage passkeys",
    "passkeyPlugin:managementField:ownPasskeysOnly": "manage your own passkeys only",
    "passkeyPlugin:managementField:passkey": "Passkeys",
    "passkeyPlugin:managementField:preparingManagement": "preparing passkeys",
    "passkeyPlugin:managementField:reauthenticate": "reauthenticate",
    "passkeyPlugin:managementField:reauthenticationRequired": "reauthentication required",
    "authentication:loggedOutSuccessfully": "logged out successfully",
    "error:logoutFailed": "logout failed"
} as const;

const freshnessWindowMilliseconds = 1000;
const sessionFreshnessMilliseconds = 60_000;

vi.mock("@payloadcms/ui", () => ({
    Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }): ReactNode => (
        <button onClick={onClick}>{children}</button>
    ),
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
            routes: { admin: string };
        };
    } => ({
        config: {
            admin: { routes: { login: "/login" } },
            routes: { admin: "/admin" }
        }
    }),
    useDocumentInfo: (): { id: string } => ({ id: mocks.documentId }),
    useTranslation: (): { t: (translationKey: string) => string } => ({
        // eslint-disable-next-line id-length
        t: (translationKey: string): string => translations[translationKey] ?? translationKey
    })
}));

vi.mock("../auth/client", () => ({
    betterAuthClient: {
        $fetch: mocks.fetch
    }
}));

vi.mock("./PasskeyManagementClient", () => ({
    PasskeysManagementClient: ({ onStepUpRequired }: { onStepUpRequired: () => void }): ReactNode => (
        <button onClick={onStepUpRequired}>manage passkeys</button>
    )
}));

vi.mock("./PasskeyManagementField.css", () => ({
    containerStyles: "container-styles"
}));

vi.mock("next/navigation", () => ({
    useRouter: (): { push: typeof mocks.push } => ({ push: mocks.push })
}));

const configureFieldMocks = (): void => {
    vi.clearAllMocks();
    mocks.user = { id: "user-1" };
    mocks.documentId = "user-1";
    mocks.logOut.mockResolvedValue(null);
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

        await renderField();
        const manageButton = await screen.findByRole("button", { name: "manage passkeys" });
        fireEvent.click(manageButton);

        expect(screen.getByText("reauthentication required")).toBeTruthy();
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
