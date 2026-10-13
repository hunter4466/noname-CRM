import type { Kpi } from '@noname/types';
import { Card } from '@noname/ui';
import styles from './KpiCard.module.css';

export interface KpiCardProps {
  kpi: Kpi;
}

export const KpiCard = ({ kpi }: KpiCardProps) => (
  <Card className={styles.card}>
    <div className={styles.label}>{kpi.label}</div>
    <div className={styles.value}>{kpi.value}</div>
    <div className="hint">
      {kpi.delta && <span className={kpi.deltaIsPositive ? styles.positive : styles.negative}>{kpi.delta}</span>} {kpi.hint}
    </div>
  </Card>
);
