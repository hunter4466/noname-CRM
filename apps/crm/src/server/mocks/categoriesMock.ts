import type { Category } from '@noname/types';

export const createCategoriesMock = (): Omit<Category, 'productCount'>[] => [
  { id: 'cat_burgers', name: 'Hamburguesas' },
  { id: 'cat_mains', name: 'Platos de fondo' },
  { id: 'cat_salads', name: 'Ensaladas' },
  { id: 'cat_sides', name: 'Acompañamientos' },
  { id: 'cat_beverages', name: 'Bebidas' },
  { id: 'cat_combos', name: 'Combos' },
];
