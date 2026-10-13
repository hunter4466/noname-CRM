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
  group('cook', 'Término', 1, 1, [
    ['jugoso', 'Jugoso', 0],
    ['tres', 'Tres cuartos', 0],
    ['bien', 'Bien cocido', 0],
  ]),
  group('extras', 'Extras de hamburguesa', 0, 3, [
    ['cheese', 'Queso', 3],
    ['bacon', 'Tocino', 5],
    ['egg', 'Huevo frito', 3],
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
  group('dressing', 'Aderezo', 1, 1, [
    ['caesar', 'César', 0],
    ['ranch', 'Ranch', 0],
    ['balsamic', 'Balsámico', 0],
    ['lemon', 'Aceite de oliva y limón', 0],
  ]),
  group('protein', 'Agregar proteína', 0, 2, [
    ['chicken', 'Pollo a la plancha', 8],
    ['shrimp', 'Langostinos', 12],
    ['bacon_p', 'Tocino', 5],
  ]),
  group('drink', 'Agregar bebida', 0, 1, [
    ['inca', 'Inca Kola 500 ml', 5],
    ['chicha', 'Chicha morada 500 ml', 6],
    ['agua', 'Agua mineral 625 ml', 3.5, true],
  ]),
  group('side', 'Acompañamiento', 1, 1, [
    ['papas', 'Papas fritas', 0],
    ['ensalada', 'Ensalada', 0],
    ['chaufa', 'Arroz chaufa', 3],
  ]),
  group(
    'cburger',
    'Hamburguesa',
    1,
    1,
    [
      ['classic', 'Hamburguesa clásica', 0],
      ['cheese_b', 'Hamburguesa con queso', 3],
      ['crispy', 'Pollo crispy', 2],
    ],
    { defaultOptionId: 'classic' },
  ),
  group(
    'cside',
    'Acompañamiento',
    1,
    1,
    [
      ['papas_c', 'Papas fritas', 0],
      ['camote', 'Camote frito', 1.5],
      ['salad', 'Ensalada personal', 0],
    ],
    { defaultOptionId: 'papas_c' },
  ),
  group(
    'cdrink',
    'Bebida',
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
  { id: 'burgers', name: 'Hamburguesas' },
  { id: 'mains', name: 'Platos de fondo' },
  { id: 'salads', name: 'Ensaladas' },
  { id: 'sides', name: 'Acompañamientos' },
  { id: 'drinks', name: 'Bebidas' },
  { id: 'combos', name: 'Combos' },
];

type ItemSeed = [id: string, name: string, categoryId: string, price: number, groupIds: string[], isOutOfStock?: boolean];

const itemSeeds: ItemSeed[] = [
  ['classic', 'Hamburguesa clásica', 'burgers', 29, ['cook', 'extras']],
  ['cheese_burger', 'Hamburguesa con queso', 'burgers', 32, ['cook', 'extras']],
  ['crispy', 'Hamburguesa de pollo crispy', 'burgers', 31, ['extras']],
  ['lomo', 'Lomo saltado', 'mains', 35, ['cook', 'cremas']],
  ['pollo', 'Pollo a la brasa ¼', 'mains', 22, ['side', 'cremas']],
  ['aji_gallina', 'Ají de gallina', 'mains', 28, []],
  ['caesar', 'Ensalada César', 'salads', 24, ['dressing', 'protein', 'drink']],
  ['quinoa', 'Ensalada de quinua', 'salads', 26, ['dressing']],
  ['papas', 'Papas fritas', 'sides', 9, ['cremas']],
  ['camote', 'Camote frito', 'sides', 10, []],
  ['yuca', 'Yuca frita', 'sides', 9, ['cremas']],
  ['inca', 'Inca Kola 500 ml', 'drinks', 5, []],
  ['chicha', 'Chicha morada 500 ml', 'drinks', 6, []],
  ['limonada', 'Limonada', 'drinks', 8, []],
  ['agua', 'Agua mineral 625 ml', 'drinks', 3.5, [], true],
  ['combo_burger', 'Combo Hamburguesa', 'combos', 32, ['cburger', 'cside', 'cdrink']],
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
