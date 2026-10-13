import type { RegisterRequest, SessionUser } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: RegisterRequest) => apiClient.post<SessionUser>('/auth/register', request),
    onSuccess: (user) => queryClient.setQueryData([QueryKey.Session], user),
  });
};
