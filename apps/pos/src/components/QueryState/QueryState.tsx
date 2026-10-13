import type { ReactNode } from 'react';
import styles from './QueryState.module.css';

export interface QueryStateProps<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  children: (data: T) => ReactNode;
}

/** Renders loading / error placeholders until a query has data. */
export const QueryState = <T,>({ data, isLoading, error, children }: QueryStateProps<T>) => {
  if (error) {
    return (
      <div className={styles.error} role="alert">
        {error.message}
      </div>
    );
  }
  if (isLoading || data === undefined) {
    return (
      <div className={styles.loading} aria-busy="true">
        Cargando…
      </div>
    );
  }
  return <>{children(data)}</>;
};
