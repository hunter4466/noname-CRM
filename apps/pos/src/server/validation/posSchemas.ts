import { DocumentType, OrderType, PaymentMethod } from '@noname/types';
import { z } from 'zod';

export const pinLoginSchema = z.object({
  staffId: z.string().min(1),
  pin: z.string().regex(/^\d{4}$/, 'El PIN tiene 4 dígitos'),
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
      .min(1, 'El pedido está vacío'),
  })
  .refine((order) => order.documentType !== DocumentType.Factura || /^(10|20)\d{9}$/.test(order.customerDocument), {
    message: 'La factura necesita el RUC del cliente (11 dígitos)',
  });
