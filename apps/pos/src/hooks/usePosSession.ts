import type { PosSession } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const usePosSession = () =>
  useQuery({ queryKey: [QueryKey.Session], queryFn: () => apiClient.get<PosSession>('/session/me'), staleTime: Infinity });
