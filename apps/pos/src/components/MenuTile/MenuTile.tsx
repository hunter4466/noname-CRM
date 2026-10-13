import type { MenuItem } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { classNames } from '@noname/ui';
import { toInitials } from '@/lib/toInitials';
import styles from './MenuTile.module.css';

const tileBadge = (item: MenuItem) => {
  if (item.isOutOfStock) {
    return 'Out of stock';
  }
  if (item.modifierGroupIds.length === 0) {
    return null;
  }
  return item.isCombo ? `${item.modifierGroupIds.length} choices` : 'Options';
};

export interface MenuTileProps {
  item: MenuItem;
  onPick: () => void;
}

export const MenuTile = ({ item, onPick }: MenuTileProps) => {
  const badge = tileBadge(item);
  return (
    <button
      type="button"
      className={classNames(styles.tile, styles[item.categoryId], item.isOutOfStock && styles.out)}
      disabled={item.isOutOfStock}
      onClick={onPick}
    >
      <span className={styles.swatch}>{item.isCombo ? 'CO' : toInitials(item.name)}</span>
      {badge && <span className={styles.badge}>{badge}</span>}
      <span className={styles.text}>
        <span className={styles.name}>{item.name}</span>
        <span className={styles.price}>{formatMoney(item.price)}</span>
      </span>
    </button>
  );
};
