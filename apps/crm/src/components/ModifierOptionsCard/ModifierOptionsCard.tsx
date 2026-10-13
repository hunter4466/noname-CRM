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
        title="Opciones"
        actions={
          <>
            <Select
              className={styles.link}
              aria-label="Vincular un producto"
              value={LINK_PLACEHOLDER}
              options={[
                { value: LINK_PLACEHOLDER, label: 'Vincular un producto…' },
                ...linkable.map((product) => ({ value: product.id, label: `${product.name} · ${product.sku}` })),
              ]}
              onChange={(event) => linkProductById(event.target.value)}
            />
            <Button size={ButtonSize.Small} onClick={onAddSimple}>
              Agregar opción simple
            </Button>
          </>
        }
      />
      <Table
        columns={[
          { label: 'Opción' },
          { label: 'Precio' },
          { label: 'Luego pregunta' },
          { label: 'Predeterminado' },
          { label: 'Disponible' },
          { label: <span className="visually-hidden">Acciones</span> },
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
        Los precios vinculados toman el precio del producto: cámbialo aquí para venderlo más barato dentro de este grupo.
      </div>
    </Card>
  );
};
