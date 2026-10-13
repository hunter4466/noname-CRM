import { Tone } from '@noname/types';
import { ThumbSize } from '../../types/ThumbSize';
import styles from './Thumb.module.css';

export interface ThumbProps {
  initials: string;
  tone?: Tone;
  size?: ThumbSize;
}

export const Thumb = ({ initials, tone = Tone.Neutral, size = ThumbSize.Small }: ThumbProps) => (
  <span className={`${styles.thumb} ${styles[tone]} ${styles[size]}`} aria-hidden="true">
    {initials}
  </span>
);
