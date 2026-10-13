import styles from './Switch.module.css';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
  disabled?: boolean;
}

export const Switch = ({ checked, onChange, ariaLabel, disabled = false }: SwitchProps) => (
  <input
    type="checkbox"
    role="switch"
    className={styles.switch}
    checked={checked}
    disabled={disabled}
    aria-label={ariaLabel}
    onChange={(event) => onChange(event.target.checked)}
  />
);
