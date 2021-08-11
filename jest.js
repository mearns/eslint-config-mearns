module.exports = {
    extends: ".",
    overrides: [
        {
            files: ["test/**"],
            env: {
                jest: true,
            },
        },
    ],
};
