import { CardHeader } from '@noname/ui';
import type { ReactNode } from 'react';
import styles from './SunatSectionHeader.module.css';

export interface SunatSectionHeaderProps {
  number: number;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const SunatSectionHeader = ({ number, title, subtitle, actions }: SunatSectionHeaderProps) => (
  <CardHeader
    title={
      <>
        <span className={styles.number}>{number}</span>
        {title}
      </>
    }
    subtitle={subtitle}
    actions={actions}
  />
);
