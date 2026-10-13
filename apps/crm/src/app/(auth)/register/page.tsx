import type { Metadata } from 'next';
import { RegisterWizard } from '@/components/RegisterWizard/RegisterWizard';

export const metadata: Metadata = { title: 'Create account' };

const RegisterPage = () => <RegisterWizard />;

export default RegisterPage;
