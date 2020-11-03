module.exports = {
    parserOptions: {
        ecmaVersion: 12
    },
    extends: ["standard", "plugin:prettier/recommended"],
    rules: {
        "no-warning-comments": [
            "error",
            { terms: ["fixme", "xxx", "todo"], location: "anywhere" }
        ],
        semi: [2, "always"],
        "no-extra-semi": 2,
        "no-undef": "error",
        "semi-spacing": [2, { before: false, after: true }],
        "prettier/prettier": "error"
    }
};
