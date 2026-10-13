import { BusinessType } from '@noname/types';
import { z } from 'zod';

const password = z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').regex(/\d/, 'La contraseña debe incluir un número');

export const loginSchema = z.object({
  email: z.email('Ingresa un correo válido'),
  password: z.string().min(1, 'Ingresa tu contraseña'),
  keepSignedIn: z.boolean(),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Ingresa tu nombre completo'),
  email: z.email('Ingresa un correo válido'),
  password,
  ruc: z.string().regex(/^(10|20)\d{9}$/, 'El RUC debe tener 11 dígitos y empezar con 10 o 20'),
  commercialName: z.string().min(1, 'Ingresa un nombre comercial'),
  businessType: z.enum(BusinessType),
  firstLocationName: z.string().min(1, 'Ponle nombre a tu primer local'),
  firstLocationDistrict: z.string().min(1),
  openingHours: z.string(),
  terminalCount: z.number().int().min(1).max(20),
});

export const recoverSchema = z.object({
  email: z.email('Ingresa un correo válido'),
});

export const recoverVerifySchema = z.object({
  email: z.email(),
  code: z.string().regex(/^\d{6}$/, 'El código tiene 6 dígitos'),
  newPassword: password,
});
