import { PermissionKey, type Terminal } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { notFound, validationError } from '@/server/http/responses';
import { addTerminal } from '@/server/repositories/locationRepository';
import { terminalInputSchema } from '@/server/validation/locationSchemas';

type Params = { locationId: string };

export const POST = withPermissions<Params>([PermissionKey.LocationsManage], async (request, { params }) => {
  const body = await parseBody(request, terminalInputSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  const terminal = addTerminal((await params).locationId, body.data);
  return terminal ? NextResponse.json<Terminal>(terminal, { status: 201 }) : notFound('Local');
});
