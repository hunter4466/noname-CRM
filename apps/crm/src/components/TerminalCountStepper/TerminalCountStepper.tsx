import styles from './TerminalCountStepper.module.css';

const MIN_TERMINALS = 1;
const MAX_TERMINALS = 20;

export interface TerminalCountStepperProps {
  value: number;
  onChange: (value: number) => void;
}

export const TerminalCountStepper = ({ value, onChange }: TerminalCountStepperProps) => (
  <div className={styles.field}>
    <span className={styles.label}>¿Cuántas cajas (POS)?</span>
    <div className={styles.stepper}>
      <button
        type="button"
        className={styles.button}
        aria-label="Menos"
        disabled={value <= MIN_TERMINALS}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <b className={styles.value}>{value}</b>
      <button
        type="button"
        className={styles.button}
        aria-label="Más"
        disabled={value >= MAX_TERMINALS}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
      <span className="hint">Se llaman Caja mostrador, Caja 2… puedes renombrarlas cuando quieras</span>
    </div>
  </div>
);
