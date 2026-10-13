import type { OpenShiftRequest, Shift } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useOpenShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: OpenShiftRequest) => apiClient.post<Shift>('/shifts', request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKey.Session] }),
  });
};
