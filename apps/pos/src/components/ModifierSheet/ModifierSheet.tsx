import { formatMoney } from '@noname/domain';
import { IconClose } from '@noname/ui/icons';
import type { ModifierSheetState } from '@/hooks/useModifierSheet';
import { QuantityStepper } from '../QuantityStepper/QuantityStepper';
import { SheetOptionGroup } from '../SheetOptionGroup/SheetOptionGroup';
import styles from './ModifierSheet.module.css';

export interface ModifierSheetProps {
  sheet: ModifierSheetState;
}

export const ModifierSheet = ({ sheet }: ModifierSheetProps) => {
  if (!sheet.sheet) {
    return null;
  }
  const { item, selection, quantity } = sheet.sheet;
  const isBlocked = sheet.missingGroupNames.length > 0;
  return (
    <div className={styles.scrim} onClick={sheet.close}>
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-label={item.name} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{item.name}</h3>
            <div className="hint mono">{formatMoney(item.price)}</div>
          </div>
          <button type="button" className={styles.close} aria-label="Cerrar" onClick={sheet.close}>
            <IconClose />
          </button>
        </div>
        <div className={styles.body}>
          {sheet.groups.map((group) => (
            <SheetOptionGroup
              key={group.id}
              group={group}
              chosenIds={selection[group.id] ?? []}
              onToggle={(optionId) => sheet.toggle(group.id, optionId)}
            />
          ))}
          {isBlocked && <div className={styles.warning}>Choose: {sheet.missingGroupNames.join(', ')}</div>}
        </div>
        <div className={styles.footer}>
          <QuantityStepper value={quantity} minimum={1} onChange={sheet.changeQuantity} />
          <button type="button" className={styles.add} disabled={isBlocked} onClick={sheet.confirm}>
            <span>Agregar al pedido</span>
            <span className="mono">{formatMoney(sheet.unitPrice * quantity)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
