import { ModifierOptionKind, type ModifierOption } from '@noname/types';
import { Button, ButtonSize, ButtonVariant, Chip, ChipVariant, Switch, TextInput } from '@noname/ui';
import { TableCell } from '../shared/TableCell/TableCell';
import styles from './ModifierOptionRow.module.css';

export interface ModifierOptionRowProps {
  option: ModifierOption;
  onUpdate: (changes: Partial<ModifierOption>) => void;
  onSetDefault: () => void;
  onRemove: () => void;
}

export const ModifierOptionRow = ({ option, onUpdate, onSetDefault, onRemove }: ModifierOptionRowProps) => (
  <tr>
    <TableCell>
      <div className={styles.option}>
        {option.kind === ModifierOptionKind.LinkedProduct ? (
          <>
            <span className={styles.label}>{option.label}</span>
            <Chip variant={ChipVariant.Linked}>Linked · {option.linkedProductSku}</Chip>
          </>
        ) : (
          <TextInput aria-label="Nombre de la opción" value={option.label} onChange={(event) => onUpdate({ label: event.target.value })} />
        )}
        {option.availabilityNote && <span className="hint">{option.availabilityNote}</span>}
      </div>
    </TableCell>
    <TableCell>
      <div className={styles.price}>
        <TextInput
          prefix="+S/"
          monospace
          type="number"
          min={0}
          step="0.10"
          aria-label={`${option.label} price`}
          value={option.priceDelta}
          onChange={(event) => onUpdate({ priceDelta: Number(event.target.value) })}
        />
      </div>
    </TableCell>
    <TableCell muted>{option.followUpGroupName ? <Chip>{option.followUpGroupName}</Chip> : '—'}</TableCell>
    <TableCell>
      <input
        type="radio"
        name="defaultOption"
        aria-label={`Predeterminado ${option.label}`}
        checked={option.isDefault}
        onChange={onSetDefault}
      />
    </TableCell>
    <TableCell>
      <Switch checked={option.isAvailable} ariaLabel={`${option.label} available`} onChange={(isAvailable) => onUpdate({ isAvailable })} />
    </TableCell>
    <TableCell alignEnd>
      <Button size={ButtonSize.Small} variant={ButtonVariant.Ghost} onClick={onRemove}>
        Quitar
      </Button>
    </TableCell>
  </tr>
);
