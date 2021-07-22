const eslintConfig = require("..");
const { ESLint } = require("eslint");
const path = require("path");

const eslint = new ESLint({
    cwd: path.resolve(__dirname, ".."),
    overrideConfigFile: path.resolve(__dirname, "../index.js")
});
expect.extend({
    async javascriptShouldPassLinting(received) {
        const results = await runEslintOnJavascript(received);
        expect(results).toHaveLength(1);
        const allViolations = results[0].messages.filter(m => m.severity > 0);
        const pass = allViolations.length === 0;
        if (pass) {
            return {
                pass: true,
                message: () =>
                    `Expected javascript snippet not to pass linting, but it did.`
            };
        } else {
            return {
                pass: false,
                message: () =>
                    `Expected javascript snippet to pass linting, but it did not.` +
                    "\n\n" +
                    "Received:" +
                    "\n\n" +
                    allViolations
                        .map(rule => this.utils.printReceived(rule))
                        .join("\n")
            };
        }
    },

    async javascriptToFailRule(received, ruleName, message) {
        const results = await runEslintOnJavascript(received);
        expect(results).toHaveLength(1);
        const allViolations = results[0].messages.filter(m => m.severity > 0);
        const matchedRules = allViolations.filter(m => m.ruleId === ruleName);
        const pass =
            matchedRules.length &&
            matchedRules.every(m => m.severity > 0) &&
            (!message || matchedRules.some(m => m.message === message));
        if (pass) {
            return {
                pass: true,
                message: () =>
                    `Expected javascript snippet not to fail rule ${ruleName}, but it did.` +
                    "\n\n" +
                    "Received:" +
                    "\n\n" +
                    matchedRules
                        .map(rule => this.utils.printReceived(matchedRules))
                        .join("\n")
            };
        } else {
            return {
                pass: false,
                message: () => {
                    const report = [];
                    if (message) {
                        report.push(
                            `Expected javascript snippet to fail rule ${ruleName} with specified message, but it did not.`,
                            "",
                            `Expected message: ${this.utils.printExpected(
                                message
                            )}`
                        );
                        if (matchedRules.length) {
                            report.push(
                                "",
                                "Received:",
                                ...matchedRules.map(rule =>
                                    this.utils.printReceived(rule)
                                )
                            );
                        } else if (allViolations.length) {
                            report.push(
                                "",
                                "Received:",
                                ...allViolations.map(rule =>
                                    this.utils.printReceived(rule)
                                )
                            );
                        } else {
                            report.push(`Received: no violations`);
                        }
                    } else {
                        report.push(
                            `Expected javascript snippet to fail rule ${ruleName}, but there were no violations for this rule.`
                        );
                        if (allViolations.length) {
                            report.push(
                                "",
                                "Received:",
                                ...allViolations.map(rule =>
                                    this.utils.printReceived(rule)
                                )
                            );
                        }
                    }

                    return report.join("\n");
                }
            };
        }
    }
});

function runEslintOnJavascript(string) {
    return eslint.lintText(string, { filePath: "test/lint-test.js" });
}
