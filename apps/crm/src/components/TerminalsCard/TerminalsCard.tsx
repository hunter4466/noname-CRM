import { TerminalStatus, type TerminalSnapshot } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { Card, CardHeader, Pill, PillTone } from '@noname/ui';
import Link from 'next/link';
import { Route } from '@/types/Route';
import { Table } from '../shared/Table/Table';
import { TableCell } from '../shared/TableCell/TableCell';
import styles from './TerminalsCard.module.css';

export interface TerminalsCardProps {
  terminals: TerminalSnapshot[];
}

export const TerminalsCard = ({ terminals }: TerminalsCardProps) => (
  <Card>
    <CardHeader
      title="Terminals"
      actions={
        <Link href={Route.Locations} className={styles.link}>
          Manage locations
        </Link>
      }
    />
    <Table columns={[{ label: 'Terminal' }, { label: 'Status' }, { label: 'Printer' }, { label: 'Sales today', alignEnd: true }]}>
      {terminals.map((terminal) => (
        <tr key={terminal.id}>
          <TableCell>
            <div className={styles.name}>{terminal.name}</div>
            <div className="hint">{terminal.locationName}</div>
          </TableCell>
          <TableCell>
            <Pill tone={terminal.status === TerminalStatus.Online ? PillTone.Ok : PillTone.Bad} withDot>
              {terminal.statusLabel}
            </Pill>
          </TableCell>
          <TableCell muted>{terminal.paperLow ? <Pill tone={PillTone.Warn}>Paper low</Pill> : terminal.printerLabel}</TableCell>
          <TableCell money>{formatMoney(terminal.salesToday)}</TableCell>
        </tr>
      ))}
    </Table>
  </Card>
);
