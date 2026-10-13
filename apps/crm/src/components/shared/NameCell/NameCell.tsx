import { Thumb } from '@noname/ui';
import type { Tone } from '@noname/types';
import Link from 'next/link';
import { toInitials } from '@/lib/toInitials';
import styles from './NameCell.module.css';

export interface NameCellProps {
  name: string;
  code: string;
  href: string;
  tone: Tone;
  initials?: string;
}

export const NameCell = ({ name, code, href, tone, initials }: NameCellProps) => (
  <div className={styles.cell}>
    <Thumb initials={initials ?? toInitials(name)} tone={tone} />
    <div>
      <Link href={href} className={styles.name}>
        {name}
      </Link>
      <div className="hint mono">{code}</div>
    </div>
  </div>
);
