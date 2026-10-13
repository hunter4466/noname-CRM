import { PermissionKey, type ModifierGroup } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { notFound, validationError } from '@/server/http/responses';
import { findModifierGroup, updateModifierGroup } from '@/server/repositories/modifierGroupRepository';
import { modifierGroupInputSchema } from '@/server/validation/catalogSchemas';

type Params = { groupId: string };

export const GET = withPermissions<Params>([PermissionKey.CatalogView], async (_request, { params }) => {
  const group = findModifierGroup((await params).groupId);
  return group ? NextResponse.json<ModifierGroup>(group) : notFound('Modifier group');
});

export const PATCH = withPermissions<Params>([PermissionKey.CatalogManage], async (request, { params }) => {
  const body = await parseBody(request, modifierGroupInputSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  const group = updateModifierGroup((await params).groupId, body.data);
  return group ? NextResponse.json<ModifierGroup>(group) : notFound('Modifier group');
});
