import { useContext } from 'react';
import { PublicConfigContext } from '@/components/PublicConfigProvider/PublicConfigProvider';

export const usePublicConfig = () => {
  const config = useContext(PublicConfigContext);
  if (!config) {
    throw new Error('usePublicConfig must be used inside <PublicConfigProvider>');
  }
  return config;
};
