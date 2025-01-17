import { FormattedMessage } from "react-intl";
import { CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type EndorsementProps = {
  payee: string;
  payeeAddress: string;
  signer: string;
  localAndDate: string;
};

export default function Endorsement({
  payee,
  payeeAddress,
  signer,
  localAndDate,
}: EndorsementProps) {
  return (
    <div className="flex flex-col border border-divider-75 rounded-xl select-none">
      <div className="flex flex-col gap-3 p-3 bg-elevation-200 border-b border-b-divider-75 rounded-t-xl">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-brand-100 text-brand-200 text-sm font-medium text-center rounded-md">
              N
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-200 text-xs font-normal">
                <FormattedMessage
                  id="endorsement.payee"
                  defaultMessage="Pay to the order of"
                  description="Payee label"
                />
              </span>
              <span className="text-text-300 text-sm font-medium">{payee}</span>
              <span className="text-text-200 text-xs font-normal">
                {payeeAddress}
              </span>
            </div>
          </div>

          <Separator className="bg-divider-75" />

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-brand-100 text-brand-200 text-sm font-medium text-center rounded-md">
              A
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-200 text-xs font-normal">
                <FormattedMessage
                  id="endorsement.signer"
                  defaultMessage="Signed"
                  description="Signer label"
                />
              </span>
              <span className="text-text-300 text-sm font-medium">
                {signer}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-5">
        <CalendarIcon className="text-text-300 w-4 h-4 stroke-1" />
        <span className="text-text-300 text-xs font-normal">
          {localAndDate}
        </span>
      </div>
    </div>
  );
}
