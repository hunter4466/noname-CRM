import { ModifierOptionKind, type ModifierGroup, type ModifierOption } from '@noname/types';

export type ModifierGroupRecord = Omit<ModifierGroup, 'usedInProductNames'>;

const simple = (id: string, label: string, priceDelta = 0, isDefault = false): ModifierOption => ({
  id,
  kind: ModifierOptionKind.Simple,
  label,
  priceDelta,
  linkedProductSku: null,
  followUpGroupName: null,
  isDefault,
  isAvailable: true,
  availabilityNote: null,
});

const linked = (id: string, label: string, sku: string, priceDelta: number, extra: Partial<ModifierOption> = {}): ModifierOption => ({
  ...simple(id, label, priceDelta),
  kind: ModifierOptionKind.LinkedProduct,
  linkedProductSku: sku,
  ...extra,
});

const standardPreModifiers = [
  { id: 'pre_no', label: 'No', priceDelta: 0 },
  { id: 'pre_light', label: 'Light', priceDelta: 0 },
  { id: 'pre_regular', label: 'Regular', priceDelta: 0 },
  { id: 'pre_extra', label: 'Extra', priceDelta: 1.5 },
  { id: 'pre_side', label: 'On the side', priceDelta: 0 },
];

const group = (fields: Partial<ModifierGroupRecord> & Pick<ModifierGroupRecord, 'id' | 'name' | 'options'>): ModifierGroupRecord => ({
  ticketName: fields.name,
  cashierPrompt: '',
  minSelections: 0,
  maxSelections: 1,
  freeSelections: 0,
  extraSelectionPrice: 0,
  allowRepeats: false,
  preModifiersEnabled: false,
  preModifiers: standardPreModifiers,
  isNested: false,
  lastEditedLabel: 'Last edited 2 Oct by Mario C.',
  ...fields,
});

export const createModifierGroupsMock = (): ModifierGroupRecord[] => [
  group({
    id: 'mg_dressing',
    name: 'Dressing',
    minSelections: 1,
    preModifiersEnabled: true,
    options: [
      simple('opt_caesar', 'Caesar', 0, true),
      simple('opt_ranch', 'Ranch'),
      simple('opt_balsamic', 'Balsamic'),
      simple('opt_lemon', 'Olive oil & lemon'),
    ],
  }),
  group({
    id: 'mg_add_protein',
    name: 'Add protein',
    ticketName: 'Protein',
    maxSelections: 3,
    options: [simple('opt_chicken', 'Grilled chicken', 8), simple('opt_shrimp', 'Shrimp', 12), simple('opt_bacon', 'Bacon', 5)],
  }),
  group({
    id: 'mg_add_drink',
    name: 'Add a drink',
    ticketName: 'Drink',
    cashierPrompt: 'Offer a drink with every main',
    lastEditedLabel: 'Last edited today 10:42 by Mario C.',
    options: [
      linked('opt_chicha', 'Chicha morada 500 ml', 'BEV-003', 6, { followUpGroupName: 'Ice' }),
      linked('opt_inca', 'Inca Kola 500 ml', 'BEV-001', 5, { followUpGroupName: 'Ice' }),
      linked('opt_agua', 'Agua mineral 625 ml', 'BEV-005', 3.5, {
        isAvailable: false,
        availabilityNote: 'Out of stock in Miraflores · synced from product',
      }),
    ],
  }),
  group({
    id: 'mg_cooking_point',
    name: 'Cooking point',
    minSelections: 1,
    options: [
      simple('opt_jugoso', 'Jugoso'),
      simple('opt_tres_cuartos', 'Tres cuartos', 0, true),
      simple('opt_bien_cocido', 'Bien cocido'),
    ],
  }),
  group({
    id: 'mg_cremas',
    name: 'Cremas',
    maxSelections: 4,
    freeSelections: 2,
    extraSelectionPrice: 1,
    options: [
      simple('opt_mayonesa', 'Mayonesa'),
      simple('opt_ketchup', 'Ketchup'),
      simple('opt_aji', 'Ají'),
      simple('opt_huacatay', 'Huacatay'),
      simple('opt_tartara', 'Tártara'),
      simple('opt_golf', 'Golf'),
    ],
  }),
  group({
    id: 'mg_burger_extras',
    name: 'Burger extras',
    ticketName: 'Extras',
    maxSelections: 5,
    options: [
      simple('opt_cheese', 'Cheese', 3),
      simple('opt_bacon_extra', 'Bacon', 5),
      simple('opt_egg', 'Fried egg', 3),
      simple('opt_platano', 'Plátano frito', 3),
      simple('opt_jalapeno', 'Jalapeños', 2),
    ],
  }),
  group({
    id: 'mg_combo_side',
    name: 'Combo side',
    ticketName: 'Side',
    minSelections: 1,
    options: [simple('opt_papas', 'Papas fritas', 0, true), simple('opt_ensalada', 'Ensalada'), simple('opt_chaufa', 'Arroz chaufa', 3)],
  }),
  group({
    id: 'mg_ice',
    name: 'Ice',
    isNested: true,
    minSelections: 1,
    options: [simple('opt_with_ice', 'With ice', 0, true), simple('opt_no_ice', 'No ice')],
  }),
  group({
    id: 'mg_burger_build',
    name: 'Burger build',
    maxSelections: 4,
    preModifiersEnabled: true,
    options: [
      simple('opt_lettuce', 'Lettuce'),
      simple('opt_tomato', 'Tomato'),
      simple('opt_onion', 'Onion'),
      simple('opt_pickles', 'Pickles'),
    ],
  }),
];
