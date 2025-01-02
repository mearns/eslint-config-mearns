import base from "./base.js";
import jest from "eslint-plugin-jest";

export default [
    ...base,
    {
        files: ["test/**"],
        plugins: {
            jest,
        },
        languageOptions: {
            globals: jest.environments.globals.globals,
        },
    },
];
