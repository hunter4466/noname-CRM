'use client';

import { useMenu } from '@/hooks/useMenu';
import { QueryState } from '../QueryState/QueryState';
import { RegisterWorkspace } from '../RegisterWorkspace/RegisterWorkspace';
import { RegisterTopBar } from '../RegisterTopBar/RegisterTopBar';
import styles from './RegisterScreen.module.css';

export const RegisterScreen = () => {
  const menu = useMenu();
  return (
    <div className={styles.screen}>
      <RegisterTopBar />
      <QueryState data={menu.data} isLoading={menu.isLoading} error={menu.error}>
        {(loaded) => <RegisterWorkspace menu={loaded} />}
      </QueryState>
    </div>
  );
};
