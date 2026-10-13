import { IconMinus, IconPlus } from '@noname/ui/icons';
import styles from './QuantityStepper.module.css';

export interface QuantityStepperProps {
  value: number;
  onChange: (delta: number) => void;
  minimum?: number;
}

export const QuantityStepper = ({ value, onChange, minimum = 0 }: QuantityStepperProps) => (
  <div className={styles.stepper}>
    <button type="button" className={styles.button} aria-label="Menos" disabled={value <= minimum} onClick={() => onChange(-1)}>
      <IconMinus size={16} />
    </button>
    <span className={styles.value}>{value}</span>
    <button type="button" className={styles.button} aria-label="Más" onClick={() => onChange(1)}>
      <IconPlus size={16} />
    </button>
  </div>
);
