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
  { value: DateRange.Today, label: 'Today' },
  { value: DateRange.Yesterday, label: 'Yesterday' },
  { value: DateRange.LastSevenDays, label: 'Last 7 days' },
  { value: DateRange.ThisMonth, label: 'This month' },
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
        breadcrumbs={[{ label: 'Point of Sale' }, { label: 'Dashboard' }]}
        title="Dashboard"
        lede={dashboard.data?.dateLabel}
        actions={
          <>
            <Select
              aria-label="Location"
              options={toLocationOptions(locations.data?.items)}
              value={locationId}
              onChange={(event) => setLocationId(event.target.value)}
            />
            <Select
              aria-label="Date range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value as DateRange)}
            />
            <a className={getButtonClassName({ variant: ButtonVariant.Primary })} href={posUrl}>
              <IconTerminal size={16} />
              Open POS
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
