import { PermissionKey, type ModifierGroup } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { validationError } from '@/server/http/responses';
import { createModifierGroup, listModifierGroups } from '@/server/repositories/modifierGroupRepository';
import { modifierGroupInputSchema } from '@/server/validation/catalogSchemas';

export const GET = withPermissions([PermissionKey.CatalogView], async (request) => {
  const search = new URL(request.url).searchParams.get('search') ?? undefined;
  return NextResponse.json<ModifierGroup[]>(listModifierGroups(search));
});

export const POST = withPermissions([PermissionKey.CatalogManage], async (request) => {
  const body = await parseBody(request, modifierGroupInputSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  return NextResponse.json<ModifierGroup>(createModifierGroup(body.data), { status: 201 });
});
