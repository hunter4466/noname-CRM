import { BusinessType } from '@noname/types';
import { z } from 'zod';

const password = z.string().min(8, 'Password must be at least 8 characters').regex(/\d/, 'Password must contain a number');

export const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password'),
  keepSignedIn: z.boolean(),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  email: z.email('Enter a valid email'),
  password,
  ruc: z.string().regex(/^(10|20)\d{9}$/, 'RUC must be 11 digits starting with 10 or 20'),
  commercialName: z.string().min(1, 'Enter a commercial name'),
  businessType: z.enum(BusinessType),
  firstLocationName: z.string().min(1, 'Name your first location'),
  firstLocationDistrict: z.string().min(1),
  openingHours: z.string(),
  terminalCount: z.number().int().min(1).max(20),
});

export const recoverSchema = z.object({
  email: z.email('Enter a valid email'),
});

export const recoverVerifySchema = z.object({
  email: z.email(),
  code: z.string().regex(/^\d{6}$/, 'The code has 6 digits'),
  newPassword: password,
});
