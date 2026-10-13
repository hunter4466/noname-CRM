import type { Terminal, TerminalInput } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useAddTerminal = (locationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: TerminalInput) => apiClient.post<Terminal>(`/locations/${locationId}/terminals`, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QueryKey.Location, locationId] });
      void queryClient.invalidateQueries({ queryKey: [QueryKey.Locations] });
    },
  });
};
