import { SunatDocumentStatus, type SunatSnapshot } from '@noname/types';
import { Card, CardBody, CardHeader, Pill, PillTone } from '@noname/ui';
import Link from 'next/link';
import { Route } from '@/types/Route';
import { SunatStatusBar } from '../SunatStatusBar/SunatStatusBar';
import styles from './SunatSummaryCard.module.css';

const alertPill: Partial<Record<SunatDocumentStatus, { tone: PillTone; label: string }>> = {
  [SunatDocumentStatus.Rejected]: { tone: PillTone.Bad, label: 'Rechazado' },
  [SunatDocumentStatus.Queued]: { tone: PillTone.Warn, label: 'En cola' },
};

export interface SunatSummaryCardProps {
  sunat: SunatSnapshot;
}

export const SunatSummaryCard = ({ sunat }: SunatSummaryCardProps) => (
  <Card>
    <CardHeader
      title="SUNAT · comprobantes"
      actions={
        <Link href={Route.Configuration} className={styles.link}>
          Ajustes
        </Link>
      }
    />
    <CardBody>
      <SunatStatusBar accepted={sunat.accepted} pending={sunat.pending} rejected={sunat.rejected} />
      <div className={styles.alerts}>
        {sunat.alerts.map((alert) => (
          <div key={alert.title} className={styles.alert}>
            {alertPill[alert.status] && (
              <Pill tone={alertPill[alert.status]!.tone} withDot>
                {alertPill[alert.status]!.label}
              </Pill>
            )}
            <div>
              <div className={alert.isMonospace ? 'mono' : undefined}>{alert.title}</div>
              <div className="hint">{alert.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);
