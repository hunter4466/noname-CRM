import { IgvAffectation, ProductStatus, Tone, UnitOfMeasure, type Product } from '@noname/types';

const locationSettings = (overrides: Partial<Record<'loc_miraflores' | 'loc_san_isidro' | 'loc_barranco', boolean>> = {}) => [
  {
    locationId: 'loc_miraflores',
    locationName: 'Miraflores',
    isAvailable: overrides.loc_miraflores ?? true,
    priceOverride: null,
    routedPrinterName: 'Kitchen',
    printerOptions: ['Kitchen', 'Cold station'],
  },
  {
    locationId: 'loc_san_isidro',
    locationName: 'San Isidro',
    isAvailable: overrides.loc_san_isidro ?? true,
    priceOverride: null,
    routedPrinterName: 'Kitchen',
    printerOptions: ['Kitchen'],
  },
  {
    locationId: 'loc_barranco',
    locationName: 'Barranco',
    isAvailable: overrides.loc_barranco ?? true,
    priceOverride: null,
    routedPrinterName: null,
    printerOptions: ['Bar'],
  },
];

interface ProductSeed {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  price: number;
  tone: Tone;
  groupIds?: string[];
  status?: ProductStatus;
  description?: string;
  usedInGroupName?: string;
  availability?: Parameters<typeof locationSettings>[0];
}

const seeds: ProductSeed[] = [
  {
    id: 'prd_classic_burger',
    name: 'Classic burger',
    sku: 'BUR-001',
    categoryId: 'cat_burgers',
    price: 29,
    tone: Tone.Amber,
    groupIds: ['mg_cooking_point', 'mg_burger_extras', 'mg_combo_side'],
  },
  {
    id: 'prd_cheese_burger',
    name: 'Cheese burger',
    sku: 'BUR-002',
    categoryId: 'cat_burgers',
    price: 32,
    tone: Tone.Amber,
    groupIds: ['mg_cooking_point', 'mg_burger_extras'],
  },
  {
    id: 'prd_crispy_chicken_burger',
    name: 'Crispy chicken burger',
    sku: 'BUR-005',
    categoryId: 'cat_burgers',
    price: 31,
    tone: Tone.Amber,
    groupIds: ['mg_burger_extras'],
  },
  {
    id: 'prd_caesar_salad',
    name: 'Caesar salad',
    sku: 'SAL-004',
    categoryId: 'cat_salads',
    price: 24,
    tone: Tone.Teal,
    groupIds: ['mg_dressing', 'mg_add_protein', 'mg_add_drink'],
    description: 'Romaine, parmesan, croutons. Choose your dressing.',
    availability: { loc_barranco: false },
  },
  {
    id: 'prd_quinoa_salad',
    name: 'Quinoa salad',
    sku: 'SAL-006',
    categoryId: 'cat_salads',
    price: 26,
    tone: Tone.Teal,
    groupIds: ['mg_dressing'],
  },
  {
    id: 'prd_lomo_saltado',
    name: 'Lomo saltado',
    sku: 'MAIN-010',
    categoryId: 'cat_mains',
    price: 35,
    tone: Tone.Red,
    groupIds: ['mg_cooking_point', 'mg_cremas'],
    availability: { loc_barranco: false },
  },
  {
    id: 'prd_pollo_brasa',
    name: 'Pollo a la brasa ¼',
    sku: 'MAIN-002',
    categoryId: 'cat_mains',
    price: 22,
    tone: Tone.Amber,
    groupIds: ['mg_combo_side', 'mg_cremas'],
  },
  { id: 'prd_aji_gallina', name: 'Ají de gallina', sku: 'MAIN-004', categoryId: 'cat_mains', price: 28, tone: Tone.Yellow },
  {
    id: 'prd_papas_fritas',
    name: 'Papas fritas',
    sku: 'SIDE-001',
    categoryId: 'cat_sides',
    price: 9,
    tone: Tone.Neutral,
    groupIds: ['mg_cremas'],
  },
  { id: 'prd_camote_frito', name: 'Camote frito', sku: 'SIDE-003', categoryId: 'cat_sides', price: 10, tone: Tone.Amber },
  { id: 'prd_side_salad', name: 'Side salad', sku: 'SIDE-006', categoryId: 'cat_sides', price: 8, tone: Tone.Teal },
  {
    id: 'prd_yuca_frita',
    name: 'Yuca frita',
    sku: 'SIDE-004',
    categoryId: 'cat_sides',
    price: 9,
    tone: Tone.Neutral,
    groupIds: ['mg_cremas'],
  },
  {
    id: 'prd_chicha_morada',
    name: 'Chicha morada 500 ml',
    sku: 'BEV-003',
    categoryId: 'cat_beverages',
    price: 6,
    tone: Tone.Violet,
    usedInGroupName: 'Add a drink',
  },
  {
    id: 'prd_inca_kola',
    name: 'Inca Kola 500 ml',
    sku: 'BEV-001',
    categoryId: 'cat_beverages',
    price: 5,
    tone: Tone.Yellow,
    usedInGroupName: 'Add a drink',
  },
  { id: 'prd_limonada', name: 'Limonada', sku: 'BEV-007', categoryId: 'cat_beverages', price: 8, tone: Tone.Yellow },
  {
    id: 'prd_agua_mineral',
    name: 'Agua mineral 625 ml',
    sku: 'BEV-005',
    categoryId: 'cat_beverages',
    price: 3.5,
    tone: Tone.Blue,
    status: ProductStatus.OutOfStock,
    usedInGroupName: 'Add a drink',
    availability: { loc_san_isidro: false, loc_barranco: false },
  },
];

// Stored without the derived fields (categoryName, modifierGroupNames, locationsLabel) —
// the repository computes those on read so they never go stale.
export type ProductRecord = Omit<Product, 'categoryName' | 'modifierGroupNames' | 'locationsLabel'>;

export const createProductsMock = (): ProductRecord[] =>
  seeds.map((seed) => ({
    id: seed.id,
    name: seed.name,
    sku: seed.sku,
    categoryId: seed.categoryId,
    price: seed.price,
    status: seed.status ?? ProductStatus.Active,
    tone: seed.tone,
    usedInGroupName: seed.usedInGroupName ?? null,
    description: seed.description ?? '',
    igvAffectation: IgvAffectation.GravadoOnerosa,
    unitOfMeasure: UnitOfMeasure.Unit,
    sunatProductCode: '90101501',
    appliesIcbper: false,
    modifierGroups: (seed.groupIds ?? []).map((groupId) => ({
      groupId,
      maxOverride: seed.id === 'prd_caesar_salad' && groupId === 'mg_add_protein' ? 2 : null,
    })),
    locationSettings: locationSettings(seed.availability),
  }));
