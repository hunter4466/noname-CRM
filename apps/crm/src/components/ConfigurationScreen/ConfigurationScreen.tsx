'use client';

import { useSunatConfig } from '@/hooks/useSunatConfig';
import { ConfigurationForm } from '../ConfigurationForm/ConfigurationForm';
import { QueryState } from '../shared/QueryState/QueryState';

export const ConfigurationScreen = () => {
  const config = useSunatConfig();
  return (
    <QueryState data={config.data} isLoading={config.isLoading} error={config.error}>
      {(loaded) => <ConfigurationForm config={loaded} />}
    </QueryState>
  );
};
