import type { DashboardResponse } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient, toQueryString } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useDashboard = (locationId: string) =>
  useQuery({
    queryKey: [QueryKey.Dashboard, locationId],
    queryFn: () => apiClient.get<DashboardResponse>(`/dashboard${toQueryString({ locationId })}`),
    refetchInterval: 30_000,
  });
