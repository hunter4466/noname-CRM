import type { ReactNode } from 'react';
import { ChipVariant } from '../../types/ChipVariant';
import styles from './Chip.module.css';

export interface ChipProps {
  variant?: ChipVariant;
  children: ReactNode;
}

export const Chip = ({ variant = ChipVariant.Default, children }: ChipProps) => (
  <span className={`${styles.chip} ${styles[variant]}`}>{children}</span>
);
