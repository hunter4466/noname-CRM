import type { Category } from '@noname/types';

export const createCategoriesMock = (): Omit<Category, 'productCount'>[] => [
  { id: 'cat_burgers', name: 'Burgers' },
  { id: 'cat_mains', name: 'Mains' },
  { id: 'cat_salads', name: 'Salads' },
  { id: 'cat_sides', name: 'Sides' },
  { id: 'cat_beverages', name: 'Beverages' },
  { id: 'cat_combos', name: 'Combos' },
];
