import type { ModifierGroupInput } from '@noname/types';

/** Plain-language reading of the selection rules, shown under the rule inputs. */
export const describeSelectionRules = (group: ModifierGroupInput) => {
  const requirement =
    group.minSelections > 0 ? `Required · the customer must choose at least ${group.minSelections}` : 'Optional · the customer may choose';
  const range = group.minSelections > 0 ? ` and up to ${group.maxSelections}` : ` up to ${group.maxSelections}`;
  const free =
    group.freeSelections > 0
      ? ` The first ${group.freeSelections} are free; each extra is charged.`
      : ' Each choice is charged at its option price.';
  const repeats = group.allowRepeats ? ' The same option can be picked more than once.' : '';
  return `${requirement}${range}.${free}${repeats}`;
};
