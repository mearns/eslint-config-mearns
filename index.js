module.exports = {
    parserOptions: {
        ecmaVersion: 12,
    },
    extends: ["eslint:recommended", "standard", "plugin:prettier/recommended"],
    reportUnusedDisableDirectives: true,
    rules: {
        ...require("./rule-sets/eslint/best-practices"),
        "no-undef": "error",
        "no-warning-comments": [
            "error",
            { terms: ["fixme", "xxx", "todo"], location: "anywhere" },
        ],
        semi: ["error", "always"],
        "no-extra-semi": "error",
        "semi-spacing": ["error", { before: false, after: true }],
        "prettier/prettier": "error",
        "no-unused-vars": [
            "error",
            {
                varsIgnorePattern: "_|[iI]gnored?",
            },
        ],
    },
    overrides: [
        {
            files: ["dev-scripts/**"],
            rules: {
                "no-console": "off",
            },
        },
    ],
};
