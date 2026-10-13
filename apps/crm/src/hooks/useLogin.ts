import type { LoginRequest, SessionUser } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';
import { Route } from '@/types/Route';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: LoginRequest) => apiClient.post<SessionUser>('/auth/login', request),
    onSuccess: (user) => {
      queryClient.setQueryData([QueryKey.Session], user);
      router.replace(Route.Dashboard);
      router.refresh();
    },
  });
};
