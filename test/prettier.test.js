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
});
