import type { OkResponse } from '@noname/types';
import { NextResponse } from 'next/server';
import { parseBody } from '@/server/http/parseBody';
import { validationError } from '@/server/http/responses';
import { recoverSchema } from '@/server/validation/authSchemas';

// Public endpoint (no permissions) — approved in the initial endpoint review.
// Always answers ok so the endpoint cannot be used to discover which emails have accounts.
export const POST = async (request: Request) => {
  const body = await parseBody(request, recoverSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  return NextResponse.json<OkResponse>({ ok: true });
};
