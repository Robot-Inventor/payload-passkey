import { style } from "@vanilla-extract/css";

const registerFormStyles = style({
    marginBlock: "calc(var(--base) / 2)"
});

const registerButtonContainerStyles = style({
    display: "flex",
    gap: "calc(var(--base) * 0.5)"
});

const passkeyItemStyles = style({
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridTemplateRows: "auto auto",
    marginBottom: "var(--base)",
    alignItems: "center"
});

const passkeyItemDateStyles = style({
    gridColumn: 1
});

const passkeyItemDeleteButtonStyles = style({
    gridColumn: 2,
    gridRow: "1 / 3",
    marginBlock: 0,
    height: "fit-content"
});

export {
    registerFormStyles,
    registerButtonContainerStyles,
    passkeyItemStyles,
    passkeyItemDateStyles,
    passkeyItemDeleteButtonStyles
};
