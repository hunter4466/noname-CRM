import { DocumentType, PaymentMethod } from '@noname/types';

export const documentChoices = [
  { value: DocumentType.Boleta, label: 'Boleta', detail: 'Consumidor · DNI opcional' },
  { value: DocumentType.Factura, label: 'Factura', detail: 'Empresa · RUC obligatorio' },
  { value: DocumentType.NotaVenta, label: 'Nota de venta', detail: 'Interno, no se envía' },
];

export const paymentChoices = [
  { value: PaymentMethod.Cash, label: 'Efectivo', detail: 'Soles' },
  { value: PaymentMethod.Card, label: 'Tarjeta', detail: 'Terminal POS' },
  { value: PaymentMethod.YapePlin, label: 'Yape / Plin', detail: 'QR' },
  { value: PaymentMethod.Split, label: 'Dividido', detail: 'Varios métodos' },
];

export const nonCashHint: Partial<Record<PaymentMethod, string>> = {
  [PaymentMethod.Card]: 'Cobra este monto en el terminal de tarjetas',
  [PaymentMethod.YapePlin]: 'Muestra el QR y espera la confirmación',
  [PaymentMethod.Split]: 'Cobra cada parte y luego confirma',
};

/** Round-up suggestions for cash: exact, next 10, next 50, next 100. */
export const quickCashAmounts = (total: number) =>
  [...new Set([total, Math.ceil(total / 10) * 10, Math.ceil(total / 50) * 50, Math.ceil(total / 100) * 100])].slice(0, 4);
