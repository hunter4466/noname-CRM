import { DocumentType } from '@noname/types';
import { IconArrowLeft } from '@noname/ui/icons';
import type { CheckoutState } from '@/hooks/useCheckout';
import type { OrderCart } from '@/hooks/useOrderCart';
import { documentChoices, paymentChoices } from '@/lib/checkoutOptions';
import { CashTender } from '../CashTender/CashTender';
import { ChoiceCard } from '../ChoiceCard/ChoiceCard';
import { CustomerDocumentField } from '../CustomerDocumentField/CustomerDocumentField';
import { NonCashPayment } from '../NonCashPayment/NonCashPayment';
import { PaymentSummary } from '../PaymentSummary/PaymentSummary';
import styles from './PaymentPanel.module.css';

export interface PaymentPanelProps {
  orderNumber: number;
  cart: OrderCart;
  checkout: CheckoutState;
}

export const PaymentPanel = ({ orderNumber, cart, checkout }: PaymentPanelProps) => (
  <div className={styles.overlay}>
    <div className={styles.left}>
      <button type="button" className={styles.back} onClick={checkout.backToOrder}>
        <IconArrowLeft size={16} /> Volver al pedido
      </button>
      <section className={styles.section}>
        <h3 className={styles.heading}>Comprobante</h3>
        <div className={styles.choices}>
          {documentChoices.map((choice) => (
            <ChoiceCard
              key={choice.value}
              label={choice.label}
              detail={choice.detail}
              isSelected={checkout.documentType === choice.value}
              onSelect={() => checkout.setDocumentType(choice.value)}
            />
          ))}
        </div>
      </section>
      <CustomerDocumentField
        isFactura={checkout.documentType === DocumentType.Factura}
        value={checkout.customerDocument}
        onChange={checkout.setCustomerDocument}
      />
      <section className={styles.section}>
        <h3 className={styles.heading}>Pago</h3>
        <div className={styles.choices}>
          {paymentChoices.map((choice) => (
            <ChoiceCard
              key={choice.value}
              label={choice.label}
              detail={choice.detail}
              isSelected={checkout.paymentMethod === choice.value}
              onSelect={() => checkout.setPaymentMethod(choice.value)}
            />
          ))}
        </div>
      </section>
      {checkout.isCash ? (
        <CashTender total={cart.total} checkout={checkout} />
      ) : (
        <NonCashPayment method={checkout.paymentMethod} total={cart.total} />
      )}
    </div>
    <PaymentSummary orderNumber={orderNumber} cart={cart} checkout={checkout} />
  </div>
);
