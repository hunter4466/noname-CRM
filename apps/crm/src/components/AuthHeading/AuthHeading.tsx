import type { ReactNode } from 'react';
import styles from './AuthHeading.module.css';

export interface AuthHeadingProps {
  title: string;
  hint: ReactNode;
}

export const AuthHeading = ({ title, hint }: AuthHeadingProps) => (
  <div>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.hint}>{hint}</div>
  </div>
);
