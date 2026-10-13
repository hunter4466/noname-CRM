import type { PasswordRule } from '@/components/PasswordRules/PasswordRules';

export const evaluatePasswordRules = (password: string): PasswordRule[] => [
  { label: 'At least 8 characters', isMet: password.length >= 8 },
  { label: 'A number', isMet: /\d/.test(password) },
  { label: 'A symbol (recommended)', isMet: /[^A-Za-z0-9]/.test(password) },
];

export const isPasswordAcceptable = (password: string) => password.length >= 8 && /\d/.test(password);
