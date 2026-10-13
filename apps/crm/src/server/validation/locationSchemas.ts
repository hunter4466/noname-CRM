import { z } from 'zod';

export const locationInputSchema = z.object({
  name: z.string().min(1, 'Location name is required'),
  receiptName: z.string(),
  phone: z.string(),
  openingHours: z.string(),
  address: z.string().min(1, 'Address is required'),
  addressReference: z.string(),
  department: z.string(),
  province: z.string(),
  district: z.string(),
  ubigeo: z.string().regex(/^\d{6}$/, 'Ubigeo has 6 digits'),
  establishmentCode: z.string().regex(/^\d{4}$/, 'Establishment code has 4 digits'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  isActive: z.boolean(),
});

const series = (letter: 'B' | 'F') =>
  z.string().regex(new RegExp(`^${letter}[A-Z0-9]{3}$`), `Series must start with ${letter} and have 4 characters`);

export const terminalInputSchema = z.object({
  name: z.string().min(1, 'Name the POS'),
  placement: z.string(),
  receiptPrinter: z.string(),
  kitchenPrinter: z.string(),
  boletaSeries: series('B'),
  facturaSeries: series('F'),
  allowOfflineSales: z.boolean(),
});
