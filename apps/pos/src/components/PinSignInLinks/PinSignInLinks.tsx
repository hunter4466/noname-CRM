'use client';

import { usePublicConfig } from '@/hooks/usePublicConfig';
import styles from './PinSignInLinks.module.css';

export const PinSignInLinks = () => {
  const { crmUrl } = usePublicConfig();
  return (
    <div className={styles.links}>
      <a href={`${crmUrl}/login`}>Manager? Sign in with email or Google</a>
      <span className="hint">Forgot your PIN? A manager can reset it.</span>
    </div>
  );
};
