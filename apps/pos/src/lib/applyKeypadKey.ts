import { KeypadKey } from '@/types/KeypadKey';

export interface KeypadRules {
  maxLength?: number;
  allowDecimal?: boolean;
  maxDecimals?: number;
}

/** Pure keypad reducer shared by the PIN pad and the cash tender pad. */
export const applyKeypadKey = (current: string, key: string, rules: KeypadRules = {}) => {
  if (key === KeypadKey.Clear) {
    return '';
  }
  if (key === KeypadKey.Delete) {
    return current.slice(0, -1);
  }
  if (key === KeypadKey.Decimal) {
    return rules.allowDecimal && !current.includes('.') ? `${current || '0'}.` : current;
  }
  if (rules.maxLength !== undefined && current.length >= rules.maxLength) {
    return current;
  }
  const decimals = current.split('.')[1];
  if (decimals !== undefined && decimals.length >= (rules.maxDecimals ?? 2)) {
    return current;
  }
  return current + key;
};
