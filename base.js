import js from "@eslint/js";
import standard from "./third-party-configs/standard.js";
import prettier from "eslint-config-prettier";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import bestPractices from "./rule-sets/eslint/best-practices.js";

export default [
    js.configs.recommended,
    standard,
    prettier,
    prettierRecommended,
    {
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },

        languageOptions: {
            ecmaVersion: 12,
            sourceType: "module",
        },
        rules: {
            ...bestPractices,
            "no-undef": "error",
            "no-warning-comments": [
                "error",
                { terms: ["fixme", "xxx", "todo"], location: "anywhere" },
            ],
            semi: ["error", "always"],
            "no-extra-semi": "error",
            "semi-spacing": ["error", { before: false, after: true }],
            "no-unused-vars": [
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
    {
        files: ["dev-scripts/**"],
        rules: {
            "no-console": "off",
        },
    },
];
