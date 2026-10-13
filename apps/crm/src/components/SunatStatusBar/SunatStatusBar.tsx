import { SunatDocumentStatus } from '@noname/types';
import styles from './SunatStatusBar.module.css';

export interface SunatStatusBarProps {
  accepted: number;
  pending: number;
  rejected: number;
}

export const SunatStatusBar = ({ accepted, pending, rejected }: SunatStatusBarProps) => {
  const total = Math.max(1, accepted + pending + rejected);
  const segments = [
    { key: SunatDocumentStatus.Accepted, count: accepted, className: styles.accepted, label: 'Accepted', valueClass: undefined },
    { key: SunatDocumentStatus.Queued, count: pending, className: styles.pending, label: 'Pending', valueClass: styles.pendingValue },
    { key: SunatDocumentStatus.Rejected, count: rejected, className: styles.rejected, label: 'Rejected', valueClass: styles.rejectedValue },
  ];
  let offset = 0;
  return (
    <>
      <svg className={styles.bar} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        {segments.map((segment) => {
          const width = (segment.count / total) * 100;
          const rect = <rect key={segment.key} className={segment.className} x={offset} y={0} width={width} height={10} />;
          offset += width;
          return rect;
        })}
      </svg>
      <div className={styles.counts}>
        {segments.map((segment) => (
          <div key={segment.key}>
            <div className={`${styles.value} ${segment.valueClass ?? ''}`}>{segment.count}</div>
            <div className="hint">{segment.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};
