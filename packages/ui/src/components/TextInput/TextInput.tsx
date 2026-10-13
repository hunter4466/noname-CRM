import type { InputHTMLAttributes } from 'react';
import { classNames } from '../../classNames';
import styles from './TextInput.module.css';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  monospace?: boolean;
  large?: boolean;
}

export const TextInput = ({ prefix, monospace = false, large = false, className, ...props }: TextInputProps) => {
  const inputClassName = classNames(styles.input, monospace && styles.monospace, large && styles.large, className);
  if (!prefix) {
    return <input className={inputClassName} {...props} />;
  }
  return (
    <div className={classNames(styles.prefixed, large && styles.large)}>
      <span className={styles.prefix}>{prefix}</span>
      <input className={classNames(inputClassName, styles.bare)} {...props} />
    </div>
  );
};
