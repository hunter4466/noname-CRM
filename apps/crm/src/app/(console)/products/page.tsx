import type { Metadata } from 'next';
import { ProductsScreen } from '@/components/ProductsScreen/ProductsScreen';

export const metadata: Metadata = { title: 'Products' };

const ProductsPage = () => <ProductsScreen />;

export default ProductsPage;
