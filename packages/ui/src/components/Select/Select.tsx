import type { SelectHTMLAttributes } from 'react';
import { classNames } from '../../classNames';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[];
  large?: boolean;
}

export const Select = ({ options, large = false, className, ...props }: SelectProps) => (
  <select className={classNames(styles.select, large && styles.large, className)} {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
