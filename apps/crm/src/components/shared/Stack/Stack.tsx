import type { ReactNode } from 'react';
import styles from './Stack.module.css';

export interface StackProps {
  children: ReactNode;
}

/** Vertical stack with the standard 20px gap between page sections. */
export const Stack = ({ children }: StackProps) => <div className={styles.stack}>{children}</div>;
