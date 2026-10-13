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
        <div className={styles.title}>Pago completado</div>
        <div className="hint">
          {order.documentLabel} <span className="mono">{order.documentNumber}</span> · imprimiendo en {order.printerLabel}
        </div>
      </div>
      {order.sunatStatus === SunatDocumentStatus.Accepted ? (
        <Pill tone={PillTone.Ok}>Enviado a SUNAT · CDR aceptado</Pill>
      ) : (
        <Pill>Documento interno · no se envía a SUNAT</Pill>
      )}
      {order.change > 0 && (
        <div className={styles.change}>
          <span className="hint">Vuelto a entregar</span>
          <span className={styles.changeAmount}>{formatMoney(order.change)}</span>
        </div>
      )}
      <div className={styles.buttons}>
        <button type="button" className={styles.secondary} disabled title="Próximamente">
          Imprimir de nuevo
        </button>
        <button type="button" className={styles.secondary} disabled title="Próximamente">
          Enviar por correo / WhatsApp
        </button>
        <button type="button" className={styles.primary} onClick={onNewOrder}>
          Nuevo pedido
        </button>
      </div>
    </div>
  </div>
);
