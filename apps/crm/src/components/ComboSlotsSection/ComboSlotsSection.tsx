import type { ComboSlot, ProductSummary } from '@noname/types';
import { Button, ButtonSize, Card, CardBody, CardHeader } from '@noname/ui';
import { ComboSlotCard } from '../ComboSlotCard/ComboSlotCard';
import styles from './ComboSlotsSection.module.css';

export interface ComboSlotsSectionProps {
  slots: ComboSlot[];
  products: ProductSummary[];
  onUpdateSlot: (slotId: string, changes: Partial<ComboSlot>) => void;
  onRemoveSlot: (slotId: string) => void;
  onAddSlot: (isRequired: boolean) => void;
  onAddItem: (slotId: string, product: ProductSummary) => void;
}

export const ComboSlotsSection = ({ slots, products, onUpdateSlot, onRemoveSlot, onAddSlot, onAddItem }: ComboSlotsSectionProps) => (
  <Card>
    <CardHeader
      title="Slots"
      subtitle="Each slot is one choice the cashier makes. Items are real products; upcharges add to the combo price."
      actions={
        <Button size={ButtonSize.Small} onClick={() => onAddSlot(true)}>
          Add slot
        </Button>
      }
    />
    <CardBody>
      {slots.map((slot, index) => (
        <ComboSlotCard
          key={slot.id}
          slot={slot}
          number={index + 1}
          products={products}
          onUpdate={(changes) => onUpdateSlot(slot.id, changes)}
          onRemove={() => onRemoveSlot(slot.id)}
          onAddItem={(product) => onAddItem(slot.id, product)}
        />
      ))}
      <button type="button" className={styles.addOptional} onClick={() => onAddSlot(false)}>
        Add an optional slot, e.g. &quot;Dessert +S/ 5.00&quot;
      </button>
    </CardBody>
  </Card>
);
