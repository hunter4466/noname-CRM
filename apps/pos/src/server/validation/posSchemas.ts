import { DocumentType, OrderType, PaymentMethod } from '@noname/types';
import { z } from 'zod';

export const pinLoginSchema = z.object({
  staffId: z.string().min(1),
  pin: z.string().regex(/^\d{4}$/, 'PIN has 4 digits'),
});

export const openShiftSchema = z.object({
  openingCash: z.number().min(0).multipleOf(0.01),
});

export const createOrderSchema = z
  .object({
    orderType: z.enum(OrderType),
    documentType: z.enum([DocumentType.Boleta, DocumentType.Factura, DocumentType.NotaVenta]),
    customerDocument: z.string(),
    paymentMethod: z.enum(PaymentMethod),
    amountTendered: z.number().min(0).nullable(),
    lines: z
      .array(
        z.object({
          menuItemId: z.string(),
          quantity: z.number().int().min(1).max(99),
          selectedOptionIds: z.record(z.string(), z.array(z.string())),
        }),
      )
      .min(1, 'The order is empty'),
  })
  .refine((order) => order.documentType !== DocumentType.Factura || /^(10|20)\d{9}$/.test(order.customerDocument), {
    message: 'A factura needs the customer RUC (11 digits)',
  });
