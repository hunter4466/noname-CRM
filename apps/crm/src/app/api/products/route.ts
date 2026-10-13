import { PermissionKey, ProductStatus, type Paginated, type Product, type ProductSummary } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { validationError } from '@/server/http/responses';
import { createProduct, listProducts } from '@/server/repositories/productRepository';
import { productInputSchema } from '@/server/validation/catalogSchemas';

const DEFAULT_PAGE_SIZE = 8;

const parseStatus = (value: string | null) => Object.values(ProductStatus).find((status) => status === value);

export const GET = withPermissions([PermissionKey.CatalogView], async (request) => {
  const params = new URL(request.url).searchParams;
  const result = listProducts({
    search: params.get('search') ?? undefined,
    categoryId: params.get('categoryId') ?? undefined,
    locationId: params.get('locationId') ?? undefined,
    status: parseStatus(params.get('status')),
    page: Math.max(1, Number(params.get('page')) || 1),
    pageSize: Math.min(100, Number(params.get('pageSize')) || DEFAULT_PAGE_SIZE),
  });
  return NextResponse.json<Paginated<ProductSummary>>(result);
});

export const POST = withPermissions([PermissionKey.CatalogManage], async (request) => {
  const body = await parseBody(request, productInputSchema);
  if (!body.success) {
    return validationError(body.error);
  }
  return NextResponse.json<Product>(createProduct(body.data), { status: 201 });
});
