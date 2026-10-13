import type { SunatConfig } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useSunatConfig = () =>
  useQuery({ queryKey: [QueryKey.SunatConfig], queryFn: () => apiClient.get<SunatConfig>('/sunat/config') });
