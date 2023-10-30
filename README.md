# eslint-config-mearns

My [eslint](https://eslint.org/docs/user-guide/configuring) styling rules for NodeJS projects.

## Use

```console
> npm install --save-dev git+https://github.com/mearns/eslint-config-mearns.git
> npm install --save-dev eslint@8
```

Set your [.eslintrc.json](https://eslint.org/docs/user-guide/configuring#configuration-file-formats) as follows:

```json
{
    "extends": ["@bmearns/eslint-config"]
}
```

Optionally, but recommended:

```console
> npm install --save-dev prettier pretty-quick husky
```

And merge the following into your package.json:

```json
{
    "scripts": {
        "lint": "mearns-lint .",
        "pretty": "pretty-quick --staged"
    },
    "husky": {
        "hooks": {
            "pre-commit": "npm run pretty -s"
        }
    }
}
```

## Overview

Parses ECMA Version 12, rules based on ["JavaScript Standard Style"](https://standardjs.com/) and [Prettier (v3)](https://prettier.io/), but with semicolons.

The rules start with ["standard"](https://github.com/standard/eslint-config-standard) but we put semicolons back in because some people are really adverse to relying
on [ASI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Automatic_semicolon_insertion). Our rules require the use of
[semicolons to terminate statements](https://eslint.org/docs/rules/semi), require a [space](https://eslint.org/docs/rules/semi-spacing) after a semicolon and
prohibit a space before a semicolon, and prohibit the use of [extra-semicolons](https://eslint.org/docs/rules/no-extra-semi) (semicolons that create empty statements).

We also use the ["prettier/recommended"](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration) configuration and specifically set all prettier rules
to "error" level (some default to "warning").

Finally, we add a ["no-warning-comments"](https://eslint.org/docs/rules/no-warning-comments`) rule which will fail if any comment contains strings
"FIXME", "TODO", or "XXX" (case-insensitive in all cases). This isn't to imply you shouldn't use comments like this, these rules allow you to use them to
flag things that you need to fix before you merge or publish. However, these rules do imply that there shouldn't be any long-lived use of these comments: use
an issue tracker for that.

## Variations

If you're using jest, you might want to extends "@bmearns/eslint-config/jest"; this will set appropriate overrides for files under the `test/` directory.
Or if you're using jest with your test files adjacent to the source files they test, use "@bmearns/eslint-config/jest-adjacent" instead. This assumes your
files are named like "_foobar_.test._ext_".

If you're writing in typescript, you probably want to use "@bmearns/eslint-config/typescript", which will set appropriate overrides for typescript files
(based on ".ts" extension). Note that you'll want to have this _after_ the jest variant if you're using both.
