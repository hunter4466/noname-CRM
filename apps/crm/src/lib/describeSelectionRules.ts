import type { ModifierGroupInput } from '@noname/types';

/** Plain-language reading of the selection rules, shown under the rule inputs. */
export const describeSelectionRules = (group: ModifierGroupInput) => {
  const requirement =
    group.minSelections > 0 ? `Obligatorio · el cliente debe elegir al menos ${group.minSelections}` : 'Opcional · el cliente puede elegir';
  const range = group.minSelections > 0 ? ` y hasta ${group.maxSelections}` : ` hasta ${group.maxSelections}`;
  const free =
    group.freeSelections > 0
      ? ` Las primeras ${group.freeSelections} son gratis; cada adicional se cobra.`
      : ' Cada elección se cobra al precio de su opción.';
  const repeats = group.allowRepeats ? ' La misma opción se puede elegir más de una vez.' : '';
  return `${requirement}${range}.${free}${repeats}`;
};
