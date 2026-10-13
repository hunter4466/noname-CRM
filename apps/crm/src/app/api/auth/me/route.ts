import type { SessionUser } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';

export const GET = withPermissions([], async (_request, _context, session) => NextResponse.json<SessionUser>(session));
