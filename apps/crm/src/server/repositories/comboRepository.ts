import 'server-only';
import { ComboPricingMode, Tone, type Combo, type ComboInput, type ComboSummary } from '@noname/types';
import { createCombosMock, type ComboRecord } from '../mocks/combosMock';
import { createMockId, getMockSlice } from '../mocks/mockStore';
import { findProduct } from './productRepository';

const combos = () => getMockSlice('combos', createCombosMock);

const roundMoney = (amount: number) => Math.round(amount * 100) / 100;

// "Regular price" = the default item of every slot at its à-la-carte price.
const computeRegularPrice = (record: ComboRecord) =>
  record.slots.reduce((sum, slot) => {
    const defaultItem = slot.items.find((item) => item.isDefault) ?? slot.items[0];
    return sum + (defaultItem ? (findProduct(defaultItem.productId)?.price ?? 0) : 0);
  }, 0);

const toCombo = (record: ComboRecord): Combo => {
  const regularPrice = roundMoney(computeRegularPrice(record));
  const price = record.pricingMode === ComboPricingMode.FixedPrice ? record.price : roundMoney(regularPrice - record.discount);
  const savings = roundMoney(Math.max(0, regularPrice - price));
  return {
    ...record,
    price,
    regularPrice,
    savings,
    savingsPercent: regularPrice > 0 ? Math.round((savings / regularPrice) * 100) : 0,
    slotNames: record.slots.map((slot) => slot.name),
  };
};

const toSummary = ({
  id,
  name,
  sku,
  tone,
  slotNames,
  price,
  savings,
  savingsPercent,
  availabilityLabel,
  locationsLabel,
  isActive,
}: Combo): ComboSummary => ({
  id,
  name,
  sku,
  tone,
  slotNames,
  price,
  savings,
  savingsPercent,
  availabilityLabel,
  locationsLabel,
  isActive,
});

export interface ComboFilters {
  search?: string;
  isActive?: boolean;
}

export const listCombos = (filters: ComboFilters): ComboSummary[] => {
  const query = filters.search?.trim().toLowerCase();
  return combos()
    .filter((combo) => !query || combo.name.toLowerCase().includes(query) || combo.sku.toLowerCase().includes(query))
    .filter((combo) => filters.isActive === undefined || combo.isActive === filters.isActive)
    .map((combo) => toSummary(toCombo(combo)));
};

export const findCombo = (comboId: string): Combo | null => {
  const record = combos().find((combo) => combo.id === comboId);
  return record ? toCombo(record) : null;
};

export const createCombo = (input: ComboInput): Combo => {
  const record: ComboRecord = { ...input, id: createMockId('cmb'), tone: Tone.Neutral };
  combos().push(record);
  return toCombo(record);
};

export const updateCombo = (comboId: string, input: Partial<ComboInput>): Combo | null => {
  const record = combos().find((combo) => combo.id === comboId);
  if (!record) {
    return null;
  }
  Object.assign(record, input);
  return toCombo(record);
};
