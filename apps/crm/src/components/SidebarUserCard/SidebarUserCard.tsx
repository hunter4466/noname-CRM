'use client';

import type { SessionUser } from '@noname/types';
import { IconLogout } from '@noname/ui/icons';
import { useLogout } from '@/hooks/useLogout';
import styles from './SidebarUserCard.module.css';

export interface SidebarUserCardProps {
  user: SessionUser;
}

export const SidebarUserCard = ({ user }: SidebarUserCardProps) => {
  const logout = useLogout();
  return (
    <>
      <div className={styles.card}>
        <span className={styles.avatar}>{user.initials}</span>
        <div className={styles.identity}>
          <span className={styles.name}>{user.fullName}</span>
          <span className={styles.role}>{user.roleName}</span>
        </div>
      </div>
      <button type="button" className={styles.logout} onClick={() => logout.mutate()} disabled={logout.isPending}>
        <IconLogout />
        Cerrar sesión
      </button>
    </>
  );
};
