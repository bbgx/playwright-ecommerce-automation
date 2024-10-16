import typescript from "@typescript-eslint/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
const { configs: typescriptConfigs } = typescript;

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
      "playwright": playwright,
      'prettier': prettier,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      "prettier/prettier": "error",
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      "no-console": "warn",
      semi: [2, 'always'],
    }
  }
];