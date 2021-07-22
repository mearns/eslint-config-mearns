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
        test("should fail when an array has a trailing comma", async () => {
            await expect("[11, 12, 13,];\n").javascriptToFailRule(
                "prettier/prettier",
                "Delete `,`"
            );
        });

        test("should fail when an object literal has a trailing comma", async () => {
            await expect(`const obj = {
    foo: "bar",
};
`).javascriptToFailRule("prettier/prettier", "Delete `,`");
        });
    });
});
