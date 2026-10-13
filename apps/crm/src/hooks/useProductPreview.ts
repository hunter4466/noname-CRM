import type { ModifierGroup, PreModifier, ProductInput } from '@noname/types';
import {
  formatAmount,
  formatMoney,
  groupExtra,
  missingRequiredGroups,
  roundMoney,
  toggleOption,
  type SelectableGroup,
  type Selection,
} from '@noname/domain';
import { useState } from 'react';
import { groupBadge, groupRule, optionState } from '@/lib/previewRules';
import { toSelectableGroup } from '@/lib/toSelectableGroup';
import type { PosPreviewModel, PreviewGroup, TicketLine } from '@/types/PosPreview';

const REGULAR_PRE_MODIFIER_ID = 'pre_regular';

interface AttachedGroup {
  group: ModifierGroup;
  selectable: SelectableGroup;
  chosen: string[];
  preModifier: PreModifier | null;
}

const groupCharge = ({ selectable, chosen, preModifier }: AttachedGroup) =>
  groupExtra(selectable, chosen) + (preModifier ? preModifier.priceDelta * chosen.length : 0);

const groupTicketLines = ({ group, chosen, preModifier }: AttachedGroup): TicketLine[] =>
  group.options
    .filter((option) => chosen.includes(option.id))
    .map((option) => {
      const price = option.priceDelta + (preModifier?.priceDelta ?? 0);
      return {
        label: `+ ${preModifier ? `${preModifier.label} ` : ''}${option.label}`,
        amount: price ? formatAmount(price) : '',
        isModifier: true,
      };
    });

/** Simulates the cashier's modifier sheet for a product being edited. */
export const useProductPreview = (product: ProductInput, allGroups: ModifierGroup[]): PosPreviewModel => {
  const [selection, setSelection] = useState<Selection>({});
  const [preModifierId, setPreModifierId] = useState(REGULAR_PRE_MODIFIER_ID);

  const attached: AttachedGroup[] = product.modifierGroups.flatMap((link) => {
    const group = allGroups.find((candidate) => candidate.id === link.groupId);
    if (!group) {
      return [];
    }
    const preModifier = group.preModifiersEnabled ? group.preModifiers.find((candidate) => candidate.id === preModifierId) : undefined;
    const activePreModifier = preModifier && preModifier.id !== REGULAR_PRE_MODIFIER_ID ? preModifier : null;
    return [
      { group, selectable: toSelectableGroup(group, link.maxOverride), chosen: selection[group.id] ?? [], preModifier: activePreModifier },
    ];
  });

  const total = roundMoney(attached.reduce((sum, entry) => sum + groupCharge(entry), product.price));
  const ticketLines = [
    { label: `1 ${product.name || 'Nuevo producto'}`, amount: formatAmount(product.price), isModifier: false },
    ...attached.flatMap(groupTicketLines),
  ];

  const groups: PreviewGroup[] = attached.map(({ group, selectable, chosen }) => {
    const isFull = selectable.maxSelections > 1 && chosen.length >= selectable.maxSelections;
    return {
      id: group.id,
      name: group.name,
      ...groupBadge(selectable, chosen.length),
      rule: groupRule(selectable, chosen.length),
      options: group.options.map((option) => ({
        id: option.id,
        label: option.label,
        note: !option.isAvailable ? 'Agotado' : option.priceDelta ? `+ ${formatMoney(option.priceDelta)}` : 'Incluido',
        state: optionState(chosen.includes(option.id), !option.isAvailable, isFull),
        onPick: () => setSelection((current) => toggleOption(current, selectable, option.id)),
      })),
      segments:
        group.preModifiersEnabled && chosen.length > 0
          ? group.preModifiers.map((pre) => ({
              id: pre.id,
              label: pre.priceDelta ? `${pre.label} +${pre.priceDelta.toFixed(2)}` : pre.label,
            }))
          : [],
      selectedSegmentId: preModifierId,
      onSegmentChange: setPreModifierId,
    };
  });

  const missing = missingRequiredGroups(
    attached.map((entry) => entry.selectable),
    selection,
  ).map((groupId) => attached.find((entry) => entry.group.id === groupId)?.group.name.toLowerCase() ?? groupId);

  return {
    title: product.name || 'Nuevo producto',
    basePrice: formatMoney(product.price),
    groups,
    missingText: missing.length > 0 ? `Elige: ${missing.join(', ')} para agregar este ítem` : null,
    total: formatMoney(total),
    ticketLines,
    ticketTotal: formatAmount(total),
  };
};
