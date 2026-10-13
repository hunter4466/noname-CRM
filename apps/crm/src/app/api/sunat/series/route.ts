import { PermissionKey, type DocumentSeries } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { listDocumentSeries } from '@/server/repositories/sunatRepository';

export const GET = withPermissions([PermissionKey.SunatView], async () => NextResponse.json<DocumentSeries[]>(listDocumentSeries()));
