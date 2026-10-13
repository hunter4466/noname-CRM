import type { ComboSummary } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient, toQueryString } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useCombos = (search: string, active: string) =>
  useQuery({
    queryKey: [QueryKey.Combos, search, active],
    queryFn: () => apiClient.get<ComboSummary[]>(`/combos${toQueryString({ search, active })}`),
  });
