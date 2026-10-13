'use client';

import { getButtonClassName, ButtonVariant, Select } from '@noname/ui';
import { IconTerminal } from '@noname/ui/icons';
import { useState } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import { useLocations } from '@/hooks/useLocations';
import { usePublicConfig } from '@/hooks/usePublicConfig';
import { toLocationOptions } from '@/lib/locationOptions';
import { DateRange } from '@/types/DateRange';
import { FilterValue } from '@/types/FilterValue';
import { DashboardContent } from '../DashboardContent/DashboardContent';
import { PageHeader } from '../shared/PageHeader/PageHeader';
import { QueryState } from '../shared/QueryState/QueryState';

const dateRangeOptions = [
  { value: DateRange.Today, label: 'Hoy' },
  { value: DateRange.Yesterday, label: 'Ayer' },
  { value: DateRange.LastSevenDays, label: 'Últimos 7 días' },
  { value: DateRange.ThisMonth, label: 'Este mes' },
];

export const DashboardScreen = () => {
  const [locationId, setLocationId] = useState<string>(FilterValue.All);
  const [dateRange, setDateRange] = useState(DateRange.Today);
  const dashboard = useDashboard(locationId);
  const locations = useLocations();
  const { posUrl } = usePublicConfig();
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Punto de Venta' }, { label: 'Panel' }]}
        title="Panel"
        lede={dashboard.data?.dateLabel}
        actions={
          <>
            <Select
              aria-label="Local"
              options={toLocationOptions(locations.data?.items)}
              value={locationId}
              onChange={(event) => setLocationId(event.target.value)}
            />
            <Select
              aria-label="Rango de fechas"
              options={dateRangeOptions}
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value as DateRange)}
            />
            <a className={getButtonClassName({ variant: ButtonVariant.Primary })} href={posUrl}>
              <IconTerminal size={16} />
              Abrir POS
            </a>
          </>
        }
      />
      <QueryState data={dashboard.data} isLoading={dashboard.isLoading} error={dashboard.error}>
        {(data) => <DashboardContent dashboard={data} />}
      </QueryState>
    </>
  );
};
