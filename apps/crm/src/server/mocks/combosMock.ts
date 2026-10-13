import { ComboPricingMode, ComboReceiptMode, Tone, type ComboSlot, type ComboSlotItem } from '@noname/types';

const item = (
  productId: string,
  productName: string,
  sku: string,
  upcharge = 0,
  isDefault = false,
  isOutOfStock = false,
): ComboSlotItem => ({
  productId,
  productName,
  sku,
  upcharge,
  isDefault,
  isOutOfStock,
});

const slot = (id: string, name: string, hint: string, items: ComboSlotItem[]): ComboSlot => ({ id, name, isRequired: true, hint, items });

export interface ComboRecord {
  id: string;
  name: string;
  sku: string;
  tone: Tone;
  categoryId: string;
  pricingMode: ComboPricingMode;
  price: number;
  discount: number;
  availabilityLabel: string;
  locationsLabel: string;
  isActive: boolean;
  receiptMode: ComboReceiptMode;
  routeItemsToStations: boolean;
  deductStockPerItem: boolean;
  slots: ComboSlot[];
}

const defaults = {
  categoryId: 'cat_combos',
  pricingMode: ComboPricingMode.FixedPrice,
  discount: 0,
  availabilityLabel: 'All day',
  locationsLabel: 'All',
  isActive: true,
  receiptMode: ComboReceiptMode.SingleLine,
  routeItemsToStations: true,
  deductStockPerItem: true,
};

export const createCombosMock = (): ComboRecord[] => [
  {
    ...defaults,
    id: 'cmb_burger',
    name: 'Combo Burger',
    sku: 'COMBO-001',
    tone: Tone.Ink,
    price: 32,
    slots: [
      slot('slot_burger', 'Burger', "Pick 1 · keeps each burger's own modifiers (cooking point, extras)", [
        item('prd_classic_burger', 'Classic burger', 'BUR-001', 0, true),
        item('prd_cheese_burger', 'Cheese burger', 'BUR-002', 3),
        item('prd_crispy_chicken_burger', 'Crispy chicken burger', 'BUR-005', 2),
      ]),
      slot('slot_side', 'Side', 'Pick 1', [
        item('prd_papas_fritas', 'Papas fritas', 'SIDE-001', 0, true),
        item('prd_camote_frito', 'Camote frito', 'SIDE-003', 1.5),
        item('prd_side_salad', 'Side salad', 'SIDE-006'),
      ]),
      slot('slot_drink', 'Drink', 'Pick 1 · uses the "Add a drink" products', [
        item('prd_inca_kola', 'Inca Kola 500 ml', 'BEV-001', 0, true),
        item('prd_chicha_morada', 'Chicha morada 500 ml', 'BEV-003', 1),
        item('prd_agua_mineral', 'Agua mineral 625 ml', 'BEV-005', 0, false, true),
      ]),
    ],
  },
  {
    ...defaults,
    id: 'cmb_menu_del_dia',
    name: 'Menú del día',
    sku: 'COMBO-002',
    tone: Tone.Teal,
    price: 18,
    availabilityLabel: 'Mon–Fri · 12:00–15:00',
    slots: [
      slot('slot_entrada', 'Entrada', 'Pick 1', [
        item('prd_side_salad', 'Causa limeña', 'ENT-001', 0, true),
        item('prd_yuca_frita', 'Sopa del día', 'ENT-002'),
      ]),
      slot('slot_segundo', 'Segundo', 'Pick 1', [
        item('prd_aji_gallina', 'Ají de gallina', 'MAIN-004', 0, true),
        item('prd_lomo_saltado', 'Lomo saltado', 'MAIN-010', 6),
      ]),
      slot('slot_refresco', 'Refresco', 'Pick 1', [
        item('prd_chicha_morada', 'Chicha morada', 'BEV-003', 0, true),
        item('prd_limonada', 'Limonada', 'BEV-007'),
      ]),
    ],
  },
  {
    ...defaults,
    id: 'cmb_pollo_familiar',
    name: 'Pollo familiar',
    sku: 'COMBO-003',
    tone: Tone.Amber,
    price: 72,
    locationsLabel: '2 of 3',
    slots: [
      slot('slot_pollo', 'Pollo entero', 'Pick 1', [item('prd_pollo_brasa', 'Pollo a la brasa entero', 'MAIN-001', 0, true)]),
      slot('slot_papas', 'Papas', 'Pick 1', [item('prd_papas_fritas', 'Papas fritas familiar', 'SIDE-001', 0, true)]),
      slot('slot_ensalada', 'Ensalada', 'Pick 1', [item('prd_side_salad', 'Ensalada familiar', 'SIDE-006', 0, true)]),
      slot('slot_bebida', 'Bebida 1.5 L', 'Pick 1', [item('prd_inca_kola', 'Inca Kola 1.5 L', 'BEV-011', 0, true)]),
    ],
  },
  {
    ...defaults,
    id: 'cmb_salad_drink',
    name: 'Salad & drink',
    sku: 'COMBO-004',
    tone: Tone.Neutral,
    price: 27,
    isActive: false,
    slots: [
      slot('slot_salad', 'Salad', 'Pick 1', [
        item('prd_caesar_salad', 'Caesar salad', 'SAL-004', 0, true),
        item('prd_quinoa_salad', 'Quinoa salad', 'SAL-006', 2),
      ]),
      slot('slot_drink2', 'Drink', 'Pick 1', [
        item('prd_chicha_morada', 'Chicha morada 500 ml', 'BEV-003', 0, true),
        item('prd_inca_kola', 'Inca Kola 500 ml', 'BEV-001'),
      ]),
    ],
  },
];
