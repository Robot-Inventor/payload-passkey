import type { Field } from "payload";

const emailVerifiedField = {
    name: "emailVerified",
    type: "checkbox",
    required: true,
    defaultValue: false,
    hidden: true,
    access: {
        create: () => false,
        update: () => false
    }
} as const satisfies Field;

const imageField = {
    name: "image",
    type: "text",
    hidden: true
} as const satisfies Field;

const passkeyManagementField = {
    name: "payloadPasskeyPluginPasskeyManagement",
    type: "ui",
    label: "Passkey",
    admin: {
        components: {
            Field: "payload-passkey/components/PasskeyManagementField#PasskeyManagementField"
        }
    }
} as const satisfies Field;

export { emailVerifiedField, imageField, passkeyManagementField };
