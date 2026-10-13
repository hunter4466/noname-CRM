import type { TerminalInfo } from '@noname/types';
import { NextResponse } from 'next/server';
import { withDevice } from '@/server/auth/guards';

// Paired device only — approved in the initial endpoint review.
export const GET = withDevice(
  async (_request, _context, { boletaSeries: _boleta, facturaSeries: _factura, notaVentaSeries: _notaVenta, ...terminal }) =>
    NextResponse.json<TerminalInfo>(terminal),
);
