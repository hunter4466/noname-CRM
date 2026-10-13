'use client';

import { Button, ButtonVariant } from '@noname/ui';
import { useState } from 'react';
import { useCombos } from '@/hooks/useCombos';
import { useModifierGroups } from '@/hooks/useModifierGroups';
import { useProducts } from '@/hooks/useProducts';
import { CatalogTab } from '@/types/CatalogTab';
import { FilterValue } from '@/types/FilterValue';
import { Route } from '@/types/Route';
import { ModifierGroupEditor } from '../ModifierGroupEditor/ModifierGroupEditor';
import { ModifierGroupList } from '../ModifierGroupList/ModifierGroupList';
import { OptionKindsLegend } from '../OptionKindsLegend/OptionKindsLegend';
import { CatalogTabs } from '../shared/CatalogTabs/CatalogTabs';
import { PageHeader } from '../shared/PageHeader/PageHeader';
import { QueryState } from '../shared/QueryState/QueryState';
import { SplitLayout } from '../shared/SplitLayout/SplitLayout';

const NEW_GROUP = 'new';

export const ModifierGroupsScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const groups = useModifierGroups();
  const combos = useCombos('', '');
  const products = useProducts({
    search: '',
    categoryId: FilterValue.All,
    locationId: FilterValue.All,
    status: FilterValue.All,
    page: 1,
    pageSize: 100,
  });
  const activeId = selectedId ?? groups.data?.[0]?.id ?? NEW_GROUP;
  const activeGroup = groups.data?.find((group) => group.id === activeId) ?? null;
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Point of Sale', href: Route.Dashboard },
          { label: 'Products', href: Route.Products },
          { label: 'Modifier groups' },
        ]}
        title="Modifier groups"
        lede="Reusable sets of choices — dressings, sides, drinks, cooking points. Rules decide what the cashier must pick; each option can be plain text, a real product, or open another group."
        actions={
          <Button variant={ButtonVariant.Primary} onClick={() => setSelectedId(NEW_GROUP)}>
            New group
          </Button>
        }
      />
      <CatalogTabs
        active={CatalogTab.ModifierGroups}
        counts={{
          [CatalogTab.Products]: products.data?.total,
          [CatalogTab.Combos]: combos.data?.length,
          [CatalogTab.ModifierGroups]: groups.data?.length,
        }}
      />
      <OptionKindsLegend />
      <QueryState data={groups.data} isLoading={groups.isLoading} error={groups.error}>
        {(allGroups) => (
          <SplitLayout
            asideFirst
            aside={
              <ModifierGroupList groups={allGroups} search={search} onSearch={setSearch} activeId={activeId} onSelect={setSelectedId} />
            }
            main={
              <ModifierGroupEditor key={activeId} group={activeGroup} products={products.data?.items ?? []} onCreated={setSelectedId} />
            }
          />
        )}
      </QueryState>
    </>
  );
};
