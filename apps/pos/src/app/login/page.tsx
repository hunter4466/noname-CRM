import type { Metadata } from 'next';
import { PosLoginScreen } from '@/components/PosLoginScreen/PosLoginScreen';

export const metadata: Metadata = { title: 'Staff sign-in' };

const LoginPage = () => <PosLoginScreen />;

export default LoginPage;
