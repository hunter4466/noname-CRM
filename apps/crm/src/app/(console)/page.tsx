import type { Metadata } from 'next';
import { DashboardScreen } from '@/components/DashboardScreen/DashboardScreen';

export const metadata: Metadata = { title: 'Dashboard' };

const DashboardPage = () => <DashboardScreen />;

export default DashboardPage;
