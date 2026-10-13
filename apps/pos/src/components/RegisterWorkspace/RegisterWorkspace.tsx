import type { MenuResponse } from '@noname/types';
import { useCheckout } from '@/hooks/useCheckout';
import { useModifierSheet } from '@/hooks/useModifierSheet';
import { useOrderCart } from '@/hooks/useOrderCart';
import { CheckoutStep } from '@/types/CheckoutStep';
import { MenuPanel } from '../MenuPanel/MenuPanel';
import { ModifierSheet } from '../ModifierSheet/ModifierSheet';
import { OrderPanel } from '../OrderPanel/OrderPanel';
import { PaymentComplete } from '../PaymentComplete/PaymentComplete';
import { PaymentPanel } from '../PaymentPanel/PaymentPanel';
import styles from './RegisterWorkspace.module.css';

export interface RegisterWorkspaceProps {
  menu: MenuResponse;
}

export const RegisterWorkspace = ({ menu }: RegisterWorkspaceProps) => {
  const cart = useOrderCart();
  const sheet = useModifierSheet(menu.modifierGroups, cart.addLine);
  const checkout = useCheckout(cart);
  return (
    <div className={styles.workspace}>
      <MenuPanel menu={menu} onPick={sheet.openItem} />
      <OrderPanel orderNumber={menu.nextOrderNumber} cart={cart} checkout={checkout} />
      {sheet.sheet && <ModifierSheet sheet={sheet} />}
      {checkout.step === CheckoutStep.Payment && <PaymentPanel orderNumber={menu.nextOrderNumber} cart={cart} checkout={checkout} />}
      {checkout.step === CheckoutStep.Done && checkout.completed && (
        <PaymentComplete order={checkout.completed} onNewOrder={checkout.startNewOrder} />
      )}
    </div>
  );
};
