'use client';

import { Button, ButtonVariant, Card } from '@noname/ui';
import { useCombos } from '@/hooks/useCombos';
import { useModifierGroups } from '@/hooks/useModifierGroups';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useProducts } from '@/hooks/useProducts';
import { CatalogTab } from '@/types/CatalogTab';
import { NEW_ENTITY_ID, productRoute, Route } from '@/types/Route';
import { ProductFilters } from '../ProductFilters/ProductFilters';
import { ProductsTable } from '../ProductsTable/ProductsTable';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import { CatalogTabs } from '../shared/CatalogTabs/CatalogTabs';
import { PageHeader } from '../shared/PageHeader/PageHeader';
import { QueryState } from '../shared/QueryState/QueryState';

export const ProductsScreen = () => {
  const filters = useProductFilters();
  const products = useProducts(filters.query);
  const combos = useCombos('', '');
  const modifierGroups = useModifierGroups();
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Point of Sale', href: Route.Dashboard }, { label: 'Products' }]}
        title="Products"
        lede={'Everything you sell at the POS. Modifier groups are shared — build "Add a drink" once, attach it to any product.'}
        actions={
          <>
            <Button disabled title="Coming soon">
              Import CSV
            </Button>
            <ButtonLink href={productRoute(NEW_ENTITY_ID)} variant={ButtonVariant.Primary}>
              New product
            </ButtonLink>
          </>
        }
      />
      <CatalogTabs
        active={CatalogTab.Products}
        counts={{
          [CatalogTab.Products]: products.data?.total,
          [CatalogTab.Combos]: combos.data?.length,
          [CatalogTab.ModifierGroups]: modifierGroups.data?.length,
        }}
      />
      <ProductFilters filters={filters} />
      <Card>
        <QueryState data={products.data} isLoading={products.isLoading} error={products.error}>
          {(page) => <ProductsTable page={page} onPageChange={filters.setPage} />}
        </QueryState>
      </Card>
    </>
  );
};
