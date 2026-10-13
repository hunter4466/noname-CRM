import type { ComboPricingMode } from '../enums/ComboPricingMode';
import type { ComboReceiptMode } from '../enums/ComboReceiptMode';
import type { IgvAffectation } from '../enums/IgvAffectation';
import type { ModifierOptionKind } from '../enums/ModifierOptionKind';
import type { ProductStatus } from '../enums/ProductStatus';
import type { Tone } from '../enums/Tone';
import type { UnitOfMeasure } from '../enums/UnitOfMeasure';

export interface Category {
  id: string;
  name: string;
  productCount: number;
}

export interface ProductLocationSetting {
  locationId: string;
  locationName: string;
  isAvailable: boolean;
  priceOverride: number | null;
  routedPrinterName: string | null;
  printerOptions: string[];
}

export interface ProductModifierGroupLink {
  groupId: string;
  maxOverride: number | null;
}

export interface ProductSummary {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  price: number;
  status: ProductStatus;
  tone: Tone;
  modifierGroupNames: string[];
  usedInGroupName: string | null;
  locationsLabel: string;
}

export interface Product extends ProductSummary {
  description: string;
  igvAffectation: IgvAffectation;
  unitOfMeasure: UnitOfMeasure;
  sunatProductCode: string;
  appliesIcbper: boolean;
  modifierGroups: ProductModifierGroupLink[];
  locationSettings: ProductLocationSetting[];
}

export type ProductInput = Pick<
  Product,
  | 'name'
  | 'sku'
  | 'categoryId'
  | 'price'
  | 'description'
  | 'igvAffectation'
  | 'unitOfMeasure'
  | 'sunatProductCode'
  | 'appliesIcbper'
  | 'modifierGroups'
  | 'locationSettings'
>;

export interface ModifierOption {
  id: string;
  kind: ModifierOptionKind;
  label: string;
  priceDelta: number;
  linkedProductSku: string | null;
  followUpGroupName: string | null;
  isDefault: boolean;
  isAvailable: boolean;
  availabilityNote: string | null;
}

export interface PreModifier {
  id: string;
  label: string;
  priceDelta: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  ticketName: string;
  cashierPrompt: string;
  minSelections: number;
  maxSelections: number;
  freeSelections: number;
  extraSelectionPrice: number;
  allowRepeats: boolean;
  preModifiersEnabled: boolean;
  preModifiers: PreModifier[];
  isNested: boolean;
  options: ModifierOption[];
  usedInProductNames: string[];
  lastEditedLabel: string;
}

export type ModifierGroupInput = Omit<ModifierGroup, 'id' | 'usedInProductNames' | 'lastEditedLabel'>;

export interface ComboSlotItem {
  productId: string;
  productName: string;
  sku: string;
  upcharge: number;
  isDefault: boolean;
  isOutOfStock: boolean;
}

export interface ComboSlot {
  id: string;
  name: string;
  isRequired: boolean;
  hint: string;
  items: ComboSlotItem[];
}

export interface ComboSummary {
  id: string;
  name: string;
  sku: string;
  tone: Tone;
  slotNames: string[];
  price: number;
  savings: number;
  savingsPercent: number;
  availabilityLabel: string;
  locationsLabel: string;
  isActive: boolean;
}

export interface Combo extends ComboSummary {
  categoryId: string;
  pricingMode: ComboPricingMode;
  discount: number;
  regularPrice: number;
  receiptMode: ComboReceiptMode;
  routeItemsToStations: boolean;
  deductStockPerItem: boolean;
  slots: ComboSlot[];
}

export type ComboInput = Omit<Combo, 'id' | 'savings' | 'savingsPercent' | 'regularPrice' | 'slotNames' | 'tone'>;
