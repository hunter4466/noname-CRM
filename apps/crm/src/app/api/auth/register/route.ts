import { ApiErrorCode, type SessionUser } from '@noname/types';
import { NextResponse } from 'next/server';
import { setSessionCookie } from '@/server/auth/setSessionCookie';
import { parseBody } from '@/server/http/parseBody';
import { jsonError, validationError } from '@/server/http/responses';
import { emailExists, registerOwner } from '@/server/repositories/userRepository';
import { registerSchema } from '@/server/validation/authSchemas';

// Public endpoint (no permissions) — approved in the initial endpoint review.
export const POST = async (request: Request) => {
  const body = await parseBody(request, registerSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  if (emailExists(body.data.email)) {
    return jsonError(ApiErrorCode.ValidationFailed, 'An account with this email already exists');
  }
  const record = registerOwner(body.data);
  return setSessionCookie(NextResponse.json<SessionUser>(record.user, { status: 201 }), record.sessionToken, true);
};
