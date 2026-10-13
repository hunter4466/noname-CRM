import type { ReactNode } from 'react';
import styles from './ChipList.module.css';

export interface ChipListProps {
  children: ReactNode;
}

export const ChipList = ({ children }: ChipListProps) => <div className={styles.list}>{children}</div>;
