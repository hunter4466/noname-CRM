import { Card, CardBody, CardHeader, Chip, ChipList } from '@noname/ui';
import { pluralize } from '@/lib/pluralize';

const VISIBLE_PRODUCTS = 6;

export interface ModifierGroupUsageCardProps {
  productNames: string[];
}

export const ModifierGroupUsageCard = ({ productNames }: ModifierGroupUsageCardProps) => (
  <Card>
    <CardHeader
      title={`Usado en ${pluralize(productNames.length, 'producto')}`}
      subtitle="Vincula o desvincula este grupo desde el editor de cada producto."
    />
    <CardBody>
      {productNames.length === 0 ? (
        <span className="hint">Aún no está vinculado a ningún producto.</span>
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
