import { classNames } from '@noname/ui';
import type { ReactNode } from 'react';
import styles from './TableCell.module.css';

export interface TableCellProps {
  children?: ReactNode;
  alignEnd?: boolean;
  money?: boolean;
  muted?: boolean;
  strong?: boolean;
}

export const TableCell = ({ children, alignEnd = false, money = false, muted = false, strong = false }: TableCellProps) => (
  <td className={classNames(alignEnd && styles.alignEnd, money && styles.money, muted && styles.muted, strong && styles.strong)}>
    {children}
  </td>
);
