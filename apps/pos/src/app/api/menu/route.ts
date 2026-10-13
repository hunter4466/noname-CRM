import { PermissionKey, type MenuResponse } from '@noname/types';
import { NextResponse } from 'next/server';
import { withStaffPermissions } from '@/server/auth/guards';
import { getMenu } from '@/server/repositories/menuRepository';

export const GET = withStaffPermissions([PermissionKey.PosSell], async (_request, _context, { device }) =>
  NextResponse.json<MenuResponse>(getMenu(device.deviceCode)),
);
