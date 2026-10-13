import type { Paginated, ProductStatus, ProductSummary } from '@noname/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { apiClient, toQueryString } from '@/lib/apiClient';
import type { FilterValue } from '@/types/FilterValue';
import { QueryKey } from '@/types/QueryKey';

export interface ProductQuery {
  search: string;
  categoryId: string;
  locationId: string;
  status: ProductStatus | FilterValue.All;
  page: number;
  pageSize?: number;
}

export const useProducts = (query: ProductQuery) =>
  useQuery({
    queryKey: [QueryKey.Products, query],
    queryFn: () => apiClient.get<Paginated<ProductSummary>>(`/products${toQueryString({ ...query })}`),
    placeholderData: keepPreviousData,
  });
