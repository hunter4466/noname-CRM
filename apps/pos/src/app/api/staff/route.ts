import type { StaffMember } from '@noname/types';
import { NextResponse } from 'next/server';
import { withDevice } from '@/server/auth/guards';
import { listStaff } from '@/server/repositories/staffRepository';

// Paired device only — approved in the initial endpoint review.
export const GET = withDevice(async () => NextResponse.json<StaffMember[]>(listStaff()));
