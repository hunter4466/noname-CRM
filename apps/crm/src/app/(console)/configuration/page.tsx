import type { Metadata } from 'next';
import { ConfigurationScreen } from '@/components/ConfigurationScreen/ConfigurationScreen';

export const metadata: Metadata = { title: 'Configuración' };

const ConfigurationPage = () => <ConfigurationScreen />;

export default ConfigurationPage;
