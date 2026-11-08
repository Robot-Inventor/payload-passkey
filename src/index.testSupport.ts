import type { CollectionConfig, Config } from "payload";
import type { PayloadPasskeyOptions } from "./types";
import { payloadPasskey } from "./index";

const baseOptions = {
    modelName: "user",
    userCollection: "users",
    baseURL: "https://example.com",
    secret: "a-secret-that-is-long-enough-for-better-auth",
    trustedOrigins: ["https://example.com"],
    generateId: "serial"
} as const satisfies PayloadPasskeyOptions;

const configuredSessionSeconds = 3600;
const defaultSessionSeconds = 7200;
const expectedFieldOccurrenceCount = 1;

const createConfig = (
    userCollection: CollectionConfig = {
        slug: "users",
        auth: true,
        fields: []
    }
): Config =>
    ({
        collections: [
            userCollection,
            {
                slug: "posts",
                fields: []
            }
        ]
    }) as unknown as Config;

const applyPlugin = async (config: Config, options: Record<string, unknown> = baseOptions): Promise<Config> =>
    payloadPasskey(options as never)(config);

type UserCollection = CollectionConfig & {
    auth: Exclude<NonNullable<CollectionConfig["auth"]>, boolean>;
};

const getUsersCollection = (config: Config): UserCollection => {
    const users = config.collections?.find(({ slug }) => slug === "users");

    if (!users || typeof users.auth !== "object") throw new Error("The users collection is not configured");

    return users as UserCollection;
};

const countFieldsByName = (users: UserCollection, fieldName: string): number =>
    users.fields.filter((field) => "name" in field && field.name === fieldName).length;

const firstRegisteredUserRole = async (users: UserCollection, existingUserCount: number): Promise<unknown> => {
    const hook = users.hooks?.beforeChange?.[0] as ((args: never) => Promise<Record<string, unknown>>) | undefined;
    const data = await hook?.({
        data: {},
        operation: "create",
        req: {
            payload: {
                count: () => ({
                    totalDocs: existingUserCount
                })
            },
            user: null
        },
        context: {}
    } as never);

    return data?.["role"];
};

export {
    applyPlugin,
    baseOptions,
    configuredSessionSeconds,
    countFieldsByName,
    createConfig,
    defaultSessionSeconds,
    expectedFieldOccurrenceCount,
    firstRegisteredUserRole,
    getUsersCollection
};
