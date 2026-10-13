import type { Metadata } from 'next';
import { LoginForm } from '@/components/LoginForm/LoginForm';

export const metadata: Metadata = { title: 'Iniciar sesión' };

const LoginPage = () => <LoginForm />;

export default LoginPage;
