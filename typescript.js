module.exports = {
    extends: ".",
    overrides: [
        {
            files: ["**/*.ts"],
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
            extends: ["plugin:@typescript-eslint/recommended"],
            rules: {
                "@typescript-eslint/no-use-before-define": [
                    "error",
                    { functions: false, classes: false }
                ],
                "@typescript-eslint/triple-slash-reference": "off"
            }
        }
    ]
};
