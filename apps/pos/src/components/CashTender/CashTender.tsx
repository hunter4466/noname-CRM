import { formatMoney } from '@noname/domain';
import { classNames } from '@noname/ui';
import type { CheckoutState } from '@/hooks/useCheckout';
import { quickCashAmounts } from '@/lib/checkoutOptions';
import { KeypadKey } from '@/types/KeypadKey';
import { Keypad } from '../Keypad/Keypad';
import styles from './CashTender.module.css';

const CASH_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', KeypadKey.Decimal, '0', KeypadKey.Delete];

export interface CashTenderProps {
  total: number;
  checkout: CheckoutState;
}

export const CashTender = ({ total, checkout }: CashTenderProps) => {
  const isShort = checkout.change < 0;
  return (
    <div className={styles.row}>
      <div className={styles.tender}>
        <div className={styles.display}>
          <span className="hint">Received</span>
          <b className={styles.amount}>{formatMoney(Number(checkout.tendered) || 0)}</b>
        </div>
        <div className={styles.quick}>
          {quickCashAmounts(total).map((amount) => (
            <button key={amount} type="button" className={styles.quickButton} onClick={() => checkout.setTenderedAmount(amount)}>
              {formatMoney(amount)}
            </button>
          ))}
        </div>
        <div className={classNames(styles.change, isShort && styles.short)}>
          <span>{isShort ? 'Still missing' : 'Change'}</span>
          <span className="mono">{formatMoney(Math.abs(checkout.change))}</span>
        </div>
      </div>
      <div className={styles.pad}>
        <Keypad keys={CASH_KEYS} ariaLabel="Cash keypad" onPress={checkout.pressTenderKey} />
      </div>
    </div>
  );
};
