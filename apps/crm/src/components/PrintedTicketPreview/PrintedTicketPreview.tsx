import type { SunatConfig } from '@noname/types';
import { breakDownIgv, formatAmount } from '@noname/domain';
import { classNames } from '@noname/ui';
import styles from './PrintedTicketPreview.module.css';

const sampleLines = [
  { label: '1 Caesar salad', amount: 24 },
  { label: '+ Extra Ranch', amount: 1.5 },
  { label: '+ Grilled chicken', amount: 8 },
];

export interface PrintedTicketPreviewProps {
  config: SunatConfig;
}

export const PrintedTicketPreview = ({ config }: PrintedTicketPreviewProps) => {
  const totals = breakDownIgv(
    sampleLines.reduce((sum, line) => sum + line.amount, 0),
    config.igvRate,
  );
  const rows = [
    ...sampleLines.map((line) => ({ label: line.label, value: formatAmount(line.amount), isRule: false })),
    { label: 'Op. gravada', value: formatAmount(totals.taxableAmount), isRule: true },
    { label: `IGV ${config.igvRate}%`, value: formatAmount(totals.igvAmount), isRule: false },
    { label: 'TOTAL S/', value: formatAmount(totals.total), isRule: false },
  ];
  return (
    <div className={classNames(styles.ticket, config.ticketPaperWidthMm === 58 && styles.narrow)} aria-label="Ticket preview">
      <div className={styles.center}>{config.commercialName || '[YOUR BRAND]'}</div>
      <div className={styles.center}>{config.legalName || '[RAZÓN SOCIAL S.A.C.]'}</div>
      <div className={styles.center}>RUC {config.ruc || '20XXXXXXXXX'}</div>
      <div className={styles.center}>{config.fiscalAddress || 'Av. José Larco 812, Miraflores'}</div>
      <div className={styles.rule} />
      <div className={styles.center}>BOLETA DE VENTA ELECTRÓNICA</div>
      <div className={styles.center}>B001-00012879</div>
      <div className={styles.rule} />
      {rows.map((row) => (
        <div key={row.label} className={classNames(styles.line, row.isRule && styles.ruled)}>
          <span>{row.label}</span>
          <span>{row.value}</span>
        </div>
      ))}
      <div className={styles.qr} aria-hidden="true" />
      <div className={styles.center}>{config.ticketFooter}</div>
    </div>
  );
};
