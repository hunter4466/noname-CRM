import type { Selection } from '@noname/domain';

export interface CartLine {
  key: string;
  menuItemId: string;
  name: string;
  modifierLabels: string[];
  selection: Selection;
  unitPrice: number;
  quantity: number;
}
