import { SunatDocumentStatus, type CreatedOrder } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { Pill, PillTone } from '@noname/ui';
import { IconCheck } from '@noname/ui/icons';
import styles from './PaymentComplete.module.css';

export interface PaymentCompleteProps {
  order: CreatedOrder;
  onNewOrder: () => void;
}

export const PaymentComplete = ({ order, onNewOrder }: PaymentCompleteProps) => (
  <div className={styles.overlay}>
    <div className={styles.box}>
      <span className={styles.icon}>
        <IconCheck size={30} />
      </span>
      <div>
        <div className={styles.title}>Payment complete</div>
        <div className="hint">
          {order.documentLabel} <span className="mono">{order.documentNumber}</span> · printing on {order.printerLabel}
        </div>
      </div>
      {order.sunatStatus === SunatDocumentStatus.Accepted ? (
        <Pill tone={PillTone.Ok}>Sent to SUNAT · CDR accepted</Pill>
      ) : (
        <Pill>Internal document · not sent to SUNAT</Pill>
      )}
      {order.change > 0 && (
        <div className={styles.change}>
          <span className="hint">Change to give</span>
          <span className={styles.changeAmount}>{formatMoney(order.change)}</span>
        </div>
      )}
      <div className={styles.buttons}>
        <button type="button" className={styles.secondary} disabled title="Coming soon">
          Print again
        </button>
        <button type="button" className={styles.secondary} disabled title="Coming soon">
          Send by email / WhatsApp
        </button>
        <button type="button" className={styles.primary} onClick={onNewOrder}>
          New order
        </button>
      </div>
    </div>
  </div>
);
