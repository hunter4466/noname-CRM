'use client';

import { classNames } from '@noname/ui';
import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import styles from './CodeInput.module.css';

export interface CodeInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
}

export const CodeInput = ({ length, value, onChange }: CodeInputProps) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const setDigit = (index: number, digit: string) => {
    const digits = value.padEnd(length, ' ').split('');
    digits[index] = digit || ' ';
    onChange(digits.join('').trimEnd().replace(/ /g, ''));
    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };
  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    onChange(event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length));
  };
  return (
    <div className={styles.code} role="group" aria-label={`${length}-digit code`} onPaste={handlePaste}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputs.current[index] = element;
          }}
          className={classNames(styles.digit, Boolean(value[index]) && styles.filled)}
          inputMode="numeric"
          maxLength={1}
          aria-label={`Digit ${index + 1}`}
          value={value[index] ?? ''}
          onChange={(event) => setDigit(index, event.target.value.replace(/\D/g, ''))}
          onKeyDown={(event) => handleKeyDown(index, event)}
        />
      ))}
    </div>
  );
};
