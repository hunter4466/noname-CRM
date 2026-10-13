import type { OkResponse } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';
import { Route } from '@/types/Route';

export const useLockRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.post<OkResponse>('/session/lock'),
    onSuccess: () => {
      queryClient.clear();
      router.replace(Route.Login);
    },
  });
};
