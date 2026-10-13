import { classNames } from '@noname/ui';
import type { TicketLine } from '@/types/PosPreview';
import styles from './TicketPreview.module.css';

export interface TicketPreviewProps {
  title: string;
  lines: TicketLine[];
  total: string;
  note?: string;
}

export const TicketPreview = ({ title, lines, total, note }: TicketPreviewProps) => (
  <div className={styles.wrapper}>
    <div className={styles.title}>{title}</div>
    <div className={styles.ticket}>
      {lines.map((line, index) => (
        <div key={`${line.label}-${index}`} className={classNames(styles.line, line.isModifier && styles.modifier)}>
          <span>{line.label}</span>
          <span>{line.amount}</span>
        </div>
      ))}
      <div className={classNames(styles.line, styles.total)}>
        <span>Total (IGV incl.)</span>
        <span>{total}</span>
      </div>
    </div>
    {note && <div className="hint">{note}</div>}
  </div>
);
