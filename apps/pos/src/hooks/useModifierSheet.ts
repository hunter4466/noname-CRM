import type { MenuItem, MenuModifierGroup } from '@noname/types';
import { defaultSelection, missingRequiredGroups, toggleOption, unitPriceWithModifiers, type Selection } from '@noname/domain';
import { useState } from 'react';
import { groupsForItem, toSelectableGroup } from '@/lib/toSelectableGroup';

interface SheetState {
  item: MenuItem;
  selection: Selection;
  quantity: number;
}

/** Bottom sheet that collects modifier choices before an item joins the order. */
export const useModifierSheet = (
  allGroups: MenuModifierGroup[],
  onAdd: (item: MenuItem, groups: MenuModifierGroup[], selection: Selection, unitPrice: number, quantity: number) => void,
) => {
  const [sheet, setSheet] = useState<SheetState | null>(null);
  const groups = sheet ? groupsForItem(sheet.item.modifierGroupIds, allGroups) : [];
  const selectable = groups.map(toSelectableGroup);
  const unitPrice = sheet ? unitPriceWithModifiers(sheet.item.price, selectable, sheet.selection) : 0;
  const missingGroupNames = sheet
    ? missingRequiredGroups(selectable, sheet.selection).map(
        (groupId) => groups.find((group) => group.id === groupId)?.name.toLowerCase() ?? groupId,
      )
    : [];

  const openItem = (item: MenuItem) => {
    if (item.isOutOfStock) {
      return;
    }
    const itemGroups = groupsForItem(item.modifierGroupIds, allGroups);
    if (itemGroups.length === 0) {
      onAdd(item, [], {}, item.price, 1);
      return;
    }
    const defaults = Object.fromEntries(itemGroups.map((group) => [group.id, group.defaultOptionId]));
    setSheet({ item, selection: defaultSelection(itemGroups.map(toSelectableGroup), defaults), quantity: 1 });
  };
  const toggle = (groupId: string, optionId: string) => {
    const group = selectable.find((candidate) => candidate.id === groupId);
    if (sheet && group) {
      setSheet({ ...sheet, selection: toggleOption(sheet.selection, group, optionId) });
    }
  };
  const changeQuantity = (delta: number) => sheet && setSheet({ ...sheet, quantity: Math.max(1, sheet.quantity + delta) });
  const confirm = () => {
    if (sheet && missingGroupNames.length === 0) {
      onAdd(sheet.item, groups, sheet.selection, unitPrice, sheet.quantity);
      setSheet(null);
    }
  };

  return { sheet, groups, unitPrice, missingGroupNames, openItem, toggle, changeQuantity, confirm, close: () => setSheet(null) };
};

export type ModifierSheetState = ReturnType<typeof useModifierSheet>;
