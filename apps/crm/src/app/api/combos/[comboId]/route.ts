import { PermissionKey, type Combo } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { notFound, validationError } from '@/server/http/responses';
import { findCombo, updateCombo } from '@/server/repositories/comboRepository';
import { comboInputSchema } from '@/server/validation/catalogSchemas';

type Params = { comboId: string };

export const GET = withPermissions<Params>([PermissionKey.CatalogView], async (_request, { params }) => {
  const combo = findCombo((await params).comboId);
  return combo ? NextResponse.json<Combo>(combo) : notFound('Combo');
});

export const PATCH = withPermissions<Params>([PermissionKey.CatalogManage], async (request, { params }) => {
  const body = await parseBody(request, comboInputSchema.partial());
  if (!body.success) {
    return validationError(body.error);
  }
  const combo = updateCombo((await params).comboId, body.data);
  return combo ? NextResponse.json<Combo>(combo) : notFound('Combo');
});
