import { normalizePathname } from "../utils/normalizePathname";

const getAuthBasePath = (apiRoute: string): string => `/${normalizePathname(apiRoute)}/auth`;

export { getAuthBasePath };
