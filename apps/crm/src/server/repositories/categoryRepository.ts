import 'server-only';
import type { Category } from '@noname/types';
import { createCategoriesMock } from '../mocks/categoriesMock';
import { getMockSlice } from '../mocks/mockStore';
import { listProductRecords } from './productRepository';

const categories = () => getMockSlice('categories', createCategoriesMock);

export const findCategoryName = (categoryId: string) =>
  categories().find((category) => category.id === categoryId)?.name ?? 'Uncategorized';

export const listCategories = (): Category[] => {
  const products = listProductRecords();
  return categories().map((category) => ({
    ...category,
    productCount: products.filter((product) => product.categoryId === category.id).length,
  }));
};
