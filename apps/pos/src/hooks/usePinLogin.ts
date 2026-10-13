import type { PinLoginRequest, PosSession } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const usePinLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PinLoginRequest) => apiClient.post<PosSession>('/session/pin', request),
    onSuccess: (session) => queryClient.setQueryData([QueryKey.Session], session),
  });
};
