import { ApiErrorCode, type OkResponse } from '@noname/types';
import { NextResponse } from 'next/server';
import { parseBody } from '@/server/http/parseBody';
import { jsonError, validationError } from '@/server/http/responses';
import { recoverVerifySchema } from '@/server/validation/authSchemas';

const MOCK_RECOVERY_CODE = '481920';

// Public endpoint (no permissions) — approved in the initial endpoint review.
export const POST = async (request: Request) => {
  const body = await parseBody(request, recoverVerifySchema);
  if (!body.success) {
    return validationError(body.error);
  }
  if (body.data.code !== MOCK_RECOVERY_CODE) {
    return jsonError(ApiErrorCode.ValidationFailed, 'That code is not valid or has expired');
  }
  return NextResponse.json<OkResponse>({ ok: true });
};
