import type { MenuCategory, MenuItem } from '@noname/types';
import { classNames } from '@noname/ui';
import { MenuFilter } from '@/types/MenuFilter';
import { pluralize } from '@/lib/pluralize';
import styles from './CategoryRail.module.css';

export interface CategoryRailProps {
  categories: MenuCategory[];
  items: MenuItem[];
  selectedId: string;
  onSelect: (categoryId: string) => void;
}

export const CategoryRail = ({ categories, items, selectedId, onSelect }: CategoryRailProps) => {
  const entries = [
    { id: MenuFilter.All as string, name: 'Todos', count: items.length },
    ...categories.map((category) => ({ ...category, count: items.filter((item) => item.categoryId === category.id).length })),
  ];
  return (
    <nav className={styles.rail} aria-label="Categorías">
      {entries.map((entry) => (
        <button
          key={entry.id}
          type="button"
          className={classNames(styles.category, entry.id === selectedId && styles.selected)}
          aria-pressed={entry.id === selectedId}
          onClick={() => onSelect(entry.id)}
        >
          {entry.name}
          <small className={styles.count}>{pluralize(entry.count, 'ítem')}</small>
        </button>
      ))}
    </nav>
  );
};
