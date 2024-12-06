
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1_000;

export const daysBetween = (startDate: Date, endDate: Date): number => {
  const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  return Math.round((start - end) / MILLISECONDS_PER_DAY);
};

export const Act360 = {
  netToGross: (netAmount: number, discountRate: number, days: number) => {
    const discountDays = discountRate * days / 360;
    return netAmount / (1 - discountDays);
  }
};
