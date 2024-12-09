import { FormattedMessage } from "react-intl";
import { Separator } from "@/components/ui/separator";
import { FormattedCurrency } from "@/components/FormattedCurrency";

export default function Balances() {
  return (
    <div className="flex flex-col gap-3 bg-elevation-200 pt-4 pb-2 border-[1px] border-divider-50 rounded-2xl">
      <div className="flex-1 items-center justify-between px-4">
        <span className="text-text-300 text-base font-medium leading-6">
          <FormattedMessage
            id="Balances"
            defaultMessage="Balances"
            description="Balances section title for home page"
          />
        </span>

        <>BTC</>
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
            <FormattedCurrency value={+0.063308936} type="credit" />
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
            <FormattedCurrency value={-0.000678} type="debit" />
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
            <FormattedCurrency value={0.125698} color="none" />
            <span className="text-text-200 text-xs leading-[18px]">BTC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
