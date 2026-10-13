import type { MenuModifierGroup } from '@noname/types';
import type { SelectableGroup } from '@noname/domain';

export const toSelectableGroup = (group: MenuModifierGroup): SelectableGroup => ({
  id: group.id,
  minSelections: group.minSelections,
  maxSelections: group.maxSelections,
  freeSelections: group.freeSelections,
  extraSelectionPrice: group.extraSelectionPrice,
  options: group.options.map((option) => ({ id: option.id, price: option.price, isOutOfStock: option.isOutOfStock })),
});

export const groupsForItem = (groupIds: string[], allGroups: MenuModifierGroup[]) =>
  groupIds.flatMap((groupId) => allGroups.filter((group) => group.id === groupId));
