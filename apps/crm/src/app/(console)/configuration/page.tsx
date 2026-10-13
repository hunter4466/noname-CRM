import type { Metadata } from 'next';
import { ConfigurationScreen } from '@/components/ConfigurationScreen/ConfigurationScreen';

export const metadata: Metadata = { title: 'Configuration' };

const ConfigurationPage = () => <ConfigurationScreen />;

export default ConfigurationPage;
