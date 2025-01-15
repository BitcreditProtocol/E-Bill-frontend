import { FormattedCurrency } from "@/components/FormattedCurrency";

type BillPreviewProps = {
  company: string;
  date: string;
  amount: number;
};

export default function BillPreview({
  company,
  date,
  amount,
}: BillPreviewProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
      <div className="flex flex-col gap-0.5">
        <span className="text-text-300 text-base font-medium leading-6">
          {company}
        </span>
        <span className="text-text-200 text-xs font-normal leading-[18px]">
          {date}
        </span>
      </div>

      <div className="flex items-center gap-1 self-end">
        <FormattedCurrency className="text-sm" value={amount} type="credit" />
        <span className="text-text-200 text-[10px]">BTC</span>
      </div>
    </div>
  );
}
