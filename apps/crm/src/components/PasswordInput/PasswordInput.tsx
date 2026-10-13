'use client';

import { TextInput } from '@noname/ui';
import { IconEye } from '@noname/ui/icons';
import { useState } from 'react';
import styles from './PasswordInput.module.css';

export interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: 'current-password' | 'new-password';
}

export const PasswordInput = ({ id, value, onChange, autoComplete }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={styles.wrapper}>
      <TextInput
        id={id}
        large
        type={isVisible ? 'text' : 'password'}
        autoComplete={autoComplete}
        placeholder="••••••••"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={styles.input}
      />
      <button
        type="button"
        className={styles.toggle}
        aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        onClick={() => setIsVisible(!isVisible)}
      >
        <IconEye />
      </button>
    </div>
  );
};
