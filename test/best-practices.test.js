import "./jest-customization";

// a unit test to ensure the consistent-return rule is enabled
// and that it requires a return statement
describe("best-practices", () => {
    describe("consistent-return", () => {
        test("it fails if a function only returns a value from some branches", async () => {
            await expect(`function foo(input) {
    if (input) {
        return 1;
    }
}
`).javascriptToFailRule("consistent-return");
        });

        test("it passes if a function returns a value from every branch", async () => {
            await expect(`function foo(input) {
  if (input) {
    return 1;
  }
  return 0;
}
`).not.javascriptToFailRule("consistent-return");
        });
    });

    describe("no-undef", () => {
        test("it fails if an undefined variable is references", async () => {
            await expect("const y = x + 1;\n").javascriptToFailRule(
                "no-undef",
                "'x' is not defined.",
            );
        });
    });
});
