'use client';

import { ButtonVariant } from '@noname/ui';
import { useState } from 'react';
import { useLocations } from '@/hooks/useLocations';
import { locationRoute, NEW_ENTITY_ID, Route } from '@/types/Route';
import { AddLocationCard } from '../AddLocationCard/AddLocationCard';
import { LocationCard } from '../LocationCard/LocationCard';
import { LocationsSummaryCard } from '../LocationsSummaryCard/LocationsSummaryCard';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import { PageHeader } from '../shared/PageHeader/PageHeader';
import { QueryState } from '../shared/QueryState/QueryState';
import { SearchInput } from '../shared/SearchInput/SearchInput';
import styles from './LocationsScreen.module.css';

export const LocationsScreen = () => {
  const [search, setSearch] = useState('');
  const locations = useLocations(search);
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Punto de Venta', href: Route.Dashboard }, { label: 'Locales' }]}
        title="Locales"
        lede="Cada local es un establecimiento SUNAT con su propia dirección, ubicación en el mapa y puntos de venta."
        actions={
          <>
            <SearchInput value={search} onChange={setSearch} placeholder="Buscar locales" ariaLabel="Buscar locales" />
            <ButtonLink href={locationRoute(NEW_ENTITY_ID)} variant={ButtonVariant.Primary}>
              Nuevo local
            </ButtonLink>
          </>
        }
      />
      <QueryState data={locations.data} isLoading={locations.isLoading} error={locations.error}>
        {(data) => (
          <>
            <LocationsSummaryCard summary={data.summary} />
            <div className={styles.grid}>
              {data.items.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
              <AddLocationCard />
            </div>
          </>
        )}
      </QueryState>
    </>
  );
};
