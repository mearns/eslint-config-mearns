module.exports = {
    parserOptions: {
        ecmaVersion: 12
    },
    extends: ["standard", "plugin:prettier/recommended"],
    reportUnusedDisableDirectives: true,
    rules: {
        "no-warning-comments": [
            "error",
            { terms: ["fixme", "xxx", "todo"], location: "anywhere" }
        ],
        semi: ["error", "always"],
        "no-extra-semi": "error",
        "semi-spacing": ["error", { before: false, after: true }],
        "prettier/prettier": "error"
    },
    overrides: [
        {
            files: ["dev-scripts/**"],
            rules: {
                "no-console": "off"
            }
        }
    ]
};
