module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
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
    'import/prefer-default-export': 0
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
