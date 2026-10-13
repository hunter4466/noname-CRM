import type { LocationsSummary } from '@noname/types';
import { Card } from '@noname/ui';
import styles from './LocationsSummaryCard.module.css';

export interface LocationsSummaryCardProps {
  summary: LocationsSummary;
}

export const LocationsSummaryCard = ({ summary }: LocationsSummaryCardProps) => {
  const figures = [
    { label: 'Locales', value: summary.locationCount },
    { label: 'Puntos de venta', value: summary.terminalCount },
    { label: 'En línea ahora', value: summary.onlineCount },
    { label: 'Impresoras vinculadas', value: summary.printerCount },
  ];
  return (
    <Card ariaLabel="Resumen" className={styles.summary}>
      {figures.map((figure) => (
        <div key={figure.label} className={styles.figure}>
          <b className={styles.value}>{figure.value}</b>
          <span className="hint">{figure.label}</span>
        </div>
      ))}
    </Card>
  );
};
