'use client';

import { ButtonVariant, Card, Select } from '@noname/ui';
import { useState } from 'react';
import { useCombos } from '@/hooks/useCombos';
import { useModifierGroups } from '@/hooks/useModifierGroups';
import { useProducts } from '@/hooks/useProducts';
import { ActiveFilter } from '@/types/ActiveFilter';
import { CatalogTab } from '@/types/CatalogTab';
import { FilterValue } from '@/types/FilterValue';
import { comboRoute, NEW_ENTITY_ID, Route } from '@/types/Route';
import { CombosTable } from '../CombosTable/CombosTable';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import { CatalogTabs } from '../shared/CatalogTabs/CatalogTabs';
import { PageHeader } from '../shared/PageHeader/PageHeader';
import { QueryState } from '../shared/QueryState/QueryState';
import { SearchInput } from '../shared/SearchInput/SearchInput';
import { Toolbar } from '../shared/Toolbar/Toolbar';

const activeOptions = [
  { value: ActiveFilter.Any, label: 'Cualquier estado' },
  { value: ActiveFilter.Active, label: 'Activo' },
  { value: ActiveFilter.Inactive, label: 'Inactivo' },
];

export const CombosScreen = () => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(ActiveFilter.Any);
  const combos = useCombos(search, active);
  const allCombos = useCombos('', ActiveFilter.Any);
  const products = useProducts({ search: '', categoryId: FilterValue.All, locationId: FilterValue.All, status: FilterValue.All, page: 1 });
  const groups = useModifierGroups();
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Punto de Venta', href: Route.Dashboard },
          { label: 'Productos', href: Route.Products },
          { label: 'Combos' },
        ]}
        title="Combos"
        lede="Paquetes armados con tus productos. En cada paso el cliente elige un producto; el stock, las comandas y las ventas se siguen contando en cada producto."
        actions={
          <ButtonLink href={comboRoute(NEW_ENTITY_ID)} variant={ButtonVariant.Primary}>
            Nuevo combo
          </ButtonLink>
        }
      />
      <CatalogTabs
        active={CatalogTab.Combos}
        counts={{
          [CatalogTab.Products]: products.data?.total,
          [CatalogTab.Combos]: allCombos.data?.length,
          [CatalogTab.ModifierGroups]: groups.data?.length,
        }}
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar combos" ariaLabel="Buscar combos" />
        <Select
          aria-label="Estado"
          options={activeOptions}
          value={active}
          onChange={(event) => setActive(event.target.value as ActiveFilter)}
        />
      </Toolbar>
      <Card>
        <QueryState data={combos.data} isLoading={combos.isLoading} error={combos.error}>
          {(items) => <CombosTable combos={items} />}
        </QueryState>
      </Card>
    </>
  );
};
