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
        breadcrumbs={[{ label: 'Punto de Venta', href: Route.Dashboard }, { label: 'Productos' }]}
        title="Productos"
        lede={
          'Todo lo que vendes en el POS. Los grupos de modificadores se comparten: crea "Agregar bebida" una vez y vincúlalo a cualquier producto.'
        }
        actions={
          <>
            <Button disabled title="Próximamente">
              Importar CSV
            </Button>
            <ButtonLink href={productRoute(NEW_ENTITY_ID)} variant={ButtonVariant.Primary}>
              Nuevo producto
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
