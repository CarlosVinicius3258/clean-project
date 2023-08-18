/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'standard-with-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    //consistent type
    '@typescript-eslint/consistent-type-definitions': 'off',
    //strict-boolean-expressions
    '@typescript-eslint/strict-boolean-expressions': 'off',
  },
};
