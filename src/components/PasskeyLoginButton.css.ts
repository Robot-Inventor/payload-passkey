import { style } from "@vanilla-extract/css";

const orTextStyles = style({
    textAlign: "center",
    margin: "0 auto",
    color: "var(--color-text-secondary)",
    fontSize: "0.8em",
    position: "relative",

    ":before": {
        content: '""',
        display: "inline-block",
        background: "var(--color-border)",
        height: "1px",
        width: "calc(50% - 2em)",
        position: "absolute",
        left: 0,
        top: "50%"
    },

    ":after": {
        content: '""',
        display: "inline-block",
        background: "var(--color-border)",
        height: "1px",
        width: "calc(50% - 2em)",
        position: "absolute",
        right: 0,
        top: "50%"
    }
});

const buttonStyles = style({
    width: "100%"
});

export { orTextStyles, buttonStyles };
