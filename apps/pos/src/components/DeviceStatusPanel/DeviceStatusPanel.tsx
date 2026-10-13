'use client';

import { IconBrandMark } from '@noname/ui/icons';
import { useClock } from '@/hooks/useClock';
import { useTerminal } from '@/hooks/useTerminal';
import { StatusDot } from '../StatusDot/StatusDot';
import styles from './DeviceStatusPanel.module.css';

export const DeviceStatusPanel = () => {
  const clock = useClock();
  const { data: terminal } = useTerminal();
  return (
    <aside className={styles.panel}>
      <div className={styles.brand}>
        <span className={styles.mark}>
          <IconBrandMark />
        </span>
        CRM POS
      </div>
      <div>
        <div className={styles.time}>{clock.time}</div>
        <div className={styles.date}>{clock.date}</div>
      </div>
      {terminal && (
        <div className={styles.device}>
          <div className={styles.name}>{`${terminal.locationName} · ${terminal.terminalName}`}</div>
          <StatusDot isOk={terminal.isOnline} label={terminal.syncedLabel} />
          <StatusDot isOk={terminal.sunatConnected} label={terminal.sunatConnected ? 'SUNAT conectado' : 'SUNAT no disponible'} />
          <StatusDot
            isOk={!terminal.printerPaperLow}
            label={`${terminal.printerLabel}${terminal.printerPaperLow ? ' · poco papel' : ''}`}
          />
          <div className={styles.code}>Equipo {terminal.deviceCode}</div>
        </div>
      )}
    </aside>
  );
};
