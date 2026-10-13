import type { Terminal } from '@noname/types';
import { Pill } from '@noname/ui';
import { IconTerminal } from '@noname/ui/icons';
import { terminalStatus } from '@/lib/locationStatus';
import styles from './TerminalRow.module.css';

export interface TerminalRowProps {
  terminal: Terminal;
}

export const TerminalRow = ({ terminal }: TerminalRowProps) => {
  const status = terminalStatus(terminal.status, terminal.paperLow);
  const meta = [
    { label: 'Equipo', value: terminal.deviceCode, isMonospace: true },
    { label: 'Serie', value: `${terminal.boletaSeries} · ${terminal.facturaSeries}`, isMonospace: true },
    { label: 'Impresoras', value: terminal.printerLabel, isMonospace: false },
  ];
  return (
    <div className={styles.row}>
      <span className={styles.icon}>
        <IconTerminal />
      </span>
      <div className={styles.identity}>
        <div className={styles.name}>{terminal.name}</div>
        <div className="hint">{terminal.placement}</div>
      </div>
      <div className={styles.meta}>
        {meta.map((item) => (
          <div key={item.label} className={styles.metaItem}>
            <span className={styles.metaLabel}>{item.label}</span>
            <span className={item.isMonospace ? 'mono' : undefined}>{item.value}</span>
          </div>
        ))}
      </div>
      <Pill tone={status.tone} withDot={status.withDot}>
        {status.label}
      </Pill>
    </div>
  );
};
