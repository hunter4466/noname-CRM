import { Button, ButtonSize } from '@noname/ui';
import type { ReactNode } from 'react';
import styles from './RegisterStepButtons.module.css';

export interface RegisterStepButtonsProps {
  onBack: () => void;
  children: ReactNode;
}

export const RegisterStepButtons = ({ onBack, children }: RegisterStepButtonsProps) => (
  <div className={styles.buttons}>
    <Button size={ButtonSize.Large} onClick={onBack}>
      Atrás
    </Button>
    {children}
  </div>
);
