import { ModifierOptionKind, type ModifierGroup } from '@noname/types';
import { formatAmount } from '@noname/domain';
import { Badge, BadgeTone, Button, ButtonSize, ButtonVariant, Chip, ChipList, ChipVariant, Pill, PillTone } from '@noname/ui';
import { describeGroupRules } from '@/lib/modifierGroupRules';
import styles from './AttachedGroupRow.module.css';

export interface AttachedGroupRowProps {
  group: ModifierGroup;
  maxOverride: number | null;
  isFirst: boolean;
  isLast: boolean;
  onDetach: () => void;
  onMove: (direction: -1 | 1) => void;
}

export const AttachedGroupRow = ({ group, maxOverride, isFirst, isLast, onDetach, onMove }: AttachedGroupRowProps) => (
  <div className={styles.row}>
    <div className={styles.order}>
      <button type="button" className={styles.arrow} aria-label={`Subir ${group.name}`} disabled={isFirst} onClick={() => onMove(-1)}>
        ↑
      </button>
      <button type="button" className={styles.arrow} aria-label={`Bajar ${group.name}`} disabled={isLast} onClick={() => onMove(1)}>
        ↓
      </button>
    </div>
    <div className={styles.body}>
      <div className={styles.heading}>
        <strong>{group.name}</strong>
        <Badge tone={group.minSelections > 0 ? BadgeTone.Required : BadgeTone.Optional}>
          {group.minSelections > 0 ? 'OBLIGATORIO' : 'OPCIONAL'}
        </Badge>
        <span className="hint">{describeGroupRules(group, maxOverride)}</span>
        {maxOverride !== null && <Pill tone={PillTone.Info}>Personalizado · el grupo usa {group.maxSelections}</Pill>}
      </div>
      <ChipList>
        {group.options.map((option) => (
          <Chip key={option.id} variant={option.kind === ModifierOptionKind.LinkedProduct ? ChipVariant.Linked : ChipVariant.Default}>
            {option.label}
            {option.linkedProductSku ? ` · ${option.linkedProductSku}` : option.priceDelta ? ` +${formatAmount(option.priceDelta)}` : ''}
          </Chip>
        ))}
      </ChipList>
    </div>
    <Button size={ButtonSize.Small} variant={ButtonVariant.Ghost} onClick={onDetach}>
      Quitar
    </Button>
  </div>
);
