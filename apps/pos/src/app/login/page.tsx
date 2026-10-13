import type { Metadata } from 'next';
import { PosLoginScreen } from '@/components/PosLoginScreen/PosLoginScreen';

export const metadata: Metadata = { title: 'Ingreso del personal' };

const LoginPage = () => <PosLoginScreen />;

export default LoginPage;
