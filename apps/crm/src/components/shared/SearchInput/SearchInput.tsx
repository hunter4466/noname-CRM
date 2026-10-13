import { IconSearch } from '@noname/ui/icons';
import styles from './SearchInput.module.css';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
}

export const SearchInput = ({ value, onChange, placeholder, ariaLabel }: SearchInputProps) => (
  <div className={styles.search}>
    <IconSearch size={16} className={styles.icon} />
    <input
      type="search"
      className={styles.input}
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);
