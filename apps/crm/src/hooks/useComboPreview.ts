import { ComboPricingMode, type ComboInput } from '@noname/types';
import { formatAmount, formatMoney, roundMoney } from '@noname/domain';
import { useState } from 'react';
import { PreviewOptionState } from '@/types/PreviewOptionState';
import type { PosPreviewModel, PreviewGroup } from '@/types/PosPreview';

const noSegments = { segments: [], selectedSegmentId: '', onSegmentChange: () => undefined };

/** Simulates building the combo at the register: one pick per slot, upcharges add to the combo price. */
export const useComboPreview = (combo: ComboInput, regularPrice: number): PosPreviewModel => {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const basePrice = combo.pricingMode === ComboPricingMode.FixedPrice ? combo.price : Math.max(0, regularPrice - combo.discount);

  const resolved = combo.slots.map((slot) => {
    const pickedId = picks[slot.id] ?? slot.items.find((item) => item.isDefault)?.productId ?? slot.items[0]?.productId;
    return { slot, pickedId, picked: slot.items.find((item) => item.productId === pickedId) };
  });

  const total = roundMoney(resolved.reduce((sum, entry) => sum + (entry.picked?.upcharge ?? 0), basePrice));
  const ticketLines = [
    { label: `1 ${combo.name || 'Nuevo combo'}`, amount: formatAmount(basePrice), isModifier: false },
    ...resolved.flatMap(({ picked }) =>
      picked
        ? [{ label: `+ ${picked.productName}`, amount: picked.upcharge ? `+${formatAmount(picked.upcharge)}` : '', isModifier: true }]
        : [],
    ),
  ];

  const groups: PreviewGroup[] = resolved.map(({ slot, pickedId }, index) => ({
    id: slot.id,
    name: `${index + 1}. ${slot.name}`,
    badgeTone: null,
    badgeLabel: '',
    rule: 'Elige 1',
    options: slot.items.map((item) => ({
      id: item.productId,
      label: item.productName,
      note: item.isOutOfStock ? 'Agotado' : item.upcharge ? `+ ${formatMoney(item.upcharge)}` : 'Incluido',
      state: item.isOutOfStock
        ? PreviewOptionState.Unavailable
        : item.productId === pickedId
          ? PreviewOptionState.Selected
          : PreviewOptionState.Idle,
      onPick: () => (item.isOutOfStock ? undefined : setPicks((current) => ({ ...current, [slot.id]: item.productId }))),
    })),
    ...noSegments,
  }));

  const emptySlot = combo.slots.find((slot) => slot.isRequired && slot.items.length === 0);
  return {
    title: combo.name || 'Nuevo combo',
    basePrice: formatMoney(basePrice),
    groups,
    missingText: emptySlot ? `Agrega al menos un producto a "${emptySlot.name}"` : null,
    total: formatMoney(total),
    ticketLines,
    ticketTotal: formatAmount(total),
  };
};
