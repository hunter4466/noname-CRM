import type { Metadata } from 'next';
import { LoginForm } from '@/components/LoginForm/LoginForm';

export const metadata: Metadata = { title: 'Sign in' };

const LoginPage = () => <LoginForm />;

export default LoginPage;
