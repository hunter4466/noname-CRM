import type { Metadata } from 'next';
import { ProductEditorScreen } from '@/components/ProductEditorScreen/ProductEditorScreen';
import { NEW_ENTITY_ID } from '@/types/Route';

export const metadata: Metadata = { title: 'Producto' };

const ProductEditorPage = async ({ params }: PageProps<'/products/[productId]'>) => {
  const { productId } = await params;
  return <ProductEditorScreen productId={productId === NEW_ENTITY_ID ? null : productId} />;
};

export default ProductEditorPage;
