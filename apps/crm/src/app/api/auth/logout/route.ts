import type { OkResponse } from '@noname/types';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/server/auth/sessionCookie';

// Public endpoint — clearing a cookie needs no permission.
export const POST = async () => {
  const response = NextResponse.json<OkResponse>({ ok: true });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
};
