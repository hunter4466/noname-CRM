'use client';

import { IgvAffectation, UnitOfMeasure, type Location, type ProductInput } from '@noname/types';
import { useCategories } from '@/hooks/useCategories';
import { useLocations } from '@/hooks/useLocations';
import { useModifierGroups } from '@/hooks/useModifierGroups';
import { useProduct } from '@/hooks/useProduct';
import { ProductEditorForm } from '../ProductEditorForm/ProductEditorForm';
import { QueryState } from '../shared/QueryState/QueryState';

const emptyProduct = (categoryId: string, locations: Location[]): ProductInput => ({
  name: '',
  sku: '',
  categoryId,
  price: 0,
  description: '',
  igvAffectation: IgvAffectation.GravadoOnerosa,
  unitOfMeasure: UnitOfMeasure.Unit,
  sunatProductCode: '',
  appliesIcbper: false,
  modifierGroups: [],
  locationSettings: locations.map((location) => ({
    locationId: location.id,
    locationName: location.name,
    isAvailable: true,
    priceOverride: null,
    routedPrinterName: null,
    printerOptions: location.printerOptions,
  })),
});

export interface ProductEditorScreenProps {
  productId: string | null;
}

export const ProductEditorScreen = ({ productId }: ProductEditorScreenProps) => {
  const product = useProduct(productId);
  const categories = useCategories();
  const modifierGroups = useModifierGroups();
  const locations = useLocations();
  const isLoading = (productId !== null && product.isLoading) || categories.isLoading || modifierGroups.isLoading || locations.isLoading;
  const data =
    isLoading || !categories.data || !modifierGroups.data || !locations.data
      ? undefined
      : { categories: categories.data, groups: modifierGroups.data, locations: locations.data.items };
  return (
    <QueryState data={data} isLoading={isLoading} error={product.error ?? categories.error ?? modifierGroups.error ?? locations.error}>
      {(loaded) => (
        <ProductEditorForm
          key={product.data?.id ?? 'new'}
          product={product.data ?? null}
          emptyInput={emptyProduct(loaded.categories[0]?.id ?? '', loaded.locations)}
          categories={loaded.categories}
          modifierGroups={loaded.groups}
        />
      )}
    </QueryState>
  );
};
