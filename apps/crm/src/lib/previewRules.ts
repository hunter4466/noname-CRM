import { BadgeTone } from '@noname/ui';
import type { SelectableGroup } from '@noname/domain';
import { PreviewOptionState } from '@/types/PreviewOptionState';

export const groupBadge = (group: SelectableGroup, chosenCount: number) => {
  if (group.minSelections === 0) {
    return { badgeTone: BadgeTone.Optional, badgeLabel: 'OPTIONAL' };
  }
  return chosenCount >= group.minSelections
    ? { badgeTone: BadgeTone.Done, badgeLabel: 'DONE' }
    : { badgeTone: BadgeTone.Required, badgeLabel: 'REQUIRED' };
};

export const groupRule = (group: SelectableGroup, chosenCount: number) =>
  group.maxSelections === 1 ? 'Pick 1' : `Up to ${group.maxSelections} · ${chosenCount} chosen`;

export const optionState = (isSelected: boolean, isOutOfStock: boolean, groupIsFull: boolean) => {
  if (isOutOfStock) {
    return PreviewOptionState.Unavailable;
  }
  if (isSelected) {
    return PreviewOptionState.Selected;
  }
  return groupIsFull ? PreviewOptionState.Dimmed : PreviewOptionState.Idle;
};
