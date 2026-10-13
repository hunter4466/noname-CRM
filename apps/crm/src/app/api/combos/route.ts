import { PermissionKey, type Combo, type ComboSummary } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { validationError } from '@/server/http/responses';
import { createCombo, listCombos } from '@/server/repositories/comboRepository';
import { comboInputSchema } from '@/server/validation/catalogSchemas';

export const GET = withPermissions([PermissionKey.CatalogView], async (request) => {
  const params = new URL(request.url).searchParams;
  const active = params.get('active');
  return NextResponse.json<ComboSummary[]>(
    listCombos({ search: params.get('search') ?? undefined, isActive: active === null ? undefined : active === 'true' }),
  );
});

export const POST = withPermissions([PermissionKey.CatalogManage], async (request) => {
  const body = await parseBody(request, comboInputSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  return NextResponse.json<Combo>(createCombo(body.data), { status: 201 });
});
