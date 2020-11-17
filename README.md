# eslint-config-mearns

My [eslint](https://eslint.org/docs/user-guide/configuring) styling rules for NodeJS projects.

## Use

```console
> npm install --save-dev git+https://github.com/mearns/eslint-config-mearns.git
> npm install --save-dev eslint@7
```

Set your [.eslintrc.json](https://eslint.org/docs/user-guide/configuring#configuration-file-formats) as follows:

```json
{
    "extends": ["mearns"]
}
```

Optionally, but recommended:

```console
> npm install --save-dev prettier@1 pretty-quick@2 husky
```

And merge the following into your package.json:

```json
{
    "scripts": {
        "check:eslint": "eslint --max-warnings 0 --format codeframe .",
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

Parses ECMA Version 12, rules based on ["JavaScript Standard Style"](https://standardjs.com/) and [Prettier (v1)](https://prettier.io/), but with semicolons.

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

## Prettier

Note that we stick with prettier version 1. Version 2 introduced a lot of stuff that we don't care for, like trailing commas at the end of array and object literals. It also
seems to clash with the "prettier/recommended" rules so you end up with your auto-formatter changing things and then your linter telling you to change it back in a never ending
battle.
