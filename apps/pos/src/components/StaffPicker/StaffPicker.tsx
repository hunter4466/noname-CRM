'use client';

import { classNames } from '@noname/ui';
import { useStaff } from '@/hooks/useStaff';
import styles from './StaffPicker.module.css';

export interface StaffPickerProps {
  selectedId: string | null;
  onSelect: (staffId: string) => void;
}

export const StaffPicker = ({ selectedId, onSelect }: StaffPickerProps) => {
  const { data: staff = [] } = useStaff();
  return (
    <div className={styles.grid}>
      {staff.map((member) => (
        <button
          key={member.id}
          type="button"
          className={classNames(styles.person, member.id === selectedId && styles.selected)}
          aria-pressed={member.id === selectedId}
          onClick={() => onSelect(member.id)}
        >
          <span className={styles.avatar}>{member.initials}</span>
          <span className={styles.name}>{member.fullName}</span>
          <small className="hint">{member.roleName}</small>
        </button>
      ))}
    </div>
  );
};
