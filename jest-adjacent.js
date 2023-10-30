/**
 * Used when you keep your Jest test files adjacent to the files they test,
 * rather than in a separate directory.
 */
module.exports = {
    extends: ".",
    overrides: [
        {
            files: ["**/*.test.*", "**/*.test.*"],
            env: {
                jest: true,
            },
        },
    ],
};
