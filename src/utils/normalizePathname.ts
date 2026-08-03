const normalizePathname = <T extends string | null>(pathname: T): T extends string ? string : undefined =>
    pathname?.replace(/^\/+|\/+$/gu, "") as T extends string ? string : undefined;

export { normalizePathname };
