import type { Metadata } from 'next';
import { ModifierGroupsScreen } from '@/components/ModifierGroupsScreen/ModifierGroupsScreen';

export const metadata: Metadata = { title: 'Grupos de modificadores' };

const ModifierGroupsPage = () => <ModifierGroupsScreen />;

export default ModifierGroupsPage;
