import type { ReactNode } from 'react';
import { AuthLayout } from '@/components/AuthLayout/AuthLayout';

const AuthRouteLayout = ({ children }: { children: ReactNode }) => <AuthLayout>{children}</AuthLayout>;

export default AuthRouteLayout;
