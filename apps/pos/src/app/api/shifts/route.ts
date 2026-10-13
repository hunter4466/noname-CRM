import { PermissionKey, type Shift } from '@noname/types';
import { NextResponse } from 'next/server';
import { withStaffPermissions } from '@/server/auth/guards';
import { parseBody } from '@/server/http/parseBody';
import { validationError } from '@/server/http/responses';
import { attachShift } from '@/server/repositories/sessionRepository';
import { openShift } from '@/server/repositories/shiftRepository';
import { openShiftSchema } from '@/server/validation/posSchemas';

export const POST = withStaffPermissions([PermissionKey.PosShiftOpen], async (request, _context, { device, session, staff }) => {
  const body = await parseBody(request, openShiftSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  const shift = openShift(device.deviceCode, staff.member.id, body.data.openingCash);
  attachShift(session.token, shift.id);
  return NextResponse.json<Shift>(shift, { status: 201 });
});
