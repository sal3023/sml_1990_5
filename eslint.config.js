import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import tsEslintParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/**"] }, // Ignore the dist directory
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"], languageOptions: { parser: tsEslintParser, parserOptions: { ecmaFeatures: { jsx: true } }, globals: globals.browser } },
  ...tseslint.configs.recommended,
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    settings: {
      react: {
        version: "18.0", // Explicitly set React version
      },
    },
  },
]
