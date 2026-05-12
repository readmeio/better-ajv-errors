import oxlintConfig from '@readme/oxlint-config';
import oxlintConfigVitest from '@readme/oxlint-config/testing/vitest';
import oxlintConfigTS from '@readme/oxlint-config/typescript';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [oxlintConfig, oxlintConfigTS],
  options: {
    reportUnusedDisableDirectives: 'error',
  },
  ignorePatterns: ['coverage/', 'lib/'],
  categories: {
    suspicious: 'error',
  },
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true,
  },
  rules: {
    'default-param-last': 'off',
    'guard-for-in': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'readme/json-parse-try-catch': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-array-sort': 'off',
  },
  overrides: [
    {
      files: ['typings.d.ts'],
      rules: {
        'func-names': 'off',
        'import/no-anonymous-default-export': 'off',
      },
    },
    {
      files: ['src/**/__tests__/**/*.test.{js,ts}'],
      ...oxlintConfigVitest,
      rules: oxlintConfigVitest.rules,
    },
  ],
});
