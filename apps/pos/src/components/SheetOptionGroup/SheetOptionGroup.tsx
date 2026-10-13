import type { MenuModifierGroup } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { Badge, BadgeTone, classNames } from '@noname/ui';
import styles from './SheetOptionGroup.module.css';

const ruleText = (group: MenuModifierGroup, chosenCount: number) => {
  const base = group.maxSelections === 1 ? 'Elige 1' : `Hasta ${group.maxSelections} · ${chosenCount} elegidas`;
  const hasPaidExtras = group.freeSelections > 0 && chosenCount > group.freeSelections;
  return hasPaidExtras ? `${base} · +${formatMoney((chosenCount - group.freeSelections) * group.extraSelectionPrice)}` : base;
};

const optionNote = (group: MenuModifierGroup, price: number, isOutOfStock: boolean) => {
  if (isOutOfStock) {
    return 'Agotado';
  }
  if (price) {
    return `+ ${formatMoney(price)}`;
  }
  return group.freeSelections > 0 ? `Primeras ${group.freeSelections} gratis` : 'Incluido';
};

export interface SheetOptionGroupProps {
  group: MenuModifierGroup;
  chosenIds: string[];
  onToggle: (optionId: string) => void;
}

export const SheetOptionGroup = ({ group, chosenIds, onToggle }: SheetOptionGroupProps) => {
  const isSatisfied = chosenIds.length >= group.minSelections;
  const isFull = group.maxSelections > 1 && chosenIds.length >= group.maxSelections;
  const badge =
    group.minSelections === 0
      ? { tone: BadgeTone.Optional, label: 'OPCIONAL' }
      : isSatisfied
        ? { tone: BadgeTone.Done, label: 'LISTO' }
        : { tone: BadgeTone.Required, label: 'OBLIGATORIO' };
  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <strong>{group.name}</strong>
        <Badge tone={badge.tone}>{badge.label}</Badge>
        <span className={styles.rule}>{ruleText(group, chosenIds.length)}</span>
      </div>
      <div className={styles.options}>
        {group.options.map((option) => {
          const isChosen = chosenIds.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              className={classNames(
                styles.option,
                isChosen && styles.chosen,
                !isChosen && isFull && styles.dimmed,
                option.isOutOfStock && styles.out,
              )}
              aria-pressed={isChosen}
              disabled={option.isOutOfStock}
              onClick={() => onToggle(option.id)}
            >
              <span className={styles.label}>{option.label}</span>
              <small className={styles.note}>{optionNote(group, option.price, option.isOutOfStock)}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
};
