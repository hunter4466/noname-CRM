import type { SessionUser } from '@noname/types';
import type { ReactNode } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './AppShell.module.css';

export interface AppShellProps {
  user: SessionUser;
  children: ReactNode;
}

export const AppShell = ({ user, children }: AppShellProps) => (
  <div className={styles.shell}>
    <Sidebar user={user} />
    <main className={styles.main}>{children}</main>
  </div>
);
