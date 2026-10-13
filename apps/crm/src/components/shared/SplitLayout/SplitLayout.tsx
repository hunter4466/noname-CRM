import type { ReactNode } from 'react';
import styles from './SplitLayout.module.css';

export interface SplitLayoutProps {
  main: ReactNode;
  aside: ReactNode;
  asideFirst?: boolean;
}

/** Editor layout: wide form column + sticky side column (POS preview, group list). */
export const SplitLayout = ({ main, aside, asideFirst = false }: SplitLayoutProps) => (
  <div className={`${styles.split} ${asideFirst ? styles.asideFirst : ''}`}>
    <div className={styles.main}>{main}</div>
    <div className={styles.aside}>{aside}</div>
  </div>
);
