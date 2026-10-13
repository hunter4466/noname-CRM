import type { ModifierOption, ProductSummary } from '@noname/types';
import { Button, ButtonSize, Card, CardHeader, Select } from '@noname/ui';
import { ModifierOptionRow } from '../ModifierOptionRow/ModifierOptionRow';
import { Table } from '../shared/Table/Table';
import styles from './ModifierOptionsCard.module.css';

const LINK_PLACEHOLDER = '';

export interface ModifierOptionsCardProps {
  options: ModifierOption[];
  products: ProductSummary[];
  onUpdate: (optionId: string, changes: Partial<ModifierOption>) => void;
  onSetDefault: (optionId: string) => void;
  onRemove: (optionId: string) => void;
  onAddSimple: () => void;
  onLinkProduct: (product: ProductSummary) => void;
}

export const ModifierOptionsCard = ({
  options,
  products,
  onUpdate,
  onSetDefault,
  onRemove,
  onAddSimple,
  onLinkProduct,
}: ModifierOptionsCardProps) => {
  const linkable = products.filter((product) => !options.some((option) => option.linkedProductSku === product.sku));
  const linkProductById = (productId: string) => {
    const product = linkable.find((candidate) => candidate.id === productId);
    if (product) {
      onLinkProduct(product);
    }
  };
  return (
    <Card>
      <CardHeader
        title="Options"
        actions={
          <>
            <Select
              className={styles.link}
              aria-label="Link a product"
              value={LINK_PLACEHOLDER}
              options={[
                { value: LINK_PLACEHOLDER, label: 'Link a product…' },
                ...linkable.map((product) => ({ value: product.id, label: `${product.name} · ${product.sku}` })),
              ]}
              onChange={(event) => linkProductById(event.target.value)}
            />
            <Button size={ButtonSize.Small} onClick={onAddSimple}>
              Add simple option
            </Button>
          </>
        }
      />
      <Table
        columns={[
          { label: 'Option' },
          { label: 'Price' },
          { label: 'Then ask' },
          { label: 'Default' },
          { label: 'Available' },
          { label: <span className="visually-hidden">Actions</span> },
        ]}
      >
        {options.map((option) => (
          <ModifierOptionRow
            key={option.id}
            option={option}
            onUpdate={(changes) => onUpdate(option.id, changes)}
            onSetDefault={() => onSetDefault(option.id)}
            onRemove={() => onRemove(option.id)}
          />
        ))}
      </Table>
      <div className={styles.footnote}>
        Linked prices default to the product&apos;s own price — change it here to sell the item cheaper inside this group.
      </div>
    </Card>
  );
};
