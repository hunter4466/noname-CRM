import type { ComboSlot, ComboSlotItem, ProductSummary } from '@noname/types';
import { Badge, BadgeTone, Button, ButtonSize, ButtonVariant, Select, TextInput } from '@noname/ui';
import { ComboSlotItemRow } from '../ComboSlotItemRow/ComboSlotItemRow';
import { ComboSlotNumber } from '../ComboSlotNumber/ComboSlotNumber';
import styles from './ComboSlotCard.module.css';

const ADD_PLACEHOLDER = '';

export interface ComboSlotCardProps {
  slot: ComboSlot;
  number: number;
  products: ProductSummary[];
  onUpdate: (changes: Partial<ComboSlot>) => void;
  onRemove: () => void;
  onAddItem: (product: ProductSummary) => void;
}

export const ComboSlotCard = ({ slot, number, products, onUpdate, onRemove, onAddItem }: ComboSlotCardProps) => {
  const addable = products.filter((product) => !slot.items.some((item) => item.productId === product.id));
  const updateItem = (productId: string, changes: Partial<ComboSlotItem>) =>
    onUpdate({
      items: slot.items.map((item) =>
        item.productId === productId ? { ...item, ...changes } : changes.isDefault ? { ...item, isDefault: false } : item,
      ),
    });
  const addProductById = (productId: string) => {
    const product = addable.find((candidate) => candidate.id === productId);
    if (product) {
      onAddItem(product);
    }
  };
  return (
    <div className={styles.slot}>
      <div className={styles.header}>
        <ComboSlotNumber number={number} />
        <TextInput
          className={styles.name}
          aria-label="Slot name"
          value={slot.name}
          onChange={(event) => onUpdate({ name: event.target.value })}
        />
        <Badge tone={slot.isRequired ? BadgeTone.Required : BadgeTone.Optional}>{slot.isRequired ? 'REQUIRED' : 'OPTIONAL'}</Badge>
        <span className="hint">{slot.hint}</span>
        <Button size={ButtonSize.Small} variant={ButtonVariant.Ghost} onClick={onRemove}>
          Remove slot
        </Button>
      </div>
      <div className={styles.items}>
        {slot.items.map((item) => (
          <ComboSlotItemRow
            key={item.productId}
            item={item}
            onUpdate={(changes) => updateItem(item.productId, changes)}
            onRemove={() => onUpdate({ items: slot.items.filter((candidate) => candidate.productId !== item.productId) })}
          />
        ))}
        <Select
          aria-label={`Add product to ${slot.name}`}
          value={ADD_PLACEHOLDER}
          options={[
            { value: ADD_PLACEHOLDER, label: 'Add a product…' },
            ...addable.map((product) => ({ value: product.id, label: `${product.name} · ${product.sku}` })),
          ]}
          onChange={(event) => addProductById(event.target.value)}
        />
      </div>
    </div>
  );
};
