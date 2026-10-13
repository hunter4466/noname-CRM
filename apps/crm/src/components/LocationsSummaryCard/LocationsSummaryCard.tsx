import type { LocationsSummary } from '@noname/types';
import { Card } from '@noname/ui';
import styles from './LocationsSummaryCard.module.css';

export interface LocationsSummaryCardProps {
  summary: LocationsSummary;
}

export const LocationsSummaryCard = ({ summary }: LocationsSummaryCardProps) => {
  const figures = [
    { label: 'Locations', value: summary.locationCount },
    { label: 'Points of sale', value: summary.terminalCount },
    { label: 'Online now', value: summary.onlineCount },
    { label: 'Printers paired', value: summary.printerCount },
  ];
  return (
    <Card ariaLabel="Summary" className={styles.summary}>
      {figures.map((figure) => (
        <div key={figure.label} className={styles.figure}>
          <b className={styles.value}>{figure.value}</b>
          <span className="hint">{figure.label}</span>
        </div>
      ))}
    </Card>
  );
};
