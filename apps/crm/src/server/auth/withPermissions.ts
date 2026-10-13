import 'server-only';
import { ApiErrorCode, type PermissionKey, type SessionUser } from '@noname/types';
import { jsonError } from '../http/responses';
import { getSession } from './getSession';

type RouteContext<P> = { params: Promise<P> };

type AuthorizedHandler<P> = (request: Request, context: RouteContext<P>, session: SessionUser) => Promise<Response>;

/**
 * Guards a route handler. Every API endpoint must be wrapped — see .claude/rules/api.md.
 * Pass an empty array for endpoints that only require a signed-in user.
 */
export const withPermissions =
  <P = Record<string, never>>(requiredPermissions: PermissionKey[], handler: AuthorizedHandler<P>) =>
  async (request: Request, context: RouteContext<P>) => {
    const session = await getSession();
    if (!session) {
      return jsonError(ApiErrorCode.Unauthorized, 'Sign in required');
    }
    const missingPermissions = requiredPermissions.filter((permission) => !session.permissions.includes(permission));
    if (missingPermissions.length > 0) {
      return jsonError(ApiErrorCode.Forbidden, `Missing permissions: ${missingPermissions.join(', ')}`);
    }
    return handler(request, context, session);
  };
