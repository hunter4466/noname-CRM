import type { PasswordRule } from '@/components/PasswordRules/PasswordRules';

export const evaluatePasswordRules = (password: string): PasswordRule[] => [
  { label: 'Al menos 8 caracteres', isMet: password.length >= 8 },
  { label: 'Un número', isMet: /\d/.test(password) },
  { label: 'Un símbolo (recomendado)', isMet: /[^A-Za-z0-9]/.test(password) },
];

export const isPasswordAcceptable = (password: string) => password.length >= 8 && /\d/.test(password);
