import { OrderType } from '@noname/types';
import { formatMoney } from '@noname/domain';
import type { CheckoutState } from '@/hooks/useCheckout';
import type { OrderCart } from '@/hooks/useOrderCart';
import { OrderTotals } from '../OrderTotals/OrderTotals';
import { pluralize } from '@/lib/pluralize';
import styles from './PaymentSummary.module.css';

const orderTypeLabel: Record<OrderType, string> = {
  [OrderType.DineIn]: 'En salón',
  [OrderType.Takeaway]: 'Para llevar',
  [OrderType.Curbside]: 'Recojo',
};

export interface PaymentSummaryProps {
  orderNumber: number;
  cart: OrderCart;
  checkout: CheckoutState;
}

export const PaymentSummary = ({ orderNumber, cart, checkout }: PaymentSummaryProps) => (
  <aside className={styles.summary}>
    <div>
      <h2 className={styles.title}>Pedido #{String(orderNumber).padStart(4, '0')}</h2>
      <div className="hint">{`${orderTypeLabel[checkout.orderType]} · ${pluralize(cart.itemCount, 'ítem')}`}</div>
    </div>
    <div className={styles.lines}>
      {cart.lines.map((line) => (
        <div key={line.key} className={styles.line}>
          <div>
            <div>{`${line.quantity} × ${line.name}`}</div>
            {line.modifierLabels.map((label) => (
              <div key={label} className="hint">
                + {label}
              </div>
            ))}
          </div>
          <span className="mono">{formatMoney(line.unitPrice * line.quantity)}</span>
        </div>
      ))}
    </div>
    <OrderTotals breakdown={cart.breakdown} />
    {checkout.createOrder.error && (
      <div className={styles.error} role="alert">
        {checkout.createOrder.error.message}
      </div>
    )}
    <button type="button" className={styles.confirm} disabled={!checkout.canConfirm} onClick={checkout.confirm}>
      {checkout.createOrder.isPending ? 'Enviando a SUNAT…' : 'Confirmar e imprimir'}
    </button>
  </aside>
);
