import { formatMoney } from '@noname/domain';
import type { CartLine } from '@/types/CartLine';
import { QuantityStepper } from '../QuantityStepper/QuantityStepper';
import styles from './OrderLineRow.module.css';

export interface OrderLineRowProps {
  line: CartLine;
  onQuantityChange: (delta: number) => void;
  onRemove: () => void;
}

export const OrderLineRow = ({ line, onQuantityChange, onRemove }: OrderLineRowProps) => (
  <div className={styles.line}>
    <div className={styles.details}>
      <div className={styles.name}>{line.name}</div>
      {line.modifierLabels.length > 0 && (
        <div className={styles.modifiers}>
          {line.modifierLabels.map((label) => (
            <span key={label}>+ {label}</span>
          ))}
        </div>
      )}
    </div>
    <div className={styles.price}>{formatMoney(line.unitPrice * line.quantity)}</div>
    <QuantityStepper value={line.quantity} onChange={onQuantityChange} />
    <button type="button" className={styles.remove} onClick={onRemove}>
      Remove
    </button>
  </div>
);
