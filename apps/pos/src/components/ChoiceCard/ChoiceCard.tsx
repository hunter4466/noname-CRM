import { classNames } from '@noname/ui';
import styles from './ChoiceCard.module.css';

export interface ChoiceCardProps {
  label: string;
  detail: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const ChoiceCard = ({ label, detail, isSelected, onSelect }: ChoiceCardProps) => (
  <button type="button" className={classNames(styles.card, isSelected && styles.selected)} aria-pressed={isSelected} onClick={onSelect}>
    {label}
    <small className={styles.detail}>{detail}</small>
  </button>
);
