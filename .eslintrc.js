module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    'no-console': 0,
    'no-debugger': 0,
    'max-len': 0,
    'no-trailing-spaces': 0,
    'comma-dangle': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'prefer-destructuring': 0,
    'no-empty-function': 0,
    'no-empty': 0,
    'no-unused-expressions': 0,
    'no-restricted-syntax': 0,
    'default-case': 0,
    'no-plusplus': 0,
    'no-return-assign': 0,
    camelcase: 0,
    'guard-for-in': 0,
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    indent: 0,
    'vue/no-unused-vars': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
