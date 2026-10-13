import type { Product, ProductInput } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

/** Creates when `productId` is null, updates otherwise. */
export const useSaveProduct = (productId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ProductInput) =>
      productId ? apiClient.patch<Product>(`/products/${productId}`, input) : apiClient.post<Product>('/products', input),
    onSuccess: (product) => {
      queryClient.setQueryData([QueryKey.Product, product.id], product);
      void queryClient.invalidateQueries({ queryKey: [QueryKey.Products] });
      void queryClient.invalidateQueries({ queryKey: [QueryKey.ModifierGroups] });
    },
  });
};
