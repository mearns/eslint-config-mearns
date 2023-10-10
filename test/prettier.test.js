require("./jest-customization");

describe("prettier", () => {
    describe("indentation", () => {
        test("should fail for indent of 6", async () => {
            await expect(`function foo() {
      return "foo";
}
`).javascriptToFailRule("prettier/prettier", "Delete `··`");
        });

        test("should pass for indent of 4", async () => {
            await expect(`function foo() {
    return "foo";
}
`).not.javascriptToFailRule("prettier/prettier");
        });
    });

    describe("trailing commas", () => {
        test("should fail when a single-line array literal has a trailing comma", async () => {
            await expect("[11, 12, 13,];\n").javascriptToFailRule(
                "prettier/prettier",
                "Delete `,`",
            );
        });

        test("should fail when an object literal has no trailing comma", async () => {
            await expect(`const obj = {
    foo: "bar"
};
`).javascriptToFailRule("prettier/prettier", "Insert `,`", { line: 2 });
        });

        test("should fail if there is no trailing comma on a multi-line array literal", async () => {
            await expect(`function foo() {
    return [
        "foo bar trot burger whatever long line 1",
        "foo bar trot burger whatever long line 2",
        "foo bar trot burger whatever long line 3"
    ];
}`).javascriptToFailRule("prettier/prettier", "Insert `,`", { line: 5 });
        });
    });

    test("should fail if there is a space between the function keyword and the arguments list", async () => {
        await expect(`function foo () {
    return "foo";
}`).javascriptToFailRule("prettier/prettier", "Delete `·`", {
            line: 1,
            column: 13,
            endColumn: 14,
        });
    });
});
