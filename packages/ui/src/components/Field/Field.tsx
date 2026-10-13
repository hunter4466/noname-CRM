import type { ReactNode } from 'react';
import { classNames } from '../../classNames';
import styles from './Field.module.css';

export interface FieldProps {
  label: ReactNode;
  htmlFor?: string;
  hint?: ReactNode;
  aside?: ReactNode;
  fullRow?: boolean;
  children: ReactNode;
}

export const Field = ({ label, htmlFor, hint, aside, fullRow = false, children }: FieldProps) => (
  <div className={classNames(styles.field, fullRow && styles.fullRow)}>
    <div className={styles.labelRow}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {aside}
    </div>
    {children}
    {hint && <div className={styles.hint}>{hint}</div>}
  </div>
);
