import type { Location, LocationInput } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useSaveLocation = (locationId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: LocationInput) =>
      locationId ? apiClient.patch<Location>(`/locations/${locationId}`, input) : apiClient.post<Location>('/locations', input),
    onSuccess: (location) => {
      queryClient.setQueryData([QueryKey.Location, location.id], location);
      void queryClient.invalidateQueries({ queryKey: [QueryKey.Locations] });
    },
  });
};
