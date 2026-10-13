import { PermissionKey, type Category } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { listCategories } from '@/server/repositories/categoryRepository';

export const GET = withPermissions([PermissionKey.CatalogView], async () => NextResponse.json<Category[]>(listCategories()));
