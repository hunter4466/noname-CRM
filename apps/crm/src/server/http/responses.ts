import { ApiErrorCode, type ApiError } from '@noname/types';
import { NextResponse } from 'next/server';
import type { ZodError } from 'zod';

const statusByCode: Record<ApiErrorCode, number> = {
  [ApiErrorCode.Unauthorized]: 401,
  [ApiErrorCode.Forbidden]: 403,
  [ApiErrorCode.NotFound]: 404,
  [ApiErrorCode.ValidationFailed]: 422,
  [ApiErrorCode.InvalidCredentials]: 401,
};

export const jsonError = (code: ApiErrorCode, message: string) =>
  NextResponse.json<ApiError>({ error: { code, message } }, { status: statusByCode[code] });

export const notFound = (entityName: string) => jsonError(ApiErrorCode.NotFound, `${entityName} not found`);

export const validationError = (zodError: ZodError) =>
  jsonError(ApiErrorCode.ValidationFailed, zodError.issues.map((issue) => issue.message).join('; '));
