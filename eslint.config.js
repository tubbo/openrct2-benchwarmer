import parser from "@typescript-eslint/parser";
// import js from "@eslint/js";
import prettier from "eslint-config-prettier";
// import ts from "@typescript-eslint/eslint-plugin";
import jest from "eslint-plugin-jest";

export default [
  // js.configs.recommended,
  // ts.configs.recommended,
  prettier,
  {
    files: ["*.test.ts"],
    plugins: { jest },
  },
  {
    languageOptions: {
      parser,
      globals: {
        registerPlugin: true,
        ui: true,
        map: true,
        park: true,
        context: true,
      },
    },
    ignores: ["dist/**", "types/**", ".yarn/**"],
  },
];
