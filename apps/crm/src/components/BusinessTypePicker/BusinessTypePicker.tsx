import { BusinessType } from '@noname/types';
import { classNames } from '@noname/ui';
import styles from './BusinessTypePicker.module.css';

const options = [
  { value: BusinessType.Restaurant, label: 'Restaurant', detail: 'Tables, kitchen tickets' },
  { value: BusinessType.Cafe, label: 'Café / quick service', detail: 'Counter and takeaway' },
  { value: BusinessType.Retail, label: 'Retail store', detail: 'Barcodes and stock' },
  { value: BusinessType.Other, label: 'Other', detail: 'Services and more' },
];

export interface BusinessTypePickerProps {
  value: BusinessType;
  onChange: (value: BusinessType) => void;
}

export const BusinessTypePicker = ({ value, onChange }: BusinessTypePickerProps) => (
  <div className={styles.field}>
    <span className={styles.label}>Type of business</span>
    <div className={styles.grid}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={classNames(styles.option, option.value === value && styles.selected)}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          <small className={styles.detail}>{option.detail}</small>
        </button>
      ))}
    </div>
  </div>
);
