import 'server-only';
import { ApiErrorCode, type PermissionKey } from '@noname/types';
import type { TerminalRecord } from '../mocks/terminalsMock';
import type { StaffRecord } from '../mocks/staffMock';
import type { StaffSessionRecord } from '../repositories/sessionRepository';
import { jsonError } from '../http/responses';
import { getDevice } from './getDevice';
import { getStaffSession } from './getStaffSession';

type RouteContext<P> = { params: Promise<P> };

export interface StaffContext {
  device: TerminalRecord;
  session: StaffSessionRecord;
  staff: StaffRecord;
}

/** Endpoints a paired device may call before anyone signs in (terminal info, staff list, PIN login). */
export const withDevice =
  <P = Record<string, never>>(handler: (request: Request, context: RouteContext<P>, device: TerminalRecord) => Promise<Response>) =>
  async (request: Request, context: RouteContext<P>) => {
    const device = await getDevice();
    return device ? handler(request, context, device) : jsonError(ApiErrorCode.Unauthorized, 'This device is not paired');
  };

/** Endpoints that need a signed-in staff member holding every listed permission — see .claude/rules/api.md. */
export const withStaffPermissions = <P = Record<string, never>>(
  requiredPermissions: PermissionKey[],
  handler: (request: Request, context: RouteContext<P>, staffContext: StaffContext) => Promise<Response>,
) =>
  withDevice<P>(async (request, context, device) => {
    const result = await getStaffSession(device.deviceCode);
    if (!result) {
      return jsonError(ApiErrorCode.Unauthorized, 'Enter your PIN to continue');
    }
    const missing = requiredPermissions.filter((permission) => !result.staff.permissions.includes(permission));
    if (missing.length > 0) {
      return jsonError(ApiErrorCode.Forbidden, `Missing permissions: ${missing.join(', ')}`);
    }
    return handler(request, context, { device, ...result });
  });
