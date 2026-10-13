import { ApiErrorCode, PermissionKey, type CreatedOrder } from '@noname/types';
import { NextResponse } from 'next/server';
import { withStaffPermissions } from '@/server/auth/guards';
import { parseBody } from '@/server/http/parseBody';
import { jsonError, validationError } from '@/server/http/responses';
import { createOrder, OrderValidationError } from '@/server/repositories/orderRepository';
import { createOrderSchema } from '@/server/validation/posSchemas';

export const POST = withStaffPermissions([PermissionKey.PosSell], async (request, _context, { device, session }) => {
  if (!session.shiftId) {
    return jsonError(ApiErrorCode.ValidationFailed, 'Open a shift before selling');
  }
  const body = await parseBody(request, createOrderSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  try {
    return NextResponse.json<CreatedOrder>(createOrder(device, body.data), { status: 201 });
  } catch (error) {
    if (error instanceof OrderValidationError) {
      return jsonError(ApiErrorCode.ValidationFailed, error.message);
    }
    throw error;
  }
});
