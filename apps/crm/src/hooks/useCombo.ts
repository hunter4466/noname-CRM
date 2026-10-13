import type { Combo } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useCombo = (comboId: string | null) =>
  useQuery({
    queryKey: [QueryKey.Combo, comboId],
    queryFn: () => apiClient.get<Combo>(`/combos/${comboId}`),
    enabled: comboId !== null,
  });
