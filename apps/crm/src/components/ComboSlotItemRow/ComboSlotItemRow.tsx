import type { ComboSlotItem } from '@noname/types';
import { Button, ButtonSize, ButtonVariant, classNames, TextInput } from '@noname/ui';
import styles from './ComboSlotItemRow.module.css';

export interface ComboSlotItemRowProps {
  item: ComboSlotItem;
  onUpdate: (changes: Partial<ComboSlotItem>) => void;
  onRemove: () => void;
}

export const ComboSlotItemRow = ({ item, onUpdate, onRemove }: ComboSlotItemRowProps) => (
  <div className={classNames(styles.item, item.isOutOfStock && styles.outOfStock)}>
    <span className={styles.name}>{item.productName}</span>
    <span className="hint mono">{item.sku}</span>
    <label className={styles.default}>
      <input type="radio" checked={item.isDefault} onChange={() => onUpdate({ isDefault: true })} />
      Predeterminado
    </label>
    <div className={styles.upcharge}>
      <TextInput
        prefix="+S/"
        monospace
        type="number"
        min={0}
        step="0.50"
        aria-label={`${item.productName} upcharge`}
        value={item.upcharge}
        onChange={(event) => onUpdate({ upcharge: Number(event.target.value) })}
      />
    </div>
    {item.isOutOfStock && <span className="hint">Agotado</span>}
    <Button size={ButtonSize.Small} variant={ButtonVariant.Ghost} aria-label={`Quitar ${item.productName}`} onClick={onRemove}>
      ×
    </Button>
  </div>
);
