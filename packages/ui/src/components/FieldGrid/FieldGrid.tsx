import type { ReactNode } from 'react';
import styles from './FieldGrid.module.css';

export interface FieldGridProps {
  children: ReactNode;
}

export const FieldGrid = ({ children }: FieldGridProps) => <div className={styles.grid}>{children}</div>;
