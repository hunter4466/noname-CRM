import type { ProductStatus } from '@noname/types';
import { useState } from 'react';
import { FilterValue } from '@/types/FilterValue';
import type { ProductQuery } from './useProducts';

const initialQuery: ProductQuery = {
  search: '',
  categoryId: FilterValue.All,
  locationId: FilterValue.All,
  status: FilterValue.All,
  page: 1,
};

/** Product list filters; any filter change resets to the first page. */
export const useProductFilters = () => {
  const [query, setQuery] = useState(initialQuery);
  const setFilter = <K extends 'search' | 'categoryId' | 'locationId'>(field: K, value: ProductQuery[K]) =>
    setQuery((current) => ({ ...current, [field]: value, page: 1 }));
  const setStatus = (status: ProductStatus | FilterValue.All) => setQuery((current) => ({ ...current, status, page: 1 }));
  const setPage = (page: number) => setQuery((current) => ({ ...current, page }));
  return { query, setFilter, setStatus, setPage };
};
