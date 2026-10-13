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
  { value: ActiveFilter.Any, label: 'Any status' },
  { value: ActiveFilter.Active, label: 'Active' },
  { value: ActiveFilter.Inactive, label: 'Inactive' },
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
        breadcrumbs={[{ label: 'Point of Sale', href: Route.Dashboard }, { label: 'Products', href: Route.Products }, { label: 'Combos' }]}
        title="Combos"
        lede="Bundles built from your existing products. Each slot lets the customer pick one product; stock, kitchen tickets and sales still count on each product inside."
        actions={
          <ButtonLink href={comboRoute(NEW_ENTITY_ID)} variant={ButtonVariant.Primary}>
            New combo
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
        <SearchInput value={search} onChange={setSearch} placeholder="Search combos" ariaLabel="Search combos" />
        <Select
          aria-label="Status"
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
