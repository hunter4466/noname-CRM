import type { IgvBreakdown } from '@noname/domain';
import { formatMoney } from '@noname/domain';
import styles from './OrderTotals.module.css';

export interface OrderTotalsProps {
  breakdown: IgvBreakdown;
}

export const OrderTotals = ({ breakdown }: OrderTotalsProps) => (
  <div className={styles.totals}>
    <div className={styles.row}>
      <span>Op. gravada</span>
      <span className="mono">{formatMoney(breakdown.taxableAmount)}</span>
    </div>
    <div className={styles.row}>
      <span>IGV 18%</span>
      <span className="mono">{formatMoney(breakdown.igvAmount)}</span>
    </div>
    <div className={`${styles.row} ${styles.total}`}>
      <span>Total</span>
      <span className="mono">{formatMoney(breakdown.total)}</span>
    </div>
  </div>
);
