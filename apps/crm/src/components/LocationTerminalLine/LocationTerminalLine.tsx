import type { Terminal } from '@noname/types';
import { Pill } from '@noname/ui';
import { IconTerminal } from '@noname/ui/icons';
import { terminalStatus } from '@/lib/locationStatus';
import styles from './LocationTerminalLine.module.css';

export interface LocationTerminalLineProps {
  terminal: Terminal;
}

export const LocationTerminalLine = ({ terminal }: LocationTerminalLineProps) => {
  const status = terminalStatus(terminal.status, false);
  return (
    <div className={styles.line}>
      <span className={styles.icon}>
        <IconTerminal size={16} />
      </span>
      <div className={styles.text}>
        <div className={styles.name}>{terminal.name}</div>
        <div className="hint">{terminal.placement}</div>
      </div>
      <Pill tone={status.tone} withDot>
        {status.label}
      </Pill>
    </div>
  );
};
