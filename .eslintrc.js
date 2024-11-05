// .eslintrc.ts
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier', 'eslint:recommended'],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'no-undef': 'off', // For Typescript, no undef should not be used
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        eslintIntegration: true,
        printWidth: 120,
      },
    ],
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parser: '@typescript-eslint/parser',
      },
    ],
  },
};
