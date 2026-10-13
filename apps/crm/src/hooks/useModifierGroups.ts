import type { ModifierGroup } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient, toQueryString } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useModifierGroups = (search = '') =>
  useQuery({
    queryKey: [QueryKey.ModifierGroups, search],
    queryFn: () => apiClient.get<ModifierGroup[]>(`/modifier-groups${toQueryString({ search })}`),
  });
