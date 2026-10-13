import type { Product } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useProduct = (productId: string | null) =>
  useQuery({
    queryKey: [QueryKey.Product, productId],
    queryFn: () => apiClient.get<Product>(`/products/${productId}`),
    enabled: productId !== null,
  });
