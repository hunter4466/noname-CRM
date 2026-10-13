import { PermissionKey, type DashboardResponse } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { getDashboard } from '@/server/repositories/dashboardRepository';

export const GET = withPermissions([PermissionKey.DashboardView], async (request) => {
  const locationId = new URL(request.url).searchParams.get('locationId') ?? undefined;
  return NextResponse.json<DashboardResponse>(getDashboard(locationId));
});
