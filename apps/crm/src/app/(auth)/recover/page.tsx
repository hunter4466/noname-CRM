import type { Metadata } from 'next';
import { RecoverFlow } from '@/components/RecoverFlow/RecoverFlow';

export const metadata: Metadata = { title: 'Restablecer contraseña' };

const RecoverPage = () => <RecoverFlow />;

export default RecoverPage;
