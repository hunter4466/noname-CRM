import { classNames } from '@noname/ui';
import styles from './StatusDot.module.css';

export interface StatusDotProps {
  isOk: boolean;
  label: string;
}

export const StatusDot = ({ isOk, label }: StatusDotProps) => (
  <span className={styles.status}>
    <i className={classNames(styles.dot, !isOk && styles.warn)} />
    {label}
  </span>
);
