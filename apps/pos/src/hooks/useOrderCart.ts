import type { MenuItem, MenuModifierGroup } from '@noname/types';
import { breakDownIgv, roundMoney, type Selection } from '@noname/domain';
import { useState } from 'react';
import type { CartLine } from '@/types/CartLine';

const lineKey = (menuItemId: string, selection: Selection) =>
  `${menuItemId}|${Object.entries(selection)
    .map(([groupId, optionIds]) => `${groupId}:${[...optionIds].sort().join(',')}`)
    .sort()
    .join(';')}`;

const modifierLabels = (groups: MenuModifierGroup[], selection: Selection) =>
  groups.flatMap((group) =>
    group.options.filter((option) => (selection[group.id] ?? []).includes(option.id)).map((option) => option.label),
  );

/** The order being rung up. Identical item + modifiers merge into one line. */
export const useOrderCart = () => {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addLine = (item: MenuItem, groups: MenuModifierGroup[], selection: Selection, unitPrice: number, quantity: number) => {
    const key = lineKey(item.id, selection);
    setLines((current) =>
      current.some((line) => line.key === key)
        ? current.map((line) => (line.key === key ? { ...line, quantity: line.quantity + quantity } : line))
        : [
            ...current,
            {
              key,
              menuItemId: item.id,
              name: item.name,
              modifierLabels: modifierLabels(groups, selection),
              selection,
              unitPrice,
              quantity,
            },
          ],
    );
  };
  const changeQuantity = (key: string, delta: number) =>
    setLines((current) =>
      current.map((line) => (line.key === key ? { ...line, quantity: line.quantity + delta } : line)).filter((line) => line.quantity > 0),
    );
  const removeLine = (key: string) => setLines((current) => current.filter((line) => line.key !== key));
  const clear = () => setLines([]);

  const total = roundMoney(lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0));
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  return { lines, addLine, changeQuantity, removeLine, clear, total, itemCount, breakdown: breakDownIgv(total) };
};

export type OrderCart = ReturnType<typeof useOrderCart>;
