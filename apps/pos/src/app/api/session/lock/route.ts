import type { OkResponse } from '@noname/types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { STAFF_SESSION_COOKIE_NAME } from '@/server/auth/cookies';
import { withDevice } from '@/server/auth/guards';
import { deleteStaffSession } from '@/server/repositories/sessionRepository';

// Paired device only — locking the register just ends the staff session.
export const POST = withDevice(async () => {
  const token = (await cookies()).get(STAFF_SESSION_COOKIE_NAME)?.value;
  if (token) {
    deleteStaffSession(token);
  }
  const response = NextResponse.json<OkResponse>({ ok: true });
  response.cookies.delete(STAFF_SESSION_COOKIE_NAME);
  return response;
});
