import type { Location } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useLocation = (locationId: string | null) =>
  useQuery({
    queryKey: [QueryKey.Location, locationId],
    queryFn: () => apiClient.get<Location>(`/locations/${locationId}`),
    enabled: locationId !== null,
  });
