import type { ModifierGroup } from '@noname/types';

/** One-line summary of a group's selection rules, e.g. "Pick 1 · 4 options · pre-modifiers". */
export const describeGroupRules = (group: ModifierGroup, maxOverride: number | null = null) => {
  const max = maxOverride ?? group.maxSelections;
  const parts = [max === 1 ? 'Pick 1' : `Up to ${max}`];
  if (group.freeSelections > 0) {
    parts.push(`first ${group.freeSelections} free`);
  }
  parts.push(`${group.options.length} options`);
  if (group.preModifiersEnabled) {
    parts.push('pre-modifiers');
  }
  return parts.join(' · ');
};
