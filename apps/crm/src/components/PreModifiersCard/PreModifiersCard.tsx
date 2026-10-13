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
      title="Premodificadores"
      subtitle="Permite al cajero indicar cuánto de una opción. Ideal para aderezos, salsas y toppings."
      actions={<Switch checked={draft.preModifiersEnabled} ariaLabel="Activar premodificadores" onChange={onToggle} />}
    />
    <div className={styles.body}>
      {draft.preModifiers.map((preModifier) => (
        <Chip key={preModifier.id}>
          {preModifier.priceDelta ? `${preModifier.label} · +${formatMoney(preModifier.priceDelta)}` : preModifier.label}
        </Chip>
      ))}
      <span className={styles.status}>{draft.preModifiersEnabled ? 'Activado para este grupo' : 'Desactivado para este grupo'}</span>
    </div>
  </Card>
);
