'use client';

import { useLocation } from '@/hooks/useLocation';
import { LocationEditorForm } from '../LocationEditorForm/LocationEditorForm';
import { QueryState } from '../shared/QueryState/QueryState';

export interface LocationDetailScreenProps {
  locationId: string | null;
}

export const LocationDetailScreen = ({ locationId }: LocationDetailScreenProps) => {
  const location = useLocation(locationId);
  if (locationId === null) {
    return <LocationEditorForm location={null} />;
  }
  return (
    <QueryState data={location.data} isLoading={location.isLoading} error={location.error}>
      {(loaded) => <LocationEditorForm key={loaded.id} location={loaded} />}
    </QueryState>
  );
};
