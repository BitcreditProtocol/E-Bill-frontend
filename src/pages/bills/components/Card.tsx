import { FormattedCurrency } from "@/components/FormattedCurrency";

type CardProps = {
  name: string;
  date: string;
  amount: number;
  currency: string;
};

export function Card({ name, date, amount, currency }: CardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
      <div className="flex flex-col gap-0.5">
        <span className="text-text-300 text-base font-medium leading-6">
          {name}
        </span>
        <span className="text-text-200 text-xs font-normal leading-normal">
          {date}
        </span>
      </div>

      <div className="flex items-center gap-1 self-end">
        <FormattedCurrency className="text-sm" value={amount} type="credit" />
        <span className="text-text-200 text-[10px] font-normal leading-normal uppercase">
          {currency}
        </span>
      </div>
    </div>
  );
}
