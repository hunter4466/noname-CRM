import type { ModifierGroup } from '@noname/types';
import { Card, classNames, Pill, PillTone } from '@noname/ui';
import { pluralize } from '@/lib/pluralize';
import { describeGroupRules } from '@/lib/modifierGroupRules';
import { SearchInput } from '../shared/SearchInput/SearchInput';
import styles from './ModifierGroupList.module.css';

export interface ModifierGroupListProps {
  groups: ModifierGroup[];
  search: string;
  onSearch: (value: string) => void;
  activeId: string;
  onSelect: (groupId: string) => void;
}

export const ModifierGroupList = ({ groups, search, onSearch, activeId, onSelect }: ModifierGroupListProps) => {
  const visible = groups.filter((group) => group.name.toLowerCase().includes(search.trim().toLowerCase()));
  return (
    <Card ariaLabel="Groups" className={styles.list}>
      <div className={styles.search}>
        <SearchInput value={search} onChange={onSearch} placeholder="Search groups" ariaLabel="Search groups" />
      </div>
      {visible.map((group) => (
        <button
          key={group.id}
          type="button"
          className={classNames(styles.item, group.id === activeId && styles.active)}
          aria-current={group.id === activeId}
          onClick={() => onSelect(group.id)}
        >
          <span className={styles.top}>
            {group.name}
            {group.minSelections > 0 && <Pill tone={PillTone.Warn}>Required</Pill>}
            <span className="hint">{group.isNested ? 'nested' : pluralize(group.usedInProductNames.length, 'product')}</span>
          </span>
          <span className="hint">{describeGroupRules(group)}</span>
        </button>
      ))}
    </Card>
  );
};
