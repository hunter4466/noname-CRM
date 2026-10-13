import type { ModifierGroup } from '@noname/types';

/** One-line summary of a group's selection rules, e.g. "Elige 1 · 4 opciones · premodificadores". */
export const describeGroupRules = (group: ModifierGroup, maxOverride: number | null = null) => {
  const max = maxOverride ?? group.maxSelections;
  const parts = [max === 1 ? 'Elige 1' : `Hasta ${max}`];
  if (group.freeSelections > 0) {
    parts.push(`primeras ${group.freeSelections} gratis`);
  }
  parts.push(`${group.options.length} opciones`);
  if (group.preModifiersEnabled) {
    parts.push('premodificadores');
  }
  return parts.join(' · ');
};
