import type { ReactNode } from 'react';
import { AuthBrandPanel } from '../AuthBrandPanel/AuthBrandPanel';
import styles from './AuthLayout.module.css';

export interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className={styles.layout}>
    <AuthBrandPanel />
    <main className={styles.formPanel}>
      <div className={styles.formBox}>{children}</div>
    </main>
  </div>
);
