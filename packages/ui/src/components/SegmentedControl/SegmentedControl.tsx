import { classNames } from '../../classNames';
import styles from './SegmentedControl.module.css';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  stretch?: boolean;
}

export const SegmentedControl = <T extends string>({ options, value, onChange, ariaLabel, stretch = false }: SegmentedControlProps<T>) => (
  <div className={classNames(styles.group, stretch && styles.stretch)} role="group" aria-label={ariaLabel}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        className={classNames(styles.segment, option.value === value && styles.active)}
        aria-pressed={option.value === value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
