import { z } from 'zod';

export const locationInputSchema = z.object({
  name: z.string().min(1, 'El nombre del local es obligatorio'),
  receiptName: z.string(),
  phone: z.string(),
  openingHours: z.string(),
  address: z.string().min(1, 'La dirección es obligatoria'),
  addressReference: z.string(),
  department: z.string(),
  province: z.string(),
  district: z.string(),
  ubigeo: z.string().regex(/^\d{6}$/, 'El ubigeo tiene 6 dígitos'),
  establishmentCode: z.string().regex(/^\d{4}$/, 'El código de establecimiento tiene 4 dígitos'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  isActive: z.boolean(),
});

const series = (letter: 'B' | 'F') =>
  z.string().regex(new RegExp(`^${letter}[A-Z0-9]{3}$`), `La serie debe empezar con ${letter} y tener 4 caracteres`);

export const terminalInputSchema = z.object({
  name: z.string().min(1, 'Ponle nombre al POS'),
  placement: z.string(),
  receiptPrinter: z.string(),
  kitchenPrinter: z.string(),
  boletaSeries: series('B'),
  facturaSeries: series('F'),
  allowOfflineSales: z.boolean(),
});
