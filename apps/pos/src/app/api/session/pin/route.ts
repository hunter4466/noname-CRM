import { ApiErrorCode, type PosSession } from '@noname/types';
import { NextResponse } from 'next/server';
import { STAFF_SESSION_COOKIE_NAME } from '@/server/auth/cookies';
import { withDevice } from '@/server/auth/guards';
import { parseBody } from '@/server/http/parseBody';
import { jsonError, validationError } from '@/server/http/responses';
import { createStaffSession } from '@/server/repositories/sessionRepository';
import { findOpenShift } from '@/server/repositories/shiftRepository';
import { verifyPin } from '@/server/repositories/staffRepository';
import { pinLoginSchema } from '@/server/validation/posSchemas';

// Paired device only — approved in the initial endpoint review.
export const POST = withDevice(async (request, _context, device) => {
  const body = await parseBody(request, pinLoginSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  const staff = verifyPin(body.data.staffId, body.data.pin);
  if (!staff) {
    return jsonError(ApiErrorCode.InvalidCredentials, 'PIN incorrecto, inténtalo de nuevo');
  }
  const session = createStaffSession(staff.member.id, device.deviceCode, findOpenShift(device.deviceCode)?.id ?? null);
  const response = NextResponse.json<PosSession>({ staff: staff.member, permissions: staff.permissions, shiftId: session.shiftId });
  response.cookies.set(STAFF_SESSION_COOKIE_NAME, session.token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  return response;
});
