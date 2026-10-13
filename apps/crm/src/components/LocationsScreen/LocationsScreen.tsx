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
        breadcrumbs={[{ label: 'Point of Sale', href: Route.Dashboard }, { label: 'Locations' }]}
        title="Locations"
        lede="Each location is a SUNAT establishment with its own address, map pin and points of sale."
        actions={
          <>
            <SearchInput value={search} onChange={setSearch} placeholder="Search locations" ariaLabel="Search locations" />
            <ButtonLink href={locationRoute(NEW_ENTITY_ID)} variant={ButtonVariant.Primary}>
              New location
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
