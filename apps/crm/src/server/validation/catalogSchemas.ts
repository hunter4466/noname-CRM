import { ComboPricingMode, ComboReceiptMode, IgvAffectation, ModifierOptionKind, UnitOfMeasure } from '@noname/types';
import { z } from 'zod';

const money = z.number().min(0).multipleOf(0.01);

export const productInputSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  sku: z.string().min(1, 'El SKU es obligatorio'),
  categoryId: z.string().min(1),
  price: money,
  description: z.string(),
  igvAffectation: z.enum(IgvAffectation),
  unitOfMeasure: z.enum(UnitOfMeasure),
  sunatProductCode: z.string(),
  appliesIcbper: z.boolean(),
  modifierGroups: z.array(z.object({ groupId: z.string(), maxOverride: z.number().int().min(0).nullable() })),
  locationSettings: z.array(
    z.object({
      locationId: z.string(),
      locationName: z.string(),
      isAvailable: z.boolean(),
      priceOverride: money.nullable(),
      routedPrinterName: z.string().nullable(),
      printerOptions: z.array(z.string()),
    }),
  ),
});

const modifierOptionSchema = z.object({
  id: z.string(),
  kind: z.enum(ModifierOptionKind),
  label: z.string().min(1),
  priceDelta: money,
  linkedProductSku: z.string().nullable(),
  followUpGroupName: z.string().nullable(),
  isDefault: z.boolean(),
  isAvailable: z.boolean(),
  availabilityNote: z.string().nullable(),
});

export const modifierGroupInputSchema = z
  .object({
    name: z.string().min(1, 'El nombre del grupo es obligatorio'),
    ticketName: z.string(),
    cashierPrompt: z.string(),
    minSelections: z.number().int().min(0),
    maxSelections: z.number().int().min(1),
    freeSelections: z.number().int().min(0),
    extraSelectionPrice: money,
    allowRepeats: z.boolean(),
    preModifiersEnabled: z.boolean(),
    preModifiers: z.array(z.object({ id: z.string(), label: z.string(), priceDelta: money })),
    isNested: z.boolean(),
    options: z.array(modifierOptionSchema),
  })
  .refine((group) => group.minSelections <= group.maxSelections, { message: 'El mínimo no puede superar al máximo' });

const comboSlotSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  isRequired: z.boolean(),
  hint: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      productName: z.string(),
      sku: z.string(),
      upcharge: money,
      isDefault: z.boolean(),
      isOutOfStock: z.boolean(),
    }),
  ),
});

export const comboInputSchema = z.object({
  name: z.string().min(1, 'El nombre del combo es obligatorio'),
  sku: z.string().min(1),
  categoryId: z.string(),
  pricingMode: z.enum(ComboPricingMode),
  price: money,
  discount: money,
  availabilityLabel: z.string(),
  locationsLabel: z.string(),
  isActive: z.boolean(),
  receiptMode: z.enum(ComboReceiptMode),
  routeItemsToStations: z.boolean(),
  deductStockPerItem: z.boolean(),
  slots: z.array(comboSlotSchema),
});
