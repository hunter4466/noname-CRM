import { BusinessType } from '@noname/types';
import { classNames } from '@noname/ui';
import styles from './BusinessTypePicker.module.css';

const options = [
  { value: BusinessType.Restaurant, label: 'Restaurante', detail: 'Mesas, comandas' },
  { value: BusinessType.Cafe, label: 'Cafetería / comida rápida', detail: 'Mostrador y para llevar' },
  { value: BusinessType.Retail, label: 'Tienda minorista', detail: 'Códigos de barras y stock' },
  { value: BusinessType.Other, label: 'Otro', detail: 'Servicios y más' },
];

export interface BusinessTypePickerProps {
  value: BusinessType;
  onChange: (value: BusinessType) => void;
}

export const BusinessTypePicker = ({ value, onChange }: BusinessTypePickerProps) => (
  <div className={styles.field}>
    <span className={styles.label}>Tipo de negocio</span>
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
