import { PermissionKey, type Product } from '@noname/types';
import { NextResponse } from 'next/server';
import { withPermissions } from '@/server/auth/withPermissions';
import { parseBody } from '@/server/http/parseBody';
import { notFound, validationError } from '@/server/http/responses';
import { findProduct, updateProduct } from '@/server/repositories/productRepository';
import { productInputSchema } from '@/server/validation/catalogSchemas';

type Params = { productId: string };

export const GET = withPermissions<Params>([PermissionKey.CatalogView], async (_request, { params }) => {
  const product = findProduct((await params).productId);
  return product ? NextResponse.json<Product>(product) : notFound('Producto');
});

export const PATCH = withPermissions<Params>([PermissionKey.CatalogManage], async (request, { params }) => {
  const body = await parseBody(request, productInputSchema.partial());
  if (!body.success) {
    return validationError(body.error);
  }
  const product = updateProduct((await params).productId, body.data);
  return product ? NextResponse.json<Product>(product) : notFound('Producto');
});
