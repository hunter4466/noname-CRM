import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { RegisterScreen } from '@/components/RegisterScreen/RegisterScreen';
import { getDevice } from '@/server/auth/getDevice';
import { getStaffSession } from '@/server/auth/getStaffSession';
import { Route } from '@/types/Route';

export const metadata: Metadata = { title: 'Register' };

const RegisterPage = async () => {
  const device = await getDevice();
  const staffSession = device ? await getStaffSession(device.deviceCode) : null;
  if (!staffSession?.session.shiftId) {
    redirect(Route.Login);
  }
  return <RegisterScreen />;
};

export default RegisterPage;
