import { roundMoney } from './money.ts';

/** The subset of a modifier group the selection rules need — shared by CRM previews and the POS. */
export interface SelectableGroup {
  id: string;
  minSelections: number;
  maxSelections: number;
  freeSelections: number;
  extraSelectionPrice: number;
  options: SelectableOption[];
}

export interface SelectableOption {
  id: string;
  price: number;
  isOutOfStock: boolean;
}

export type Selection = Record<string, string[]>;

const findGroup = (groups: SelectableGroup[], groupId: string) => groups.find((group) => group.id === groupId);

/** Applies a tap on an option: single-choice groups swap, multi-choice groups add until the max. */
export const toggleOption = (selection: Selection, group: SelectableGroup, optionId: string): Selection => {
  const option = group.options.find((candidate) => candidate.id === optionId);
  if (!option || option.isOutOfStock) {
    return selection;
  }
  const current = selection[group.id] ?? [];
  const isSelected = current.includes(optionId);
  const isLockedSingleChoice = group.maxSelections === 1 && group.minSelections === 1;
  let next: string[];
  if (isSelected) {
    next = isLockedSingleChoice ? current : current.filter((id) => id !== optionId);
  } else if (group.maxSelections === 1) {
    next = [optionId];
  } else if (current.length < group.maxSelections) {
    next = [...current, optionId];
  } else {
    next = current;
  }
  return { ...selection, [group.id]: next };
};

/** Price added by one group: option prices plus any charge beyond the free choices. */
export const groupExtra = (group: SelectableGroup, chosenIds: string[]) => {
  const optionsTotal = group.options.filter((option) => chosenIds.includes(option.id)).reduce((sum, option) => sum + option.price, 0);
  const paidExtraCount = group.freeSelections > 0 ? Math.max(0, chosenIds.length - group.freeSelections) : 0;
  return roundMoney(optionsTotal + paidExtraCount * group.extraSelectionPrice);
};

export const unitPriceWithModifiers = (basePrice: number, groups: SelectableGroup[], selection: Selection) =>
  roundMoney(groups.reduce((sum, group) => sum + groupExtra(group, selection[group.id] ?? []), basePrice));

/** Ids of required groups that still need a choice. */
export const missingRequiredGroups = (groups: SelectableGroup[], selection: Selection) =>
  groups.filter((group) => (selection[group.id] ?? []).length < group.minSelections).map((group) => group.id);

export const isGroupSatisfied = (groups: SelectableGroup[], selection: Selection, groupId: string) => {
  const group = findGroup(groups, groupId);
  return !group || (selection[groupId] ?? []).length >= group.minSelections;
};

/** Initial selection: each group's default option, if it has one. */
export const defaultSelection = (groups: SelectableGroup[], defaultOptionIds: Record<string, string | null>): Selection =>
  Object.fromEntries(groups.map((group) => [group.id, defaultOptionIds[group.id] ? [defaultOptionIds[group.id] as string] : []]));
