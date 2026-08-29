import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PasskeyLoginButton } from "./PasskeyLoginButton";
import type { ReactNode } from "react";

const mocks = vi.hoisted(() => {
    const passkey = vi.fn();

    return {
        passkey,
        fetchFullUser: vi.fn(),
        push: vi.fn(),
        toastError: vi.fn(),
        client: {
            signIn: {
                passkey
            }
        }
    };
});

const translations: Record<string, string> = {
    "passkeyPlugin:loginButton:failedToLogin": "failed to login",
    "passkeyPlugin:loginButton:notAllowed": "not allowed",
    "passkeyPlugin:loginButton:loginWithPasskey": "login with passkey",
    "passkeyPlugin:loginButton:or": "or"
} as const;

vi.mock("@payloadcms/ui", () => ({
    Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }): ReactNode => (
        <button onClick={onClick}>{children}</button>
    ),
    toast: {
        error: mocks.toastError
    },
    useAuth: (): { fetchFullUser: typeof mocks.fetchFullUser } => ({ fetchFullUser: mocks.fetchFullUser }),
    useConfig: (): { config: { routes: { admin: string; api: string } } } => ({
        config: { routes: { admin: "/admin", api: "/backend" } }
    }),
    useTranslation: (): { t: (translationKey: string) => string } => ({
        // eslint-disable-next-line id-length
        t: (translationKey: string): string => translations[translationKey] ?? translationKey
    })
}));

vi.mock("next/navigation", () => ({
    useRouter: (): { push: typeof mocks.push } => ({ push: mocks.push }),
    useSearchParams: (): URLSearchParams => new URLSearchParams("redirect=/requested")
}));

vi.mock("better-auth/client", () => ({
    createAuthClient: (): typeof mocks.client => mocks.client
}));

vi.mock("@payloadcms/ui/icons/Lock", () => ({
    LockIcon: (): null => null
}));

describe("PasskeyLoginButton", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("logs in with a passkey and redirects to the requested admin page", async () => {
        mocks.passkey.mockResolvedValue({ data: {}, error: null });

        render(<PasskeyLoginButton enablePasskeyAutofill={false} />);
        fireEvent.click(screen.getByRole("button", { name: "login with passkey" }));

        await waitFor(() => {
            expect(mocks.push).toHaveBeenCalledWith("/requested");
        });
    });

    it("shows the provider error returned by Better Auth", async () => {
        mocks.passkey.mockResolvedValue({ error: { message: "provider rejected the passkey" } });

        render(<PasskeyLoginButton enablePasskeyAutofill={false} />);
        fireEvent.click(screen.getByRole("button", { name: "login with passkey" }));

        await waitFor(() => {
            expect(mocks.toastError).toHaveBeenCalledWith("provider rejected the passkey");
        });
    });

    it("shows the browser cancellation message when the passkey prompt is cancelled", async () => {
        const error = new Error("cancelled");
        error.name = "NotAllowedError";
        mocks.passkey.mockRejectedValue(error);

        render(<PasskeyLoginButton enablePasskeyAutofill={false} />);
        fireEvent.click(screen.getByRole("button", { name: "login with passkey" }));

        await waitFor(() => {
            expect(mocks.toastError).toHaveBeenCalledWith("not allowed");
        });
    });
});
