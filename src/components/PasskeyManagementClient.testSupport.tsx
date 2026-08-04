import { type ChangeEvent, type ReactNode, createContext, use, useMemo, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Passkey } from "@better-auth/passkey";
import { vi } from "vitest";

const mocks = vi.hoisted(() => {
    const listUserPasskeys = vi.fn();
    const addPasskey = vi.fn();
    const deletePasskey = vi.fn();

    return {
        listUserPasskeys,
        addPasskey,
        deletePasskey,
        toastError: vi.fn(),
        toastSuccess: vi.fn(),
        getAuthenticatorName: vi.fn(),
        client: {
            passkey: {
                addPasskey,
                deletePasskey,
                listUserPasskeys
            }
        }
    };
});

const translations: Record<string, string> = {
    "passkeyPlugin:managementClient:addPasskey": "add passkey",
    "passkeyPlugin:managementClient:alreadyRegistered": "already registered",
    "passkeyPlugin:managementClient:cancel": "cancel",
    "passkeyPlugin:managementClient:confirmDelete:body": "delete {{name}}?",
    "passkeyPlugin:managementClient:confirmDelete:heading": "confirm deletion",
    "passkeyPlugin:managementClient:createdAt": "created at:",
    "passkeyPlugin:managementClient:delete": "delete",
    "passkeyPlugin:managementClient:deleting": "deleting",
    "passkeyPlugin:managementClient:failedToDelete": "failed to delete",
    "passkeyPlugin:managementClient:failedToLoad": "failed to load",
    "passkeyPlugin:managementClient:failedToRegister": "failed to register",
    "passkeyPlugin:managementClient:notAllowed": "not allowed",
    "passkeyPlugin:managementClient:notFound": "no passkeys",
    "passkeyPlugin:managementClient:passkeyName": "name",
    "passkeyPlugin:managementClient:register": "register",
    "passkeyPlugin:managementClient:registering": "registering",
    "passkeyPlugin:managementClient:successfullyDeleted": "deleted",
    "passkeyPlugin:managementClient:successfullyRegistered": "registered",
    "passkeyPlugin:managementClient:unknownAuthenticator": "unknown authenticator"
} as const;

const translate = (key: string, variables?: { name?: string }): string =>
    (translations[key] ?? key).replace("{{name}}", variables?.name ?? "");

interface ModalState {
    activeModal: string | null;
    openModal: (modalSlug: string) => void;
}

const ModalContext = createContext<ModalState | null>(null);

const MockModalProvider = ({ children }: { children: ReactNode }): ReactNode => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    // eslint-disable-next-line react-doctor/react-compiler-no-manual-memoization
    const modalValue = useMemo(() => ({ activeModal, openModal: setActiveModal }), [activeModal]);

    return <ModalContext value={modalValue}>{children}</ModalContext>;
};

// eslint-disable-next-line react-doctor/no-multi-comp
const MockButton = ({
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

// eslint-disable-next-line react-doctor/no-multi-comp
const MockConfirmationModal = ({
    body,
    heading,
    modalSlug,
    onConfirm
}: {
    body: string;
    heading: string;
    modalSlug: string;
    onConfirm: () => void;
}): ReactNode => {
    const modalState = use(ModalContext);

    if (modalState?.activeModal !== modalSlug) return null;

    return (
        <dialog open aria-labelledby="confirm-delete-heading">
            <h2 id="confirm-delete-heading">{heading}</h2>
            <p>{body}</p>
            <button type="button" onClick={onConfirm}>
                confirm
            </button>
        </dialog>
    );
};

// eslint-disable-next-line react-doctor/no-multi-comp
const MockTextInput = ({
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
        <input
            aria-label={label}
            value={value}
            onChange={onChange}
            onInput={(event) => {
                onChange(event as unknown as ChangeEvent<HTMLInputElement>);
            }}
        />
    </label>
);

const useMockModal = (): { openModal: (modalSlug: string) => void } => {
    const modalState = use(ModalContext);

    if (!modalState) throw new Error("The modal provider is missing");

    return {
        openModal: (modalSlug: string): void => {
            modalState.openModal(modalSlug);
        }
    };
};

vi.mock("@payloadcms/ui", () => ({
    Button: MockButton,
    ConfirmationModal: MockConfirmationModal,
    TextInput: MockTextInput,
    toast: {
        error: mocks.toastError,
        success: mocks.toastSuccess
    },
    useModal: useMockModal,
    useConfig: (): { config: { routes: { api: string } } } => ({ config: { routes: { api: "/backend" } } }),
    // eslint-disable-next-line id-length
    useTranslation: (): { t: typeof translate } => ({ t: translate })
}));

vi.mock("../auth/client", () => ({
    useBetterAuthClient: vi.fn(() => mocks.client)
}));

vi.mock("@better-auth/passkey", () => ({
    getAuthenticatorName: mocks.getAuthenticatorName
}));

vi.mock("./PasskeyManagementClient.css", () => ({
    passkeyItemDateStyles: "date-styles",
    passkeyItemDeleteButtonStyles: "delete-styles",
    passkeyItemStyles: "item-styles",
    registerButtonContainerStyles: "register-buttons",
    registerFormStyles: "register-form"
}));

vi.mock("@payloadcms/ui/icons/Plus", () => ({
    PlusIcon: (): null => null
}));

const createPasskey = (overrides: Partial<Passkey> = {}): Passkey =>
    ({
        aaguid: "unknown-aaguid",
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
        id: "passkey-1",
        name: "Laptop",
        ...overrides
    }) as Passkey;

const configureManagementClientMocks = (): void => {
    vi.clearAllMocks();
    mocks.listUserPasskeys.mockResolvedValue({ data: [], error: null });
    mocks.addPasskey.mockResolvedValue({ data: {}, error: null });
    mocks.deletePasskey.mockResolvedValue({ data: {}, error: null });
    mocks.getAuthenticatorName.mockReturnValue(null);
};

const renderClient = async (onStepUpRequired: () => void = vi.fn()): Promise<() => void> => {
    const { PasskeysManagementClient } = await import("./PasskeyManagementClient");
    render(
        <MockModalProvider>
            <PasskeysManagementClient onStepUpRequired={onStepUpRequired} />
        </MockModalProvider>
    );
    return onStepUpRequired;
};

const openRegistrationForm = (): void => {
    fireEvent.click(screen.getByRole("button", { name: "add passkey" }));
    fireEvent.click(screen.getByRole("button", { name: "register" }));
};

export { configureManagementClientMocks, createPasskey, mocks, openRegistrationForm, renderClient };
