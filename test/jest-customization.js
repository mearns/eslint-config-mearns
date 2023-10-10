const { ESLint } = require("eslint");
const path = require("path");

const eslint = new ESLint({
    cwd: path.resolve(__dirname, ".."),
    overrideConfigFile: path.resolve(__dirname, "../index.js"),
});

const tsEslint = new ESLint({
    cwd: path.resolve(__dirname, ".."),
    overrideConfigFile: path.resolve(__dirname, "../typescript.js"),
});

function makeSnippet(received, rules = []) {
    const lines = received.split(/\n/)
        .map((line, idx) => {
            const lineNum = idx + 1;
            const rulesViolated = rules.map((r, idx) => ([idx, r])).filter(([_idx, r]) => r.line === lineNum);
            const prefix = rulesViolated.length
                ? `[${rulesViolated.map(([idx, r]) => `r${idx}`).join(",")}] ${lineNum}`
                : String(lineNum)
            return { prefix, line };
        })
    const prefixWidth = Math.max(...lines.map(l => l.prefix.length));
    return lines
        .map(({prefix, line}) => {
            return `${prefix.padStart(prefixWidth, " ")} |${line}`;
        })
        .join("\n");
}

expect.extend({
    async javascriptShouldPassLinting(received) {
        const results = await runEslintOnJavascript(received);
        return evaluateExpectedPassesLinting(this, received, "javascript", results);
    },
    async typescriptShouldPassLinting(received) {
        const results = await runEslintOnTypescript(received);
        return evaluateExpectedPassesLinting(this, received, "typescript", results);
    },

    async javascriptToFailRule(
        received,
        ruleName,
        message,
        otherExpectations = {},
    ) {
        const results = await runEslintOnJavascript(received);
        return evaluateExpectedFailures(
            this,
            received,
            "javascript",
            results,
            ruleName,
            message,
            otherExpectations,
        );
    },

    async typescriptToFailRule(
        received,
        ruleName,
        message,
        otherExpectations = {},
    ) {
        const results = await runEslintOnTypescript(received);
        return evaluateExpectedFailures(
            this,
            received,
            "typescript",
            results,
            ruleName,
            message,
            otherExpectations,
        );
    },
});

function runEslintOnJavascript(string) {
    return eslint.lintText(string, { filePath: "test/lint-test.js" });
}
function runEslintOnTypescript(string) {
    return tsEslint.lintText(string, { filePath: "test/lint-test.ts" });
}

async function evaluateExpectedPassesLinting(
    self,
    received,
    codeType,
    eslintResults,
) {
    expect(eslintResults).toHaveLength(1);
    const allViolations = eslintResults[0].messages.filter(
        (m) => m.severity > 0,
    );
    const pass = allViolations.length === 0;
    if (pass) {
        return {
            pass: true,
            message: () =>
                `Expected ${codeType} snippet not to pass linting, but it did.` +
                "\n\nSnippet:\n" +
                makeSnippet(received),
        };
    } else {
        return {
            pass: false,
            message: () =>
                `Expected ${codeType} snippet to pass linting, but it did not.` +
                "\n\nSnippet:\n" +
                makeSnippet(received, allViolations) +
                "\n\n" +
                "Received:" +
                "\n\n" +
                allViolations
                    .map((rule, idx) => `  ${self.utils.printReceived(idx)}) ${self.utils.printReceived(rule)}`)
                    .join("\n")
        };
    }
}

async function evaluateExpectedFailures(
    self,
    received,
    codeType,
    eslintResults,
    ruleName,
    message,
    otherExpectations,
) {
    expect(eslintResults).toHaveLength(1);
    const allViolations = eslintResults[0].messages.filter(
        (m) => m.severity > 0,
    );
    const violationsOfCorrectRule = allViolations.filter(
        (m) => m.ruleId === ruleName,
    );
    const hasAdditionalContraints = Boolean(
        message || Object.entries(otherExpectations).length,
    );
    const matchingViolations = hasAdditionalContraints
        ? violationsOfCorrectRule.filter(
              (m) =>
                  (!message || m.message === message) &&
                  Object.entries(otherExpectations).every(
                      ([expectedProperty, expectedValue]) =>
                          m[expectedProperty] === expectedValue,
                  ),
          )
        : violationsOfCorrectRule;
    const pass =
        matchingViolations.length &&
        matchingViolations.every((m) => m.severity > 0);

    if (pass) {
        return {
            pass: true,
            message: () =>
                `Expected ${codeType} snippet not to fail the specified ${ruleName} rules, but it did.` +
                "\n\nSnippet:\n" +
                makeSnippet(received, matchingViolations) +
                "\n\n" +
                "Received:" +
                "\n\n" +
                matchingViolations
                    .map((rule, idx) => `  ${self.utils.printReceived(idx)}) ${self.utils.printReceived(rule)}`)
                    .join("\n"),
        };
    } else {
        // Here, we expected some failed rules matching certain criteria, but we didn't find them. There may be no violations
        // reported, or they might just not match the specified criteria.
        return {
            pass: false,
            message: () => {
                const notableRules = violationsOfCorrectRule.length
                    ? violationsOfCorrectRule
                    : allViolations;
                const report = [];
                report.push(
                    hasAdditionalContraints
                        ? `Expected ${codeType} snippet to fail rule ${ruleName} with specified conditions, but it did not.`
                        : `Expected ${codeType} snippet to fail rule ${ruleName}, but there were no violations for this rule.`,
                );
                report.push("", "", "Snippet:", makeSnippet(received, notableRules));
                if (message) {
                    report.push(
                        "",
                        `Expected message: ${self.utils.printExpected(
                            message,
                        )}`,
                    );
                }
                if (Object.entries(otherExpectations).length) {
                    report.port(
                        "",
                        "Other expectations:",
                        ...Object.entries(otherExpectations).map(
                            ([propName, propValue]) =>
                                `  ${propName}: ${self.utils.printExpected(
                                    propValue,
                                )}`,
                        ),
                    );
                }

                if (notableRules.length) {
                    report.push(
                        "",
                        "Received:",
                        ...notableRules.map(
                            (rule, idx) =>
                                `  ${self.utils.printReceived(idx)}) ${self.utils.printReceived(rule)}`,
                        ),
                    );
                } else {
                    report.push(`Received: no violations`);
                }

                return report.join("\n");
            },
        };
    }
}
