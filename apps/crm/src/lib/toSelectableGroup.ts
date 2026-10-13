import type { ModifierGroup } from '@noname/types';
import type { SelectableGroup } from '@noname/domain';

export const toSelectableGroup = (group: ModifierGroup, maxOverride: number | null = null): SelectableGroup => ({
  id: group.id,
  minSelections: group.minSelections,
  maxSelections: maxOverride ?? group.maxSelections,
  freeSelections: group.freeSelections,
  extraSelectionPrice: group.extraSelectionPrice,
  options: group.options.map((option) => ({ id: option.id, price: option.priceDelta, isOutOfStock: !option.isAvailable })),
});
