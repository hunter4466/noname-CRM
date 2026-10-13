import { OrderType } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { SegmentedControl } from '@noname/ui';
import type { CheckoutState } from '@/hooks/useCheckout';
import type { OrderCart } from '@/hooks/useOrderCart';
import { OrderLineRow } from '../OrderLineRow/OrderLineRow';
import { OrderTotals } from '../OrderTotals/OrderTotals';
import { pluralize } from '@/lib/pluralize';
import styles from './OrderPanel.module.css';

const orderTypes = [
  { value: OrderType.DineIn, label: 'En salón' },
  { value: OrderType.Takeaway, label: 'Para llevar' },
  { value: OrderType.Curbside, label: 'Recojo' },
];

export interface OrderPanelProps {
  orderNumber: number;
  cart: OrderCart;
  checkout: CheckoutState;
}

export const OrderPanel = ({ orderNumber, cart, checkout }: OrderPanelProps) => (
  <aside className={styles.order} aria-label="Pedido actual">
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>Pedido #{String(orderNumber).padStart(4, '0')}</h2>
        <span className="hint">{pluralize(cart.itemCount, 'ítem')}</span>
      </div>
      <SegmentedControl
        ariaLabel="Tipo de pedido"
        options={orderTypes}
        value={checkout.orderType}
        onChange={checkout.setOrderType}
        stretch
      />
    </div>
    <div className={styles.lines}>
      {cart.lines.length === 0 && (
        <div className={styles.empty}>
          <strong>Aún no hay ítems</strong>
          <span>Toca un producto para empezar el pedido</span>
        </div>
      )}
      {cart.lines.map((line) => (
        <OrderLineRow
          key={line.key}
          line={line}
          onQuantityChange={(delta) => cart.changeQuantity(line.key, delta)}
          onRemove={() => cart.removeLine(line.key)}
        />
      ))}
    </div>
    <div className={styles.footer}>
      <OrderTotals breakdown={cart.breakdown} />
      <div className={styles.buttons}>
        <button type="button" className={styles.clear} disabled={cart.lines.length === 0} onClick={cart.clear}>
          Limpiar
        </button>
        <button type="button" className={styles.charge} disabled={cart.lines.length === 0} onClick={checkout.goToPayment}>
          <span>Cobrar</span>
          <span className="mono">{formatMoney(cart.total)}</span>
        </button>
      </div>
    </div>
  </aside>
);
