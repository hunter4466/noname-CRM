import type { ReactNode } from 'react';
import styles from './TableFooter.module.css';

export interface TableFooterProps {
  summary: ReactNode;
  actions?: ReactNode;
}

export const TableFooter = ({ summary, actions }: TableFooterProps) => (
  <div className={styles.footer}>
    <span className="hint">{summary}</span>
    {actions && <div className={styles.actions}>{actions}</div>}
  </div>
);
