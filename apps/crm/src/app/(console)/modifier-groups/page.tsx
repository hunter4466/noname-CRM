import type { Metadata } from 'next';
import { ModifierGroupsScreen } from '@/components/ModifierGroupsScreen/ModifierGroupsScreen';

export const metadata: Metadata = { title: 'Modifier groups' };

const ModifierGroupsPage = () => <ModifierGroupsScreen />;

export default ModifierGroupsPage;
