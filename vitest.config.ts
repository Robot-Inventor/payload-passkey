import { defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig({
    plugins: [vanillaExtractPlugin({ identifiers: "short", unstable_injectFilescopes: true })],
    test: {
        environment: "./src/tests/vitest.linkedom-environment.ts",
        include: ["src/**/*.test.{ts,tsx}"],
        setupFiles: ["./src/tests/vitest.setup.ts"]
    }
});
