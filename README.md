# eslint-plugin-for-fsd-path

Eslint плагин для проверки что рамках одного слайса все пути должны быть относительными 

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-for-fsd-path`:

```sh
npm install eslint-plugin-for-fsd-path --save-dev
```

## Usage

Add `for-fsd-path` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "for-fsd-path"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "for-fsd-path/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                       | Description |
| :----------------------------------------- |:------------|
| [path-checker](docs/rules/path-checker.md) |     проверки что рамках одного слайса все пути должны быть относительными    |

<!-- end auto-generated rules list -->


