import { Badge, classNames, SegmentedControl } from '@noname/ui';
import type { PreviewGroup } from '@/types/PosPreview';
import { PreviewOptionState } from '@/types/PreviewOptionState';
import styles from './PreviewOptionGroup.module.css';

export interface PreviewOptionGroupProps {
  group: PreviewGroup;
}

export const PreviewOptionGroup = ({ group }: PreviewOptionGroupProps) => (
  <div className={styles.group}>
    <div className={styles.header}>
      <strong>{group.name}</strong>
      {group.badgeTone && <Badge tone={group.badgeTone}>{group.badgeLabel}</Badge>}
      <span className={styles.rule}>{group.rule}</span>
    </div>
    <div className={styles.options}>
      {group.options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={classNames(styles.option, styles[option.state])}
          aria-pressed={option.state === PreviewOptionState.Selected}
          onClick={option.onPick}
        >
          <span className={styles.label}>{option.label}</span>
          <small className={styles.note}>{option.note}</small>
        </button>
      ))}
    </div>
    {group.segments.length > 0 && (
      <SegmentedControl
        ariaLabel={`${group.name} amount`}
        options={group.segments.map((segment) => ({ value: segment.id, label: segment.label }))}
        value={group.selectedSegmentId}
        onChange={group.onSegmentChange}
        stretch
      />
    )}
  </div>
);
