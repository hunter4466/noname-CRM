import type { ReactNode } from 'react';
import styles from './CardHeader.module.css';

export interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export const CardHeader = ({ title, subtitle, actions }: CardHeaderProps) => (
  <div className={styles.header}>
    <div>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
    {actions && <div className={styles.actions}>{actions}</div>}
  </div>
);
