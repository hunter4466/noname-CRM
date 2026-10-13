import type { DocumentType } from '../enums/DocumentType';
import type { OrderType } from '../enums/OrderType';
import type { PaymentMethod } from '../enums/PaymentMethod';
import type { PermissionKey } from '../enums/PermissionKey';
import type { SunatDocumentStatus } from '../enums/SunatDocumentStatus';

export interface TerminalInfo {
  deviceCode: string;
  terminalName: string;
  locationName: string;
  isOnline: boolean;
  syncedLabel: string;
  sunatConnected: boolean;
  printerLabel: string;
  printerPaperLow: boolean;
  lastCloseLabel: string;
  suggestedOpeningCash: number;
}

export interface StaffMember {
  id: string;
  fullName: string;
  shortName: string;
  initials: string;
  roleName: string;
}

export interface PinLoginRequest {
  staffId: string;
  pin: string;
}

export interface PosSession {
  staff: StaffMember;
  permissions: PermissionKey[];
  shiftId: string | null;
}

export interface OpenShiftRequest {
  openingCash: number;
}

export interface Shift {
  id: string;
  openingCash: number;
  openedAt: string;
}

export interface MenuOption {
  id: string;
  label: string;
  price: number;
  isOutOfStock: boolean;
}

export interface MenuModifierGroup {
  id: string;
  name: string;
  minSelections: number;
  maxSelections: number;
  freeSelections: number;
  extraSelectionPrice: number;
  defaultOptionId: string | null;
  options: MenuOption[];
}

export interface MenuCategory {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  isCombo: boolean;
  isOutOfStock: boolean;
  modifierGroupIds: string[];
}

export interface MenuResponse {
  categories: MenuCategory[];
  items: MenuItem[];
  modifierGroups: MenuModifierGroup[];
  openTicketCount: number;
  nextOrderNumber: number;
}

export interface OrderLineInput {
  menuItemId: string;
  quantity: number;
  selectedOptionIds: Record<string, string[]>;
}

export interface CreateOrderRequest {
  orderType: OrderType;
  documentType: DocumentType;
  customerDocument: string;
  paymentMethod: PaymentMethod;
  amountTendered: number | null;
  lines: OrderLineInput[];
}

export interface CreatedOrder {
  id: string;
  number: number;
  documentLabel: string;
  documentNumber: string;
  total: number;
  change: number;
  sunatStatus: SunatDocumentStatus;
  printerLabel: string;
}
