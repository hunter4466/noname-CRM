import { PermissionKey, type Location } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { notFound, validationError } from '@/server/http/responses';
import { findLocation, updateLocation } from '@/server/repositories/locationRepository';
import { locationInputSchema } from '@/server/validation/locationSchemas';

type Params = { locationId: string };

export const GET = withPermissions<Params>([PermissionKey.LocationsView], async (_request, { params }) => {
  const location = findLocation((await params).locationId);
  return location ? NextResponse.json<Location>(location) : notFound('Local');
});

export const PATCH = withPermissions<Params>([PermissionKey.LocationsManage], async (request, { params }) => {
  const body = await parseBody(request, locationInputSchema.partial());
  if (!body.success) {
    return validationError(body.error);
  }
  const location = updateLocation((await params).locationId, body.data);
  return location ? NextResponse.json<Location>(location) : notFound('Local');
});
