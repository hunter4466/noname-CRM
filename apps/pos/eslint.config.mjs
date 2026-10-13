import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      // `_`-prefixed names mark values stripped on purpose (e.g. read-only fields removed before a save).
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
    },
  },
  {
    ignores: ['.next/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
