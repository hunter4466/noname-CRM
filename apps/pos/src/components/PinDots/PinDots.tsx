import { classNames } from '@noname/ui';
import styles from './PinDots.module.css';

export interface PinDotsProps {
  length: number;
  filled: number;
}

export const PinDots = ({ length, filled }: PinDotsProps) => (
  <div className={styles.dots} aria-label={`${filled} of ${length} digits entered`}>
    {Array.from({ length }, (_, index) => (
      <span key={index} className={classNames(styles.dot, index < filled && styles.filled)} />
    ))}
  </div>
);
