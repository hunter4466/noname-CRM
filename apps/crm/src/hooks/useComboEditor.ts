import { ComboPricingMode, ComboReceiptMode, type Combo, type ComboInput, type ComboSlot, type ProductSummary } from '@noname/types';
import { useRouter } from 'next/navigation';
import { comboRoute } from '@/types/Route';
import { useDraft } from './useDraft';
import { useSaveCombo } from './useSaveCombo';

export const emptyCombo = (categoryId: string): ComboInput => ({
  name: '',
  sku: '',
  categoryId,
  pricingMode: ComboPricingMode.FixedPrice,
  price: 0,
  discount: 0,
  availabilityLabel: 'Todo el día',
  locationsLabel: 'Todos',
  isActive: true,
  receiptMode: ComboReceiptMode.SingleLine,
  routeItemsToStations: true,
  deductStockPerItem: true,
  slots: [],
});

const toInput = ({
  id: _id,
  tone: _tone,
  savings: _savings,
  savingsPercent: _percent,
  regularPrice: _regular,
  slotNames: _names,
  ...input
}: Combo): ComboInput => input;

const newSlotId = () => `slot_${Math.random().toString(36).slice(2, 10)}`;

export const useComboEditor = (combo: Combo | null, categoryId: string) => {
  const router = useRouter();
  const save = useSaveCombo(combo?.id ?? null);
  const { draft, updateField, replaceDraft, isDirty } = useDraft<ComboInput>(combo ? toInput(combo) : emptyCombo(categoryId));

  const updateSlot = (slotId: string, changes: Partial<ComboSlot>) =>
    updateField(
      'slots',
      draft.slots.map((slot) => (slot.id === slotId ? { ...slot, ...changes } : slot)),
    );
  const removeSlot = (slotId: string) =>
    updateField(
      'slots',
      draft.slots.filter((slot) => slot.id !== slotId),
    );
  const addSlot = (isRequired: boolean) =>
    updateField('slots', [
      ...draft.slots,
      { id: newSlotId(), name: isRequired ? 'Nuevo paso' : 'Postre', isRequired, hint: 'Elige 1', items: [] },
    ]);
  const addItem = (slotId: string, product: ProductSummary) => {
    const slot = draft.slots.find((candidate) => candidate.id === slotId);
    if (!slot || slot.items.some((item) => item.productId === product.id)) {
      return;
    }
    const item = {
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      upcharge: 0,
      isDefault: slot.items.length === 0,
      isOutOfStock: false,
    };
    updateSlot(slotId, { items: [...slot.items, item] });
  };

  const submit = () =>
    save.mutate(draft, {
      onSuccess: (saved) => {
        replaceDraft(toInput(saved));
        if (!combo) {
          router.replace(comboRoute(saved.id));
        }
      },
    });

  return { draft, updateField, isDirty, updateSlot, removeSlot, addSlot, addItem, submit, save };
};
