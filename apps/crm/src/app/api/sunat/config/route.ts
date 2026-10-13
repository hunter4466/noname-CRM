import { PermissionKey, type SunatConfig } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { validationError } from '@/server/http/responses';
import { getSunatConfig, updateSunatConfig } from '@/server/repositories/sunatRepository';
import { sunatConfigInputSchema } from '@/server/validation/sunatSchemas';

export const GET = withPermissions([PermissionKey.SunatView], async () => NextResponse.json<SunatConfig>(getSunatConfig()));

export const PUT = withPermissions([PermissionKey.SunatManage], async (request) => {
  const body = await parseBody(request, sunatConfigInputSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  return NextResponse.json<SunatConfig>(updateSunatConfig(body.data));
});
