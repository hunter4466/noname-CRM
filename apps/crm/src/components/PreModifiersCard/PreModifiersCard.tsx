import type { ModifierGroupInput } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { Card, CardHeader, Chip, Switch } from '@noname/ui';
import styles from './PreModifiersCard.module.css';

export interface PreModifiersCardProps {
  draft: ModifierGroupInput;
  onToggle: (enabled: boolean) => void;
}

export const PreModifiersCard = ({ draft, onToggle }: PreModifiersCardProps) => (
  <Card>
    <CardHeader
      title="Pre-modifiers"
      subtitle="Let the cashier say how much of an option. Best for dressings, sauces and toppings."
      actions={<Switch checked={draft.preModifiersEnabled} ariaLabel="Enable pre-modifiers" onChange={onToggle} />}
    />
    <div className={styles.body}>
      {draft.preModifiers.map((preModifier) => (
        <Chip key={preModifier.id}>
          {preModifier.priceDelta ? `${preModifier.label} · +${formatMoney(preModifier.priceDelta)}` : preModifier.label}
        </Chip>
      ))}
      <span className={styles.status}>{draft.preModifiersEnabled ? 'On for this group' : 'Off for this group'}</span>
    </div>
  </Card>
);
