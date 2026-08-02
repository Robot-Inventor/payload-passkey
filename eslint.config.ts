import { defineConfig } from "eslint/config";
import { eslintNextConfig } from "@robot-inventor/eslint-config";

export default defineConfig(eslintNextConfig, {
    rules: {
        "sort-keys": "off"
    }
});
