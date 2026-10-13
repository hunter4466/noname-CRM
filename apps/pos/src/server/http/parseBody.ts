import type { ZodError, ZodType } from 'zod';

type ParseResult<T> = { success: true; data: T } | { success: false; error: ZodError };

export const parseBody = async <T>(request: Request, schema: ZodType<T>): Promise<ParseResult<T>> => {
  const body: unknown = await request.json().catch(() => null);
  const result = schema.safeParse(body);
  return result.success ? { success: true, data: result.data } : { success: false, error: result.error };
};
