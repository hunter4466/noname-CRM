import type { ReactNode } from 'react';
import { Breadcrumbs, type Breadcrumb } from '../Breadcrumbs/Breadcrumbs';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  breadcrumbs: Breadcrumb[];
  title: string;
  lede?: ReactNode;
  leading?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
}

export const PageHeader = ({ breadcrumbs, title, lede, leading, meta, actions }: PageHeaderProps) => (
  <>
    <Breadcrumbs items={breadcrumbs} />
    <div className={styles.header}>
      <div className={styles.titleBlock}>
        {leading}
        <div>
          <h1 className={styles.title}>{title}</h1>
          {meta && <div className={styles.meta}>{meta}</div>}
          {lede && <p className={styles.lede}>{lede}</p>}
        </div>
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  </>
);
