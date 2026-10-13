import { classNames } from '@noname/ui';
import styles from './ComboSlotNumber.module.css';

export interface ComboSlotNumberProps {
  number: number;
  small?: boolean;
}

export const ComboSlotNumber = ({ number, small = false }: ComboSlotNumberProps) => (
  <span className={classNames(styles.number, small && styles.small)}>{number}</span>
);
