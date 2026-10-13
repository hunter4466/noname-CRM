import type { SunatConfig } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useSaveSunatConfig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<SunatConfig>) => apiClient.put<SunatConfig>('/sunat/config', input),
    onSuccess: (config) => queryClient.setQueryData([QueryKey.SunatConfig], config),
  });
};
