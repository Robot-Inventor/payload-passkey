const mergeClassNames = (...classNames: Array<string | undefined | null | false>): string =>
    classNames.filter(Boolean).join(" ");

export { mergeClassNames };
