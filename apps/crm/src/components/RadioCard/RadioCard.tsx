import { classNames, Pill, PillTone } from '@noname/ui';
import styles from './RadioCard.module.css';

export interface RadioCardProps {
  title: string;
  detail: string;
  isSelected: boolean;
  recommended?: boolean;
  onSelect: () => void;
}

export const RadioCard = ({ title, detail, isSelected, recommended = false, onSelect }: RadioCardProps) => (
  <button
    type="button"
    role="radio"
    aria-checked={isSelected}
    className={classNames(styles.card, isSelected && styles.selected)}
    onClick={onSelect}
  >
    <span className={styles.radio} />
    <span className={styles.text}>
      <span className={styles.title}>
        {title}
        {recommended && <Pill tone={PillTone.Ok}>Recommended</Pill>}
      </span>
      <span className="hint">{detail}</span>
    </span>
  </button>
);
