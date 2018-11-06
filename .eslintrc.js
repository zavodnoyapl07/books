// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        mocha: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/RULES.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'no-inline-comments': 'error',

        'indent': ['error', 4],

        'vue/no-multi-spaces': 'error',
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'never',
                'normal': 'never',
                'component': 'always'
            },
            'svg': 'always',
            'math': 'always'
        }],
        'vue/html-end-tags': 'error',

        'vue/no-confusing-v-for-v-if': 'error',

        'vue/html-quotes': 'error',
        'vue/html-closing-bracket-spacing': 'error',
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'always'
        }],
        'vue/max-attributes-per-line': ['error', {
            'singleline': 4,
            'multiline': {
                'max': 1,
                'allowFirstLine': false
            }
        }],

        'vue/this-in-template': 'error',
        'vue/mustache-interpolation-spacing': 'error',
        'vue/attribute-hyphenation': 'error',
        'vue/attributes-order': 'error',
        'vue/v-bind-style': 'error',
        'vue/v-on-style': 'error',

        "no-restricted-imports": ["error", {
            "paths": [{
                "name": "lodash",
                "message": "Please import concrete function instead, e.g. lodash/pickBy."
            }]
        }],

        'generator-star-spacing': 'error',
        'require-await': 'error',

        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    }
}
