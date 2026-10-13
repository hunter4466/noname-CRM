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
        New to CRM? <Link href={Route.Register}>Create an account</Link>
      </div>
      <div className={styles.posHint}>
        Working at a register? <a href={posUrl}>Open the POS sign-in</a>
      </div>
    </>
  );
};
