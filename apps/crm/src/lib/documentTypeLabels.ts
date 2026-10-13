import { DocumentType } from '@noname/types';

export const documentTypeLabel: Record<DocumentType, string> = {
  [DocumentType.Boleta]: 'Boleta de venta',
  [DocumentType.Factura]: 'Factura',
  [DocumentType.NotaCredito]: 'Nota de crédito',
  [DocumentType.NotaVenta]: 'Nota de venta (internal)',
};
