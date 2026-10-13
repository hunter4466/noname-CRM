import { BadgeTone } from '@noname/ui';
import type { SelectableGroup } from '@noname/domain';
import { PreviewOptionState } from '@/types/PreviewOptionState';

export const groupBadge = (group: SelectableGroup, chosenCount: number) => {
  if (group.minSelections === 0) {
    return { badgeTone: BadgeTone.Optional, badgeLabel: 'OPCIONAL' };
  }
  return chosenCount >= group.minSelections
    ? { badgeTone: BadgeTone.Done, badgeLabel: 'LISTO' }
    : { badgeTone: BadgeTone.Required, badgeLabel: 'OBLIGATORIO' };
};

export const groupRule = (group: SelectableGroup, chosenCount: number) =>
  group.maxSelections === 1 ? 'Elige 1' : `Hasta ${group.maxSelections} · ${chosenCount} elegidas`;

export const optionState = (isSelected: boolean, isOutOfStock: boolean, groupIsFull: boolean) => {
  if (isOutOfStock) {
    return PreviewOptionState.Unavailable;
  }
  if (isSelected) {
    return PreviewOptionState.Selected;
  }
  return groupIsFull ? PreviewOptionState.Dimmed : PreviewOptionState.Idle;
};
