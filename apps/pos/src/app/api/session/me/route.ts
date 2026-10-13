import type { PosSession } from '@noname/types';
import { NextResponse } from 'next/server';
import { withStaffPermissions } from '@/server/auth/guards';

// Signed-in staff, no extra permission — the register reads who is at the till.
export const GET = withStaffPermissions([], async (_request, _context, { session, staff }) =>
  NextResponse.json<PosSession>({ staff: staff.member, permissions: staff.permissions, shiftId: session.shiftId }),
);
