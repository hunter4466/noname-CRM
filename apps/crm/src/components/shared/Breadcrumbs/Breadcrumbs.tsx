import Link from 'next/link';
import { Fragment } from 'react';
import styles from './Breadcrumbs.module.css';

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav className={styles.crumbs} aria-label="Ruta de navegación">
    {items.map((item, index) => (
      <Fragment key={item.label}>
        {index > 0 && <span aria-hidden="true">/</span>}
        {item.href ? (
          <Link href={item.href} className={styles.link}>
            {item.label}
          </Link>
        ) : (
          <span className={styles.current} aria-current="page">
            {item.label}
          </span>
        )}
      </Fragment>
    ))}
  </nav>
);
