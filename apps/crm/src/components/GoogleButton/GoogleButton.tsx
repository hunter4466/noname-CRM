import { Button, ButtonSize } from '@noname/ui';
import styles from './GoogleButton.module.css';

export interface GoogleButtonProps {
  label: string;
  onClick: () => void;
}

// Mocked: Google OAuth is not wired yet.
export const GoogleButton = ({ label, onClick }: GoogleButtonProps) => (
  <Button size={ButtonSize.Large} fullWidth onClick={onClick}>
    <span className={styles.mark} aria-hidden="true">
      G
    </span>
    {label}
  </Button>
);
