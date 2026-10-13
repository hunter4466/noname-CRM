export const roundMoney = (amount: number) => Math.round(amount * 100) / 100;

/** "S/ 1,330.00" */
export const formatMoney = (amount: number) =>
  `S/ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** "1,330.00" — for tickets where the currency is printed once. */
export const formatAmount = (amount: number) => amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
