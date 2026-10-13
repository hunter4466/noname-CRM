'use client';

import { IconBrandMark, IconLock } from '@noname/ui/icons';
import { useClock } from '@/hooks/useClock';
import { useLockRegister } from '@/hooks/useLockRegister';
import { usePosSession } from '@/hooks/usePosSession';
import { useTerminal } from '@/hooks/useTerminal';
import { StatusDot } from '../StatusDot/StatusDot';
import styles from './RegisterTopBar.module.css';

export const RegisterTopBar = () => {
  const clock = useClock();
  const { data: terminal } = useTerminal();
  const { data: session } = usePosSession();
  const lock = useLockRegister();
  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.mark}>
          <IconBrandMark size={16} />
        </span>
        <span className={styles.brand}>CRM POS</span>
        <span className={styles.separator} aria-hidden="true" />
        <span className={styles.where}>
          {terminal?.locationName}
          <small>{terminal?.terminalName}</small>
        </span>
      </div>
      <div className={styles.right}>
        {terminal && <StatusDot isOk={terminal.isOnline} label={terminal.isOnline ? 'Online' : 'Offline'} />}
        {terminal && <StatusDot isOk={terminal.sunatConnected} label="SUNAT" />}
        {terminal && <StatusDot isOk={!terminal.printerPaperLow} label={terminal.printerPaperLow ? 'Printer · paper low' : 'Printer'} />}
        <span className={styles.clock}>{clock.time}</span>
        {session && (
          <span className={styles.who}>
            <span className={styles.avatar}>{session.staff.initials}</span>
            {session.staff.fullName}
          </span>
        )}
        <button type="button" className={styles.lock} aria-label="Lock register" disabled={lock.isPending} onClick={() => lock.mutate()}>
          <IconLock />
        </button>
      </div>
    </header>
  );
};
