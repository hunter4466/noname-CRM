import styles from './TerminalCountStepper.module.css';

const MIN_TERMINALS = 1;
const MAX_TERMINALS = 20;

export interface TerminalCountStepperProps {
  value: number;
  onChange: (value: number) => void;
}

export const TerminalCountStepper = ({ value, onChange }: TerminalCountStepperProps) => (
  <div className={styles.field}>
    <span className={styles.label}>How many registers (POS)?</span>
    <div className={styles.stepper}>
      <button
        type="button"
        className={styles.button}
        aria-label="Fewer"
        disabled={value <= MIN_TERMINALS}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <b className={styles.value}>{value}</b>
      <button
        type="button"
        className={styles.button}
        aria-label="More"
        disabled={value >= MAX_TERMINALS}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
      <span className="hint">Named Counter POS, POS 2… rename them anytime</span>
    </div>
  </div>
);
