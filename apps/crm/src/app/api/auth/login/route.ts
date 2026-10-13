import { ApiErrorCode, type SessionUser } from '@noname/types';
import { NextResponse } from 'next/server';
import { setSessionCookie } from '@/server/auth/setSessionCookie';
import { parseBody } from '@/server/http/parseBody';
import { jsonError, validationError } from '@/server/http/responses';
import { findUserByCredentials } from '@/server/repositories/userRepository';
import { loginSchema } from '@/server/validation/authSchemas';

// Public endpoint (no permissions) — approved in the initial endpoint review.
export const POST = async (request: Request) => {
  const body = await parseBody(request, loginSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  const record = findUserByCredentials(body.data.email, body.data.password);
  if (!record) {
    return jsonError(ApiErrorCode.InvalidCredentials, 'Email or password is incorrect');
  }
  return setSessionCookie(NextResponse.json<SessionUser>(record.user), record.sessionToken, body.data.keepSignedIn);
};
