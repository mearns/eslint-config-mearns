module.exports = {
    extends: ".",
    overrides: [
        {
            files: ["test/**"],
            env: {
                jest: true
            }
        },
        {
            files: ["dev-scripts/**"],
            rules: {
                "no-console": "off"
            }
        }
    ]
};
