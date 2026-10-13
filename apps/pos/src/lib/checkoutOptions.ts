import { DocumentType, PaymentMethod } from '@noname/types';

export const documentChoices = [
  { value: DocumentType.Boleta, label: 'Boleta', detail: 'Consumer · DNI optional' },
  { value: DocumentType.Factura, label: 'Factura', detail: 'Business · RUC required' },
  { value: DocumentType.NotaVenta, label: 'Nota de venta', detail: 'Internal, not sent' },
];

export const paymentChoices = [
  { value: PaymentMethod.Cash, label: 'Cash', detail: 'Soles' },
  { value: PaymentMethod.Card, label: 'Card', detail: 'POS terminal' },
  { value: PaymentMethod.YapePlin, label: 'Yape / Plin', detail: 'QR' },
  { value: PaymentMethod.Split, label: 'Split', detail: 'Several methods' },
];

export const nonCashHint: Partial<Record<PaymentMethod, string>> = {
  [PaymentMethod.Card]: 'Charge this amount on the card terminal',
  [PaymentMethod.YapePlin]: 'Show the QR and wait for the confirmation',
  [PaymentMethod.Split]: 'Collect each part, then confirm',
};

/** Round-up suggestions for cash: exact, next 10, next 50, next 100. */
export const quickCashAmounts = (total: number) =>
  [...new Set([total, Math.ceil(total / 10) * 10, Math.ceil(total / 50) * 50, Math.ceil(total / 100) * 100])].slice(0, 4);
