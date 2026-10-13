import type { Metadata } from 'next';
import { RecoverFlow } from '@/components/RecoverFlow/RecoverFlow';

export const metadata: Metadata = { title: 'Reset password' };

const RecoverPage = () => <RecoverFlow />;

export default RecoverPage;
