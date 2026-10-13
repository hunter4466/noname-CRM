import 'server-only';
import type { SessionUser } from '@noname/types';
import { cookies } from 'next/headers';
import { findUserBySessionToken } from '../repositories/userRepository';
import { SESSION_COOKIE_NAME } from './sessionCookie';

// Mocked session: the cookie holds an opaque token that maps to a mock user.
// Replace with a real session store (DB-backed) when auth is implemented.
export const getSession = async (): Promise<SessionUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return token ? findUserBySessionToken(token) : null;
};
