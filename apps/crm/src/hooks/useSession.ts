import type { SessionUser } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useSession = () =>
  useQuery({ queryKey: [QueryKey.Session], queryFn: () => apiClient.get<SessionUser>('/auth/me'), staleTime: Infinity });
