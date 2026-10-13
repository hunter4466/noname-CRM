'use client';

import Link from 'next/link';
import { usePublicConfig } from '@/hooks/usePublicConfig';
import { Route } from '@/types/Route';
import styles from './LoginFooter.module.css';

export const LoginFooter = () => {
  const { posUrl } = usePublicConfig();
  return (
    <>
      <div className={styles.alternative}>
        ¿Nuevo en CRM? <Link href={Route.Register}>Crea una cuenta</Link>
      </div>
      <div className={styles.posHint}>
        ¿Trabajas en caja? <a href={posUrl}>Abrir el ingreso al POS</a>
      </div>
    </>
  );
};
