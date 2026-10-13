import type { MenuCategory, MenuItem, MenuModifierGroup, MenuOption } from '@noname/types';

type OptionSeed = [id: string, label: string, price: number, isOutOfStock?: boolean];

const options = (seeds: OptionSeed[]): MenuOption[] =>
  seeds.map(([id, label, price, isOutOfStock = false]) => ({ id, label, price, isOutOfStock }));

const group = (
  id: string,
  name: string,
  min: number,
  max: number,
  seeds: OptionSeed[],
  extra: Partial<MenuModifierGroup> = {},
): MenuModifierGroup => ({
  id,
  name,
  minSelections: min,
  maxSelections: max,
  freeSelections: 0,
  extraSelectionPrice: 0,
  defaultOptionId: null,
  options: options(seeds),
  ...extra,
});

export const createMenuGroupsMock = (): MenuModifierGroup[] => [
  group('cook', 'Cooking point', 1, 1, [
    ['jugoso', 'Jugoso', 0],
    ['tres', 'Tres cuartos', 0],
    ['bien', 'Bien cocido', 0],
  ]),
  group('extras', 'Burger extras', 0, 3, [
    ['cheese', 'Cheese', 3],
    ['bacon', 'Bacon', 5],
    ['egg', 'Fried egg', 3],
    ['platano', 'Plátano frito', 3],
  ]),
  group(
    'cremas',
    'Cremas',
    0,
    4,
    [
      ['mayo', 'Mayonesa', 0],
      ['ketchup', 'Ketchup', 0],
      ['aji', 'Ají', 0],
      ['huacatay', 'Huacatay', 0],
      ['tartara', 'Tártara', 0],
    ],
    { freeSelections: 2, extraSelectionPrice: 1 },
  ),
  group('dressing', 'Dressing', 1, 1, [
    ['caesar', 'Caesar', 0],
    ['ranch', 'Ranch', 0],
    ['balsamic', 'Balsamic', 0],
    ['lemon', 'Olive oil & lemon', 0],
  ]),
  group('protein', 'Add protein', 0, 2, [
    ['chicken', 'Grilled chicken', 8],
    ['shrimp', 'Shrimp', 12],
    ['bacon_p', 'Bacon', 5],
  ]),
  group('drink', 'Add a drink', 0, 1, [
    ['inca', 'Inca Kola 500 ml', 5],
    ['chicha', 'Chicha morada 500 ml', 6],
    ['agua', 'Agua mineral 625 ml', 3.5, true],
  ]),
  group('side', 'Side', 1, 1, [
    ['papas', 'Papas fritas', 0],
    ['ensalada', 'Ensalada', 0],
    ['chaufa', 'Arroz chaufa', 3],
  ]),
  group(
    'cburger',
    'Burger',
    1,
    1,
    [
      ['classic', 'Classic burger', 0],
      ['cheese_b', 'Cheese burger', 3],
      ['crispy', 'Crispy chicken', 2],
    ],
    { defaultOptionId: 'classic' },
  ),
  group(
    'cside',
    'Side',
    1,
    1,
    [
      ['papas_c', 'Papas fritas', 0],
      ['camote', 'Camote frito', 1.5],
      ['salad', 'Side salad', 0],
    ],
    { defaultOptionId: 'papas_c' },
  ),
  group(
    'cdrink',
    'Drink',
    1,
    1,
    [
      ['inca_c', 'Inca Kola 500 ml', 0],
      ['chicha_c', 'Chicha morada 500 ml', 1],
      ['agua_c', 'Agua mineral 625 ml', 0, true],
    ],
    { defaultOptionId: 'inca_c' },
  ),
  group(
    'entrada',
    'Entrada',
    1,
    1,
    [
      ['causa', 'Causa limeña', 0],
      ['sopa', 'Sopa del día', 0],
    ],
    { defaultOptionId: 'causa' },
  ),
  group(
    'segundo',
    'Segundo',
    1,
    1,
    [
      ['aji_g', 'Ají de gallina', 0],
      ['lomo', 'Lomo saltado', 6],
      ['tallarines', 'Tallarines verdes', 0],
    ],
    { defaultOptionId: 'aji_g' },
  ),
  group(
    'refresco',
    'Refresco',
    1,
    1,
    [
      ['chicha_r', 'Chicha morada', 0],
      ['limonada', 'Limonada', 0],
    ],
    { defaultOptionId: 'chicha_r' },
  ),
];

export const createMenuCategoriesMock = (): MenuCategory[] => [
  { id: 'burgers', name: 'Burgers' },
  { id: 'mains', name: 'Mains' },
  { id: 'salads', name: 'Salads' },
  { id: 'sides', name: 'Sides' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'combos', name: 'Combos' },
];

type ItemSeed = [id: string, name: string, categoryId: string, price: number, groupIds: string[], isOutOfStock?: boolean];

const itemSeeds: ItemSeed[] = [
  ['classic', 'Classic burger', 'burgers', 29, ['cook', 'extras']],
  ['cheese_burger', 'Cheese burger', 'burgers', 32, ['cook', 'extras']],
  ['crispy', 'Crispy chicken burger', 'burgers', 31, ['extras']],
  ['lomo', 'Lomo saltado', 'mains', 35, ['cook', 'cremas']],
  ['pollo', 'Pollo a la brasa ¼', 'mains', 22, ['side', 'cremas']],
  ['aji_gallina', 'Ají de gallina', 'mains', 28, []],
  ['caesar', 'Caesar salad', 'salads', 24, ['dressing', 'protein', 'drink']],
  ['quinoa', 'Quinoa salad', 'salads', 26, ['dressing']],
  ['papas', 'Papas fritas', 'sides', 9, ['cremas']],
  ['camote', 'Camote frito', 'sides', 10, []],
  ['yuca', 'Yuca frita', 'sides', 9, ['cremas']],
  ['inca', 'Inca Kola 500 ml', 'drinks', 5, []],
  ['chicha', 'Chicha morada 500 ml', 'drinks', 6, []],
  ['limonada', 'Limonada', 'drinks', 8, []],
  ['agua', 'Agua mineral 625 ml', 'drinks', 3.5, [], true],
  ['combo_burger', 'Combo Burger', 'combos', 32, ['cburger', 'cside', 'cdrink']],
  ['menu', 'Menú del día', 'combos', 18, ['entrada', 'segundo', 'refresco']],
];

export const createMenuItemsMock = (): MenuItem[] =>
  itemSeeds.map(([id, name, categoryId, price, modifierGroupIds, isOutOfStock = false]) => ({
    id,
    name,
    categoryId,
    price,
    isCombo: categoryId === 'combos',
    isOutOfStock,
    modifierGroupIds,
  }));
