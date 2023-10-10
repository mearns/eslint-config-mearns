require("./jest-customization");

test("it does not generally allow unused parameters", async () => {
    await expect(`function foo(unusedParameter: string) {
    return 17;
}

foo();
`).typescriptToFailRule(
        "@typescript-eslint/no-unused-vars",
        "'unusedParameter' is defined but never used. Allowed unused args must match /^_|[iI]gnored?/u.",
    );
});

test("it does not generally allow unused variables", async () => {
    await expect(`function foo() {
    let unusedVariable;
    return 17;
}

foo();
`).typescriptToFailRule(
        "@typescript-eslint/no-unused-vars",
        "'unusedVariable' is defined but never used. Allowed unused vars must match /^_|[iI]gnored?/u.",
    );
});

test("it does not generally allow unused unusedFunction", async () => {
    await expect(`function unusedFunction() {
    return 17;
}
`).typescriptToFailRule(
        "@typescript-eslint/no-unused-vars",
        "'unusedFunction' is defined but never used. Allowed unused vars must match /^_|[iI]gnored?/u.",
    );
});

test("it allows unused parameters if they start with an underscore", async () => {
    await expect(`function foo(_unusedParameter) {
    return 17;
}

foo();
`).typescriptShouldPassLinting()
});

test("it allows unused variables if they start with an underscore", async () => {
    await expect(`function foo() {
    const _unusedVariable = 10;
    return 17;
}

foo();
`).typescriptShouldPassLinting()
});
