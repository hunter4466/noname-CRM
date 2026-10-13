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
  { id: 'pre_no', label: 'Sin', priceDelta: 0 },
  { id: 'pre_light', label: 'Poco', priceDelta: 0 },
  { id: 'pre_regular', label: 'Normal', priceDelta: 0 },
  { id: 'pre_extra', label: 'Extra', priceDelta: 1.5 },
  { id: 'pre_side', label: 'Aparte', priceDelta: 0 },
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
  lastEditedLabel: 'Editado el 2 oct. por Mario C.',
  ...fields,
});

export const createModifierGroupsMock = (): ModifierGroupRecord[] => [
  group({
    id: 'mg_dressing',
    name: 'Aderezo',
    minSelections: 1,
    preModifiersEnabled: true,
    options: [
      simple('opt_caesar', 'César', 0, true),
      simple('opt_ranch', 'Ranch'),
      simple('opt_balsamic', 'Balsámico'),
      simple('opt_lemon', 'Aceite de oliva y limón'),
    ],
  }),
  group({
    id: 'mg_add_protein',
    name: 'Agregar proteína',
    ticketName: 'Proteína',
    maxSelections: 3,
    options: [simple('opt_chicken', 'Pollo a la plancha', 8), simple('opt_shrimp', 'Langostinos', 12), simple('opt_bacon', 'Tocino', 5)],
  }),
  group({
    id: 'mg_add_drink',
    name: 'Agregar bebida',
    ticketName: 'Bebida',
    cashierPrompt: 'Ofrece una bebida con cada plato de fondo',
    lastEditedLabel: 'Editado hoy 10:42 por Mario C.',
    options: [
      linked('opt_chicha', 'Chicha morada 500 ml', 'BEV-003', 6, { followUpGroupName: 'Hielo' }),
      linked('opt_inca', 'Inca Kola 500 ml', 'BEV-001', 5, { followUpGroupName: 'Hielo' }),
      linked('opt_agua', 'Agua mineral 625 ml', 'BEV-005', 3.5, {
        isAvailable: false,
        availabilityNote: 'Agotado en Miraflores · sincronizado desde el producto',
      }),
    ],
  }),
  group({
    id: 'mg_cooking_point',
    name: 'Término',
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
    name: 'Extras de hamburguesa',
    ticketName: 'Extras',
    maxSelections: 5,
    options: [
      simple('opt_cheese', 'Queso', 3),
      simple('opt_bacon_extra', 'Tocino', 5),
      simple('opt_egg', 'Huevo frito', 3),
      simple('opt_platano', 'Plátano frito', 3),
      simple('opt_jalapeno', 'Jalapeños', 2),
    ],
  }),
  group({
    id: 'mg_combo_side',
    name: 'Acompañamiento de combo',
    ticketName: 'Acompañamiento',
    minSelections: 1,
    options: [simple('opt_papas', 'Papas fritas', 0, true), simple('opt_ensalada', 'Ensalada'), simple('opt_chaufa', 'Arroz chaufa', 3)],
  }),
  group({
    id: 'mg_ice',
    name: 'Hielo',
    isNested: true,
    minSelections: 1,
    options: [simple('opt_with_ice', 'Con hielo', 0, true), simple('opt_no_ice', 'Sin hielo')],
  }),
  group({
    id: 'mg_burger_build',
    name: 'Armado de hamburguesa',
    maxSelections: 4,
    preModifiersEnabled: true,
    options: [
      simple('opt_lettuce', 'Lechuga'),
      simple('opt_tomato', 'Tomate'),
      simple('opt_onion', 'Cebolla'),
      simple('opt_pickles', 'Pepinillos'),
    ],
  }),
];
