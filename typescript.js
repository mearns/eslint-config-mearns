import base from "./base.js";
import tsEslint from "typescript-eslint";
import tsEslintParser from "@typescript-eslint/parser";

export default [
    ...base,
    ...tsEslint.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsEslintParser,
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-use-before-define": [
                "error",
                { functions: false, classes: false },
            ],
            "@typescript-eslint/triple-slash-reference": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    varsIgnorePattern: "^_|[iI]gnored?",
                    argsIgnorePattern: "^_|[iI]gnored?",
                    caughtErrorsIgnorePattern: "^_|[iI]gnored?",
                    destructuredArrayIgnorePattern: "^_|[iI]gnored?",
                },
            ],
        },
    },
];
