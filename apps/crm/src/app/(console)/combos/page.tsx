import type { Metadata } from 'next';
import { CombosScreen } from '@/components/CombosScreen/CombosScreen';

export const metadata: Metadata = { title: 'Combos' };

const CombosPage = () => <CombosScreen />;

export default CombosPage;
