import { ProductStatus } from '@noname/types';
import { PillTone } from '@noname/ui';

export const productStatusLabel: Record<ProductStatus, string> = {
  [ProductStatus.Active]: 'Activo',
  [ProductStatus.OutOfStock]: 'Agotado',
  [ProductStatus.Archived]: 'Archivado',
};

export const productStatusTone: Record<ProductStatus, PillTone> = {
  [ProductStatus.Active]: PillTone.Ok,
  [ProductStatus.OutOfStock]: PillTone.Warn,
  [ProductStatus.Archived]: PillTone.Neutral,
};
