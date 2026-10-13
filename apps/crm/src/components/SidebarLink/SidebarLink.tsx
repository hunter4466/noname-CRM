'use client';

import { classNames } from '@noname/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isNavItemActive, type NavItem } from '@/lib/navigation';
import styles from './SidebarLink.module.css';

export interface SidebarLinkProps {
  item: NavItem;
  nested?: boolean;
  badge?: string;
}

export const SidebarLink = ({ item, nested = false, badge }: SidebarLinkProps) => {
  const pathname = usePathname();
  const Icon = item.icon;
  const className = classNames(styles.link, nested && styles.nested);
  if (!item.href) {
    return (
      <span className={className} aria-disabled="true" title="Próximamente">
        <Icon size={nested ? 16 : 18} />
        {item.label}
      </span>
    );
  }
  const isActive = isNavItemActive(item, pathname);
  return (
    <Link href={item.href} className={classNames(className, isActive && styles.active)} aria-current={isActive ? 'page' : undefined}>
      <Icon size={nested ? 16 : 18} />
      {item.label}
      {badge && <small className={styles.badge}>{badge}</small>}
    </Link>
  );
};
