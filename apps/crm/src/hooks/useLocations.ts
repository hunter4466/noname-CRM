import type { LocationsResponse } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient, toQueryString } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useLocations = (search = '') =>
  useQuery({
    queryKey: [QueryKey.Locations, search],
    queryFn: () => apiClient.get<LocationsResponse>(`/locations${toQueryString({ search })}`),
  });
