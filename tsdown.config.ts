import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig({
    entry: {
        index: "./src/index.ts",
        components: "./src/components/index.ts"
    },
    root: "./src",
    format: "esm",
    platform: "neutral",
    unbundle: true,
    dts: true,
    deps: {
        neverBundle: true
    },
    plugins: [
        vanillaExtractPlugin({
            identifiers: "short"
        })
    ]
});
