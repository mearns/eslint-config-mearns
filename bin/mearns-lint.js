#!/usr/bin/env node

const childProcess = require("child_process");

const proc = childProcess.spawn("node_modules/.bin/eslint", ["--max-warnings", "0", "--format", "codeframe", ...process.argv.slice(2)], {stdio: 'inherit'});

proc.on('exit', (code) => {
    process.exitCode = code;
}); 

proc.on('error', (error) => {
    process.exitCode = error.errno ?? -1;
    console.debug(error);
});