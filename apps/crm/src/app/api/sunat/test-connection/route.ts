import { PermissionKey, type TestConnectionResponse } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { testSunatConnection } from '@/server/repositories/sunatRepository';

export const POST = withPermissions([PermissionKey.SunatManage], async () =>
  NextResponse.json<TestConnectionResponse>(testSunatConnection()),
);
