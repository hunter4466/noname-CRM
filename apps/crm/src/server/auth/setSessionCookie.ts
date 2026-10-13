import 'server-only';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from './sessionCookie';

export const setSessionCookie = (response: NextResponse, sessionToken: string, persistent: boolean) => {
  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: persistent ? SESSION_MAX_AGE_SECONDS : undefined,
  });
  return response;
};
