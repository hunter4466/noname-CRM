import type { ReactNode } from 'react';
import { PillTone } from '../../types/PillTone';
import styles from './Pill.module.css';

export interface PillProps {
  tone?: PillTone;
  withDot?: boolean;
  children: ReactNode;
}

export const Pill = ({ tone = PillTone.Neutral, withDot = false, children }: PillProps) => (
  <span className={`${styles.pill} ${styles[tone]}`}>
    {withDot && <span className={styles.dot} />}
    {children}
  </span>
);
