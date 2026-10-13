'use client';

import { useCategories } from '@/hooks/useCategories';
import { useCombo } from '@/hooks/useCombo';
import { useProducts } from '@/hooks/useProducts';
import { FilterValue } from '@/types/FilterValue';
import { ComboEditorForm } from '../ComboEditorForm/ComboEditorForm';
import { QueryState } from '../shared/QueryState/QueryState';

export interface ComboEditorScreenProps {
  comboId: string | null;
}

export const ComboEditorScreen = ({ comboId }: ComboEditorScreenProps) => {
  const combo = useCombo(comboId);
  const categories = useCategories();
  const products = useProducts({
    search: '',
    categoryId: FilterValue.All,
    locationId: FilterValue.All,
    status: FilterValue.All,
    page: 1,
    pageSize: 100,
  });
  const isLoading = (comboId !== null && combo.isLoading) || categories.isLoading || products.isLoading;
  const data = isLoading || !categories.data || !products.data ? undefined : { categories: categories.data, products: products.data.items };
  return (
    <QueryState data={data} isLoading={isLoading} error={combo.error ?? categories.error ?? products.error}>
      {(loaded) => {
        const comboCategoryId = loaded.categories.find((category) => category.name === 'Combos')?.id ?? loaded.categories[0]?.id ?? '';
        return (
          <ComboEditorForm
            key={combo.data?.id ?? 'new'}
            combo={combo.data ?? null}
            categories={loaded.categories}
            products={loaded.products}
            defaultCategoryId={comboCategoryId}
          />
        );
      }}
    </QueryState>
  );
};
