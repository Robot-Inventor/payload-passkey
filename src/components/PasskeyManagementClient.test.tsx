import { beforeEach, describe, expect, it, vi } from "vitest";
import {
    configureManagementClientMocks,
    createPasskey,
    mocks,
    openRegistrationForm,
    renderClient
} from "./PasskeyManagementClient.testSupport";
import { fireEvent, screen, waitFor } from "@testing-library/react";

const expectedPasskeyCount = 2;
const noPasskeyCount = 0;

describe("PasskeysManagementClient list and registration", () => {
    beforeEach(configureManagementClientMocks);

    it("shows passkeys returned by Better Auth and their user-facing names", async () => {
        mocks.listUserPasskeys.mockResolvedValue({
            data: [
                createPasskey(),
                createPasskey({
                    id: "passkey-2",
                    name: "",
                    aaguid: "08987058-cadc-4b81-b6e1-30de50dcbe96"
                })
            ],
            error: null
        });

        await renderClient();

        expect(await screen.findByText("Laptop")).toBeTruthy();
        expect(screen.getByText("Windows Hello")).toBeTruthy();
        expect(screen.getAllByRole("button", { name: "delete" })).toHaveLength(expectedPasskeyCount);
    });

    it("shows the loading error returned by Better Auth", async () => {
        mocks.listUserPasskeys.mockResolvedValue({ data: [], error: { message: "load failed" } });

        await renderClient();

        await waitFor(() => {
            expect(mocks.toastError).toHaveBeenCalledWith("load failed");
        });
    });
});

describe("PasskeysManagementClient registration", () => {
    beforeEach(configureManagementClientMocks);

    it("shows the newly registered passkey", async () => {
        const passkey = createPasskey({ name: "Phone" });
        mocks.listUserPasskeys.mockResolvedValueOnce({ data: [], error: null }).mockResolvedValueOnce({
            data: [passkey],
            error: null
        });

        await renderClient();
        fireEvent.click(screen.getByRole("button", { name: "add passkey" }));
        const nameInput = screen.getByRole("textbox", { name: "name" });
        fireEvent.change(nameInput, { target: { value: "Phone" } });
        fireEvent.click(screen.getByRole("button", { name: "register" }));

        await waitFor(() => {
            expect(mocks.toastSuccess).toHaveBeenCalledWith("registered");
            expect(screen.getByText("Phone")).toBeTruthy();
        });
    });
});

describe("PasskeysManagementClient registration errors", () => {
    beforeEach(configureManagementClientMocks);

    it("shows a registration error returned by Better Auth", async () => {
        mocks.addPasskey.mockResolvedValue({ error: { message: "registration failed" } });

        await renderClient();
        openRegistrationForm();

        await waitFor(() => {
            expect(mocks.toastError).toHaveBeenCalledWith("registration failed");
        });
        expect(mocks.toastSuccess).not.toHaveBeenCalled();
    });

    it("shows the browser cancellation message when registration is cancelled", async () => {
        const error = new Error("cancelled");
        error.name = "NotAllowedError";
        mocks.addPasskey.mockRejectedValue(error);

        await renderClient();
        openRegistrationForm();

        await waitFor(() => {
            expect(mocks.toastError).toHaveBeenCalledWith("not allowed");
        });
    });

    it("asks the parent field to reauthenticate when registration requires a fresh session", async () => {
        const onStepUpRequired = vi.fn();
        mocks.addPasskey.mockResolvedValue({ error: { code: "STEP_UP_REQUIRED" } });

        await renderClient(onStepUpRequired);
        openRegistrationForm();

        await waitFor(() => {
            expect(onStepUpRequired).toHaveBeenCalledOnce();
        });
        expect(mocks.toastError).not.toHaveBeenCalled();
    });
});

describe("PasskeysManagementClient deletion success", () => {
    beforeEach(configureManagementClientMocks);

    it("removes a passkey after confirmation", async () => {
        mocks.listUserPasskeys.mockResolvedValue({ data: [createPasskey()], error: null });

        await renderClient();
        await screen.findByText("Laptop");
        expect(screen.queryByRole("dialog")).toBeNull();
        fireEvent.click(screen.getByRole("button", { name: "delete" }));
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeTruthy();
        });
        fireEvent.click(screen.getByRole("button", { name: "confirm" }));

        await waitFor(() => {
            expect(mocks.toastSuccess).toHaveBeenCalledWith("deleted");
            expect(screen.getByText("no passkeys")).toBeTruthy();
            expect(screen.queryAllByRole("button", { name: "delete" })).toHaveLength(noPasskeyCount);
        });
    });
});

describe("PasskeysManagementClient deletion errors", () => {
    beforeEach(configureManagementClientMocks);

    it("asks the parent field to reauthenticate when deletion requires a fresh session", async () => {
        const onStepUpRequired = vi.fn();
        mocks.listUserPasskeys.mockResolvedValue({ data: [createPasskey()], error: null });
        mocks.deletePasskey.mockResolvedValue({ error: { code: "SESSION_NOT_FRESH" } });

        await renderClient(onStepUpRequired);
        await screen.findByText("Laptop");
        fireEvent.click(screen.getByRole("button", { name: "delete" }));
        fireEvent.click(await screen.findByRole("button", { name: "confirm" }));

        await waitFor(() => {
            expect(onStepUpRequired).toHaveBeenCalledOnce();
        });
        expect(mocks.toastError).not.toHaveBeenCalled();
    });

    it("shows a deletion error returned by Better Auth", async () => {
        mocks.listUserPasskeys.mockResolvedValue({ data: [createPasskey()], error: null });
        mocks.deletePasskey.mockResolvedValue({ error: { message: "deletion failed" } });

        await renderClient();
        await screen.findByText("Laptop");
        fireEvent.click(screen.getByRole("button", { name: "delete" }));
        fireEvent.click(await screen.findByRole("button", { name: "confirm" }));

        await waitFor(() => {
            expect(mocks.toastError).toHaveBeenCalledWith("deletion failed");
        });
    });
});
