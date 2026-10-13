import { roundMoney } from './money.ts';

export interface IgvBreakdown {
  taxableAmount: number;
  igvAmount: number;
  total: number;
}

/** Splits an IGV-inclusive total into "Op. gravada" + IGV, as printed on boletas/facturas. */
export const breakDownIgv = (totalWithIgv: number, igvRatePercent = 18): IgvBreakdown => {
  const taxableAmount = roundMoney(totalWithIgv / (1 + igvRatePercent / 100));
  return { taxableAmount, igvAmount: roundMoney(totalWithIgv - taxableAmount), total: roundMoney(totalWithIgv) };
};
