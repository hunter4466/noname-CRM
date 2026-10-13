import { PermissionKey, type Location, type LocationsResponse } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { validationError } from '@/server/http/responses';
import { createLocation, listLocations } from '@/server/repositories/locationRepository';
import { locationInputSchema } from '@/server/validation/locationSchemas';

export const GET = withPermissions([PermissionKey.LocationsView], async (request) => {
  const search = new URL(request.url).searchParams.get('search') ?? undefined;
  return NextResponse.json<LocationsResponse>(listLocations(search));
});

export const POST = withPermissions([PermissionKey.LocationsManage], async (request) => {
  const body = await parseBody(request, locationInputSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  return NextResponse.json<Location>(createLocation(body.data), { status: 201 });
});
