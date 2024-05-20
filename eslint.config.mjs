import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import tsparser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  pluginJs.configs.recommended, //! Enforces all recommnded rules of Eslint @ https://eslint.org/docs/latest/rules/
  ...tseslint.configs.recommended, //! Sets the configuration required for typescript-eslint.
  {
    ...playwright.configs["flat/recommended"],
    files: ["src/tests/**", "src/pages/**"],
    rules: {
      // Customize Playwright rules
      "playwright/no-element-handle": "error",
      "playwright/no-duplicate-hooks": "error",
      "playwright/no-focused-test": "error",
      "playwright/no-networkidle": "error",
      "playwright/no-page-pause": "error",
      "playwright/no-useless-await": "error",
      "playwright/no-skipped-test": "error",
      "playwright/no-wait-for-selector": "error",
      "playwright/no-wait-for-timeout": "error",
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    ignores: [
      "**/*.mjs",
      "playwright.config.ts",
      "playwright-report/*",
      "test-results/*",
      "node-modules/*",
      "allure-report",
      "allure-results",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/require-await": "error",
      ...eslintConfigPrettier.rules,
    },
  },
];
