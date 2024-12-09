import { FormattedMessage } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { Skeleton } from "@/components/ui/skeleton";
import { getBalances } from "@/services/balances";

type CurrencySelectorProps = {
  currency: string;
  changeCurrency: (currency: string) => void;
};

function CurrencySelector({ currency, changeCurrency }: CurrencySelectorProps) {
  return (
    <button
      className="flex items-center text-text-300"
      onChange={() => {
        changeCurrency(currency);
      }}
    >
      <span className="text-xs font-medium leading-[18px]">{currency}</span>
      <ChevronDownIcon className="h-4 w-4" strokeWidth={1} />
    </button>
  );
}

export default function Balances() {
  const { isPending, data } = useQuery({
    queryKey: ["balances", "btc"],
    queryFn: () => getBalances("btc"),
  });

  return (
    <div className="flex flex-col gap-3 bg-elevation-200 pt-4 pb-2 border-[1px] border-divider-50 rounded-2xl">
      <div className="flex-1 flex items-center justify-between px-4">
        <span className="text-text-300 text-base font-medium leading-6">
          <FormattedMessage
            id="Balances"
            defaultMessage="Balances"
            description="Balances section title for home page"
          />
        </span>

        <CurrencySelector
          currency="BTC"
          changeCurrency={(currency) => {
            console.log(currency);
          }}
        />
      </div>

      <Separator className="bg-divider-75" />

      <div className="flex flex-col gap-3 pb-2 px-4">
        <div className="flex items-start justify-between py-2 border-b-[1px] border-divider-75">
          <span className="text-text-200 text-sm">
            <FormattedMessage
              id="Payee"
              defaultMessage="Payee"
              description="Payee label for balances section"
            />
          </span>

          <div className="flex items-center gap-1.5">
            {isPending || !data ? (
              <Skeleton className="w-16 h-5 bg-elevation-300 rounded-sm" />
            ) : (
              <FormattedCurrency
                value={+Number(data.balances.payee.amount)}
                type="credit"
              />
            )}
            <span className="text-text-200 text-xs leading-[18px]">BTC</span>
          </div>
        </div>

        <div className="flex items-start justify-between py-2 border-b-[1px] border-divider-75">
          <span className="text-text-200 text-sm">
            <FormattedMessage
              id="Payer"
              defaultMessage="Payer"
              description="Payer label for balances section"
            />
          </span>

          <div className="flex items-center gap-1.5">
            {isPending || !data ? (
              <Skeleton className="w-16 h-5 bg-elevation-300 rounded-sm" />
            ) : (
              <FormattedCurrency
                value={-Number(data.balances.payer.amount)}
                type="debit"
              />
            )}
            <span className="text-text-200 text-xs leading-[18px]">BTC</span>
          </div>
        </div>

        <div className="flex items-start justify-between py-2">
          <span className="text-text-200 text-sm">
            <FormattedMessage
              id="Contingent"
              defaultMessage="Contingent"
              description="Contingent label for balances section"
            />
          </span>

          <div className="flex items-center gap-1.5">
            {isPending || !data ? (
              <Skeleton className="w-16 h-5 bg-elevation-300 rounded-sm" />
            ) : (
              <FormattedCurrency
                value={Number(data.balances.contingent.amount)}
                color="none"
              />
            )}
            <span className="text-text-200 text-xs leading-[18px]">BTC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
