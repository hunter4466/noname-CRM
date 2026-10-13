import type { ProductSummary } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { Chip, ChipList, Pill } from '@noname/ui';
import Link from 'next/link';
import { productStatusLabel, productStatusTone } from '@/lib/productStatus';
import { productRoute, Route } from '@/types/Route';
import { NameCell } from '../shared/NameCell/NameCell';
import { TableCell } from '../shared/TableCell/TableCell';

export interface ProductRowProps {
  product: ProductSummary;
}

export const ProductRow = ({ product }: ProductRowProps) => (
  <tr>
    <TableCell>
      <input type="checkbox" aria-label={`Select ${product.name}`} />
    </TableCell>
    <TableCell>
      <NameCell name={product.name} code={product.sku} href={productRoute(product.id)} tone={product.tone} />
    </TableCell>
    <TableCell muted>{product.categoryName}</TableCell>
    <TableCell money>{formatMoney(product.price)}</TableCell>
    <TableCell>
      {product.usedInGroupName ? (
        <span className="hint">
          Used as option in <Link href={Route.ModifierGroups}>{product.usedInGroupName}</Link>
        </span>
      ) : (
        <ChipList>
          {product.modifierGroupNames.map((groupName) => (
            <Chip key={groupName}>{groupName}</Chip>
          ))}
        </ChipList>
      )}
    </TableCell>
    <TableCell muted>{product.locationsLabel}</TableCell>
    <TableCell>
      <Pill tone={productStatusTone[product.status]} withDot>
        {productStatusLabel[product.status]}
      </Pill>
    </TableCell>
  </tr>
);
