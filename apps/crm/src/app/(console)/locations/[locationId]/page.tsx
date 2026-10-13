import type { Metadata } from 'next';
import { LocationDetailScreen } from '@/components/LocationDetailScreen/LocationDetailScreen';
import { NEW_ENTITY_ID } from '@/types/Route';

export const metadata: Metadata = { title: 'Location' };

const LocationDetailPage = async ({ params }: PageProps<'/locations/[locationId]'>) => {
  const { locationId } = await params;
  return <LocationDetailScreen locationId={locationId === NEW_ENTITY_ID ? null : locationId} />;
};

export default LocationDetailPage;
