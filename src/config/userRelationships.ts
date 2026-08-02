import type { CollectionConfig, CollectionSlug, Config, Field } from "payload";
import { BETTER_AUTH_COLLECTION_SLUGS } from "../constants.js";

const findFieldsByName = (fields: Field[], name: string): Field[] => {
    const matchingFields: Field[] = [];

    for (const field of fields) {
        if ("name" in field && field.name === name) {
            matchingFields.push(field);
        }

        if (field.type === "row" || field.type === "collapsible" || (field.type === "group" && !("name" in field))) {
            matchingFields.push(...findFieldsByName(field.fields, name));
        } else if (field.type === "tabs") {
            for (const tab of field.tabs) {
                if (!("name" in tab)) {
                    matchingFields.push(...findFieldsByName(tab.fields, name));
                }
            }
        }
    }

    return matchingFields;
};

const rewriteBetterAuthUserRelationship = (
    collection: CollectionConfig,
    userCollection: CollectionSlug
): CollectionConfig => {
    if (!Object.values(BETTER_AUTH_COLLECTION_SLUGS).some((slug) => slug === collection.slug)) {
        return collection;
    }

    // Payload-better-auth normalizes Better Auth's `userId` references to the Payload field name `user`.
    const userFields = findFieldsByName(collection.fields, "user");

    if (!userFields.length) {
        throw new Error(
            `[payload-passkey] The \`${collection.slug}\` collection must contain a \`user\` relationship field.`
        );
    }

    for (const userField of userFields) {
        if (userField.type !== "relationship") {
            throw new Error(
                `[payload-passkey] The \`${collection.slug}\` collection's \`user\` field must be a relationship.`
            );
        }

        userField.relationTo = userCollection;
    }

    return collection;
};

const rewriteBetterAuthUserRelationships = (config: Config, userCollection: CollectionSlug): void => {
    for (const collection of config.collections ?? []) {
        rewriteBetterAuthUserRelationship(collection, userCollection);
    }
};

export { findFieldsByName, rewriteBetterAuthUserRelationships };
