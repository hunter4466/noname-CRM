import { Card, CardBody, CardHeader, Chip, ChipList } from '@noname/ui';
import { pluralize } from '@/lib/pluralize';

const VISIBLE_PRODUCTS = 6;

export interface ModifierGroupUsageCardProps {
  productNames: string[];
}

export const ModifierGroupUsageCard = ({ productNames }: ModifierGroupUsageCardProps) => (
  <Card>
    <CardHeader
      title={`Used in ${pluralize(productNames.length, 'product')}`}
      subtitle="Attach or detach this group from each product's editor."
    />
    <CardBody>
      {productNames.length === 0 ? (
        <span className="hint">Not attached to any product yet.</span>
      ) : (
        <ChipList>
          {productNames.slice(0, VISIBLE_PRODUCTS).map((productName) => (
            <Chip key={productName}>{productName}</Chip>
          ))}
          {productNames.length > VISIBLE_PRODUCTS && <Chip>+ {productNames.length - VISIBLE_PRODUCTS} more</Chip>}
        </ChipList>
      )}
    </CardBody>
  </Card>
);
