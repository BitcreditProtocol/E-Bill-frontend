import { FormattedCurrency } from "../FormattedCurrency";

type BillProps = {
  title: string;
  date: string;
  amount: number | string;
  currency: string;
  hasPendingAction?: boolean;
  onClick?: () => void;
};

export default function Bill({
  title,
  date,
  amount,
  currency,
  hasPendingAction,
  onClick,
}: BillProps) {
  return (
    <div
      className="flex justify-between items-end p-4 bg-elevation-200 border-[1px] border-divider-50 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          {hasPendingAction && (
            <div className="h-2 w-2 bg-[#ff2600] rounded-full" />
          )}
          <span className="text-base font-medium text-text-300">{title}</span>
        </div>

        <span className="text-xs text-text-200">{date}</span>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-1 items-baseline">
          <FormattedCurrency value={Number(amount)} className="text-sm" />
          <span className="text-xs text-text-300">{currency}</span>
        </div>
      </div>
    </div>
  );
}
