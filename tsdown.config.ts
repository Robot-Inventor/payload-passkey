import babelPlugin from "@rolldown/plugin-babel";
import { defineConfig } from "tsdown";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig({
    entry: {
        index: "./src/index.ts",
        "components/BetterAuthSessionRefreshProvider": "./src/components/BetterAuthSessionRefreshProvider.tsx",
        "components/PasskeyLoginButton": "./src/components/PasskeyLoginButton.tsx",
        "components/PasskeyManagementField": "./src/components/PasskeyManagementField.tsx"
    },
    root: "./src",
    format: "esm",
    platform: "neutral",
    unbundle: true,
    dts: true,
    deps: {
        neverBundle: [/^react(?:\/|$)/]
    },
    plugins: [
        babelPlugin({
            presets: [reactCompilerPreset({ target: "19" })]
        }),
        vanillaExtractPlugin({
            identifiers: "short"
        })
    ],
    outputOptions: {
        // Avoid consumer-side vanilla-extract plugins reprocessing compiled style modules as `.css.js` sources
        entryFileNames: ({ name }) => `${name.replace(/\.css$/, ".styles")}.js`
    }
});
