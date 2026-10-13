import type { PaymentMethod } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { nonCashHint } from '@/lib/checkoutOptions';
import styles from './NonCashPayment.module.css';

export interface NonCashPaymentProps {
  method: PaymentMethod;
  total: number;
}

export const NonCashPayment = ({ method, total }: NonCashPaymentProps) => (
  <div className={styles.display}>
    <span className="hint">{nonCashHint[method]}</span>
    <b className={styles.amount}>{formatMoney(total)}</b>
  </div>
);
