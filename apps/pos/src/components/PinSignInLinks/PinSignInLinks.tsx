'use client';

import { usePublicConfig } from '@/hooks/usePublicConfig';
import styles from './PinSignInLinks.module.css';

export const PinSignInLinks = () => {
  const { crmUrl } = usePublicConfig();
  return (
    <div className={styles.links}>
      <a href={`${crmUrl}/login`}>¿Administrador? Inicia sesión con correo o Google</a>
      <span className="hint">¿Olvidaste tu PIN? Un administrador puede restablecerlo.</span>
    </div>
  );
};
