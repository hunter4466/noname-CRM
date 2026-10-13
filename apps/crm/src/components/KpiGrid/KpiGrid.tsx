import type { Kpi } from '@noname/types';
import { KpiCard } from '../KpiCard/KpiCard';
import styles from './KpiGrid.module.css';

export interface KpiGridProps {
  kpis: Kpi[];
}

export const KpiGrid = ({ kpis }: KpiGridProps) => (
  <section className={styles.grid} aria-label="Key figures">
    {kpis.map((kpi) => (
      <KpiCard key={kpi.label} kpi={kpi} />
    ))}
  </section>
);
