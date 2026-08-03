import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "./src/tests/vitest.linkedom-environment.ts",
        include: ["src/**/*.test.{ts,tsx}"],
        setupFiles: ["./src/tests/vitest.setup.ts"]
    }
});
