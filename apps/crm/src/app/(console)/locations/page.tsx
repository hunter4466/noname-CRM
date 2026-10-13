import type { Metadata } from 'next';
import { LocationsScreen } from '@/components/LocationsScreen/LocationsScreen';

export const metadata: Metadata = { title: 'Locations' };

const LocationsPage = () => <LocationsScreen />;

export default LocationsPage;
