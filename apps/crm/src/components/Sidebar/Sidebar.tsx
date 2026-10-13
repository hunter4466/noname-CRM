'use client';

import type { SessionUser } from '@noname/types';
import { classNames } from '@noname/ui';
import { IconPlus } from '@noname/ui/icons';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { configurationNav } from '@/lib/navigation';
import { BrandLogo } from '../BrandLogo/BrandLogo';
import { SidebarLink } from '../SidebarLink/SidebarLink';
import { SidebarModuleGroup } from '../SidebarModuleGroup/SidebarModuleGroup';
import { SidebarUserCard } from '../SidebarUserCard/SidebarUserCard';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  user: SessionUser;
}

export const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null);
  // The phone menu closes by itself on navigation: it is only open for the path it was opened on.
  const isMenuOpen = openedOnPath === pathname;
  return (
    <nav className={styles.rail} aria-label="Navegación principal">
      <div className={styles.brand}>
        <BrandLogo />
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={isMenuOpen}
          aria-controls="main-nav-content"
          onClick={() => setOpenedOnPath(isMenuOpen ? null : pathname)}
        >
          {isMenuOpen ? 'Cerrar' : 'Menú'}
        </button>
      </div>
      <div id="main-nav-content" className={classNames(styles.content, isMenuOpen && styles.open)}>
        <div className={styles.section}>Mis módulos</div>
        <SidebarModuleGroup />
        <span className={styles.addModule} aria-disabled="true">
          <IconPlus />
          Agregar módulo
        </span>
        <div className={styles.footer}>
          <div className={styles.section}>Configuración</div>
          {configurationNav.map((item) => (
            <SidebarLink key={item.key} item={item} />
          ))}
          <SidebarUserCard user={user} />
        </div>
      </div>
    </nav>
  );
};
