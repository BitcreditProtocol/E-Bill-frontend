import Big from 'big.js';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1_000;

export const daysBetween = (startDate: Date, endDate: Date): number => {
  const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  return Math.round((start - end) / MILLISECONDS_PER_DAY);
};

const BIG_1 = new Big("1");
const BIG_360 = new Big("360");

const factor = (discountRate: Big, days: number) => {
  const discountDays = discountRate.times(days).div(BIG_360);
  return BIG_1.minus(discountDays);
}

export const Act360 = {
  netToGross: (netAmount: Big, discountRate: Big, days: number) : Big | undefined => {
    const divisor = factor(discountRate, days);
    return divisor.toNumber() !== 0 ? netAmount.div(divisor) : undefined;
  },
  grossToNet: (grossAmount: Big, discountRate: Big, days: number) : Big => {
    return grossAmount.times(factor(discountRate, days));
  }
};
