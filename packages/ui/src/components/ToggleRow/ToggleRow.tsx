import type { ReactNode } from 'react';
import { Switch } from '../Switch/Switch';
import styles from './ToggleRow.module.css';

export interface ToggleRowProps {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  trailing?: ReactNode;
}

export const ToggleRow = ({ label, hint, checked, onChange, trailing }: ToggleRowProps) => (
  <div className={styles.row}>
    <div>
      <div className={styles.label}>{label}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
    </div>
    {trailing ?? <Switch checked={checked} onChange={onChange} ariaLabel={label} />}
  </div>
);
