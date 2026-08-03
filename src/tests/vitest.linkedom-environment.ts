import type { Environment } from "vitest/runtime";
import { parseHTML } from "linkedom";

type LinkedomWindow = Window & typeof globalThis;
type PreviousValues = Map<string, unknown>;

const windowProperties = [
    "window",
    "document",
    "navigator",
    "location",
    "top",
    "self",
    "Node",
    "Text",
    "Element",
    "HTMLElement",
    "HTMLInputElement",
    "HTMLButtonElement",
    "Event",
    "MouseEvent",
    "KeyboardEvent",
    "CustomEvent",
    "MutationObserver",
    "getComputedStyle",
    "requestAnimationFrame",
    "cancelAnimationFrame"
] as const;

const missingGlobal = Symbol("missing-global");

const createLinkedomWindow = (): LinkedomWindow => {
    const { window } = parseHTML("<!doctype html><html><head></head><body></body></html>");
    Object.defineProperties(window, {
        getComputedStyle: {
            configurable: true,
            value: (): { getPropertyValue: () => string } => ({ getPropertyValue: (): string => "" })
        },
        location: {
            configurable: true,
            value: new URL("http://localhost/")
        },
        self: {
            configurable: true,
            value: window
        },
        top: {
            configurable: true,
            value: window
        }
    });

    return window;
};

const installWindowGlobals = (window: LinkedomWindow): PreviousValues => {
    const previousValues: PreviousValues = new Map();

    for (const property of windowProperties) {
        const previousValue: unknown = property in globalThis ? globalThis[property] : missingGlobal;
        previousValues.set(property, previousValue);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const value = window[property];

        if (typeof value !== "undefined") {
            Object.defineProperty(globalThis, property, {
                configurable: true,
                value,
                writable: true
            });
        }
    }

    return previousValues;
};

const restoreWindowGlobals = (previousValues: PreviousValues): void => {
    for (const property of windowProperties) {
        const previousValue = previousValues.get(property);

        if (previousValue === missingGlobal) {
            // The environment owns these temporary globals and must remove them during teardown.
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete globalThis[property];
        } else {
            Object.defineProperty(globalThis, property, {
                configurable: true,
                value: previousValue,
                writable: true
            });
        }
    }
};

const environment = {
    name: "linkedom",
    viteEnvironment: "client",
    setup(): { teardown: () => void } {
        const previousValues = installWindowGlobals(createLinkedomWindow());
        return {
            teardown(): void {
                restoreWindowGlobals(previousValues);
            }
        };
    }
} as const satisfies Environment;

export default environment;
