import type { ReactNode } from 'react';
import styles from './Table.module.css';

export interface TableColumn {
  label: ReactNode;
  alignEnd?: boolean;
  wide?: boolean;
}

export interface TableProps {
  columns: TableColumn[];
  children: ReactNode;
}

export const Table = ({ columns, children }: TableProps) => (
  <div className={styles.scroll}>
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className={`${column.alignEnd ? styles.alignEnd : ''} ${column.wide ? styles.wide : ''}`}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);
