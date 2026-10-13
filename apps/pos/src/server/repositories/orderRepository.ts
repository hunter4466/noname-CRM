import 'server-only';
import { DocumentType, PaymentMethod, SunatDocumentStatus, type CreatedOrder, type CreateOrderRequest } from '@noname/types';
import { breakDownIgv, missingRequiredGroups, roundMoney, unitPriceWithModifiers, type SelectableGroup } from '@noname/domain';
import { createMockId, getMockSlice } from '../mocks/mockStore';
import type { TerminalRecord } from '../mocks/terminalsMock';
import { findMenuGroups, findMenuItem } from './menuRepository';

const FIRST_ORDER_NUMBER = 142;
const FIRST_DOCUMENT_NUMBER = 12879;

interface Counters {
  orderNumbers: Map<string, number>;
  documentNumbers: Map<string, number>;
}

const counters = () => getMockSlice<Counters>('orderCounters', () => ({ orderNumbers: new Map(), documentNumbers: new Map() }));
const orders = () => getMockSlice('orders', (): (CreatedOrder & { deviceCode: string })[] => []);

const documentLabels: Record<DocumentType, string> = {
  [DocumentType.Boleta]: 'Boleta',
  [DocumentType.Factura]: 'Factura',
  [DocumentType.NotaVenta]: 'Nota de venta',
  [DocumentType.NotaCredito]: 'Nota de crédito',
};

export const peekNextOrderNumber = (deviceCode: string) => counters().orderNumbers.get(deviceCode) ?? FIRST_ORDER_NUMBER;

const nextNumber = (map: Map<string, number>, key: string, first: number) => {
  const value = map.get(key) ?? first;
  map.set(key, value + 1);
  return value;
};

export class OrderValidationError extends Error {}

/** Prices every line on the server — the client's totals are never trusted. */
const priceLines = (request: CreateOrderRequest) =>
  request.lines.map((line) => {
    const item = findMenuItem(line.menuItemId);
    if (!item || item.isOutOfStock) {
      throw new OrderValidationError(`${item?.name ?? line.menuItemId} no está disponible`);
    }
    const groups: SelectableGroup[] = findMenuGroups(item.modifierGroupIds).map((group) => ({
      ...group,
      options: group.options.map((option) => ({ id: option.id, price: option.price, isOutOfStock: option.isOutOfStock })),
    }));
    if (missingRequiredGroups(groups, line.selectedOptionIds).length > 0) {
      throw new OrderValidationError(`A ${item.name} le falta una elección obligatoria`);
    }
    return unitPriceWithModifiers(item.price, groups, line.selectedOptionIds) * line.quantity;
  });

const seriesFor = (terminal: TerminalRecord, documentType: DocumentType) =>
  documentType === DocumentType.Factura
    ? terminal.facturaSeries
    : documentType === DocumentType.NotaVenta
      ? terminal.notaVentaSeries
      : terminal.boletaSeries;

export const createOrder = (terminal: TerminalRecord, request: CreateOrderRequest): CreatedOrder => {
  const total = roundMoney(priceLines(request).reduce((sum, lineTotal) => sum + lineTotal, 0));
  const isCash = request.paymentMethod === PaymentMethod.Cash;
  if (isCash && (request.amountTendered ?? 0) < total) {
    throw new OrderValidationError('El efectivo recibido es menor que el total');
  }
  const series = seriesFor(terminal, request.documentType);
  const documentNumber = nextNumber(counters().documentNumbers, series, FIRST_DOCUMENT_NUMBER);
  const order = {
    id: createMockId('ord'),
    deviceCode: terminal.deviceCode,
    number: nextNumber(counters().orderNumbers, terminal.deviceCode, FIRST_ORDER_NUMBER),
    documentLabel: documentLabels[request.documentType],
    documentNumber: `${series}-${String(documentNumber).padStart(8, '0')}`,
    total: breakDownIgv(total).total,
    change: isCash ? roundMoney((request.amountTendered ?? 0) - total) : 0,
    // Mock: a real implementation queues the comprobante for the OSE / SUNAT and stores the CDR.
    sunatStatus: request.documentType === DocumentType.NotaVenta ? SunatDocumentStatus.NotSent : SunatDocumentStatus.Accepted,
    printerLabel: terminal.printerLabel,
  };
  orders().push(order);
  const { deviceCode: _deviceCode, ...createdOrder } = order;
  return createdOrder;
};
