import { style } from "@vanilla-extract/css";

const registerFormStyles = style({
    marginBlock: "calc(var(--base) / 2)"
});

const registerButtonContainerStyles = style({
    display: "flex",
    gap: "calc(var(--base) * 0.5)"
});

export { registerFormStyles, registerButtonContainerStyles };
