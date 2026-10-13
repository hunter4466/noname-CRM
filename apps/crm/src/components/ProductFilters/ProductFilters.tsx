import { ProductStatus } from '@noname/types';
import { Select } from '@noname/ui';
import { useCategories } from '@/hooks/useCategories';
import { useLocations } from '@/hooks/useLocations';
import type { useProductFilters } from '@/hooks/useProductFilters';
import { toLocationOptions } from '@/lib/locationOptions';
import { productStatusLabel } from '@/lib/productStatus';
import { FilterValue } from '@/types/FilterValue';
import { SearchInput } from '../shared/SearchInput/SearchInput';
import { Toolbar } from '../shared/Toolbar/Toolbar';

const statusOptions = [
  { value: FilterValue.All, label: 'Cualquier estado' },
  ...Object.values(ProductStatus).map((status) => ({ value: status, label: productStatusLabel[status] })),
];

export interface ProductFiltersProps {
  filters: ReturnType<typeof useProductFilters>;
}

export const ProductFilters = ({ filters }: ProductFiltersProps) => {
  const categories = useCategories();
  const locations = useLocations();
  const categoryOptions = [
    { value: FilterValue.All, label: 'Todas las categorías' },
    ...(categories.data ?? []).map((category) => ({ value: category.id, label: category.name })),
  ];
  return (
    <Toolbar>
      <SearchInput
        value={filters.query.search}
        onChange={(value) => filters.setFilter('search', value)}
        placeholder="Buscar por nombre o SKU"
        ariaLabel="Buscar productos"
      />
      <Select
        aria-label="Categoría"
        options={categoryOptions}
        value={filters.query.categoryId}
        onChange={(event) => filters.setFilter('categoryId', event.target.value)}
      />
      <Select
        aria-label="Local"
        options={toLocationOptions(locations.data?.items)}
        value={filters.query.locationId}
        onChange={(event) => filters.setFilter('locationId', event.target.value)}
      />
      <Select
        aria-label="Estado"
        options={statusOptions}
        value={filters.query.status}
        onChange={(event) => filters.setStatus(event.target.value as ProductStatus | FilterValue.All)}
      />
    </Toolbar>
  );
};
