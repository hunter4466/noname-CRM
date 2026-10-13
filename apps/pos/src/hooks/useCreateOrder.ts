import type { CreatedOrder, CreateOrderRequest } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateOrderRequest) => apiClient.post<CreatedOrder>('/orders', request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKey.Menu] }),
  });
};
