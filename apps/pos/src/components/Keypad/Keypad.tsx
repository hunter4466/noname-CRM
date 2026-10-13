import { classNames } from '@noname/ui';
import { KeypadKey } from '@/types/KeypadKey';
import styles from './Keypad.module.css';

const keyLabels: Record<string, { label: string; ariaLabel: string }> = {
  [KeypadKey.Clear]: { label: 'Clear', ariaLabel: 'Clear' },
  [KeypadKey.Delete]: { label: '⌫', ariaLabel: 'Delete' },
};

export interface KeypadProps {
  keys: string[];
  ariaLabel: string;
  disabled?: boolean;
  onPress: (key: string) => void;
}

export const Keypad = ({ keys, ariaLabel, disabled = false, onPress }: KeypadProps) => (
  <div className={styles.pad} role="group" aria-label={ariaLabel}>
    {keys.map((key) => (
      <button
        key={key}
        type="button"
        className={classNames(styles.key, keyLabels[key] && styles.function)}
        aria-label={keyLabels[key]?.ariaLabel ?? key}
        disabled={disabled}
        onClick={() => onPress(key)}
      >
        {keyLabels[key]?.label ?? key}
      </button>
    ))}
  </div>
);
