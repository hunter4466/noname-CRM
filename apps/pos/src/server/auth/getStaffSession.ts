import 'server-only';
import { cookies } from 'next/headers';
import { findStaffSession } from '../repositories/sessionRepository';
import { findStaff } from '../repositories/staffRepository';
import { STAFF_SESSION_COOKIE_NAME } from './cookies';

export const getStaffSession = async (deviceCode: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(STAFF_SESSION_COOKIE_NAME)?.value;
  const session = token ? findStaffSession(token) : null;
  if (!session || session.deviceCode !== deviceCode) {
    return null;
  }
  const staff = findStaff(session.staffId);
  return staff ? { session, staff } : null;
};
