'use client';

import { classNames } from '@noname/ui';
import Link from 'next/link';
import { useCategories } from '@/hooks/useCategories';
import { CatalogTab } from '@/types/CatalogTab';
import { Route } from '@/types/Route';
import styles from './CatalogTabs.module.css';

const tabs = [
  { key: CatalogTab.Products, label: 'Products', href: Route.Products },
  { key: CatalogTab.Combos, label: 'Combos', href: Route.Combos },
  { key: CatalogTab.ModifierGroups, label: 'Modifier groups', href: Route.ModifierGroups },
];

export interface CatalogTabsProps {
  active: CatalogTab;
  counts: Partial<Record<CatalogTab, number>>;
}

export const CatalogTabs = ({ active, counts }: CatalogTabsProps) => {
  const { data: categories } = useCategories();
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          role="tab"
          aria-selected={tab.key === active}
          className={classNames(styles.tab, tab.key === active && styles.active)}
        >
          {tab.label}
          {counts[tab.key] !== undefined && <span className={styles.count}>{counts[tab.key]}</span>}
        </Link>
      ))}
      <span className={styles.tab} role="tab" aria-selected={false} aria-disabled="true">
        Categories
        {categories && <span className={styles.count}>{categories.length}</span>}
      </span>
    </div>
  );
};
