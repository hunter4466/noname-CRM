import type { ReactNode } from 'react';
import styles from './CardBody.module.css';

export interface CardBodyProps {
  children: ReactNode;
}

export const CardBody = ({ children }: CardBodyProps) => <div className={styles.body}>{children}</div>;
