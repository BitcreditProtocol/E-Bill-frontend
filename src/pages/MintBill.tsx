import { FormattedMessage } from "react-intl";
import { CalculatorIcon, ChevronLeftIcon, ReceiptTextIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import crbtcIcon from "@/assets/crbtc-icon.svg";

export default function MintBill() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5">
      <div className="flex justify-between items-center w-full">
        <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
          <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
        </button>

        <span className="text-text-300 text-base font-medium">
          <FormattedMessage
            id="Mint a bill"
            defaultMessage="Mint a bill"
            description="Header copy for Mint bill page"
          />
        </span>

        <button className="flex items-center gap-2 p-1.5 w-8 h-8 bg-elevation-200 border-[1px] border-divider-50 rounded-[6px]">
          <ReceiptTextIcon width={20} strokeWidth={1} color="#1B0F00" />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end p-4 bg-elevation-200 border-[1px] border-divider-50 rounded-[8px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-medium text-text-300 leading-6">
              Hayek Ltd.
            </span>
            <span className="text-xs text-text-200 leading-4">12-Nov-24</span>
          </div>

          <div className="flex gap-1 items-baseline h-5">
            <span className="text-sm text-signal-success leading-5">
              +12.49002
            </span>
            <span className="text-[10px] text-text-200 leading-3">USD</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-text-300 text-sm font-medium">
            <FormattedMessage
              id="Endorse to the order of"
              defaultMessage="Endorse to the order of"
              description="Label for bill endorsee name input"
            />
          </span>
          <Input id="endorsee" label="Endorsee" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="Against the sum of"
                defaultMessage="Against the sum of"
                description="Label for bill value input"
              />
            </span>

            <Button
              variant="link"
              className="gap-1 text-text-300 text-xs font-medium p-0 h-fit"
            >
              <CalculatorIcon width={16} strokeWidth={1} color="#1B0F00" />
              <FormattedMessage
                id="Calculate discount"
                defaultMessage="Calculate discount"
                description="Calculate discount button"
              />
            </Button>
          </div>

          <div className="flex justify-between items-end p-4 bg-elevation-200 border-[1px] border-divider-50 rounded-[8px]">
            <div className="flex gap-1 items-center">
              <img src={crbtcIcon} alt="CRBTC" className="w-5 h-5" />
              <span className="text-xs font-medium text-text-300 leading-6">
                CRBTC
              </span>
            </div>

            <div className="flex gap-1 items-baseline h-5">
              <span className="text-sm text-signal-success leading-5">
                +12.33882
              </span>
              <span className="text-[10px] text-text-200 leading-3">USD</span>
            </div>
          </div>
        </div>
      </div>

      <Button className="h-[54px] w-full bg-text-300 text-white font-medium rounded-[8px] py-[18px] px-8">
        <FormattedMessage
          id="Mint"
          defaultMessage="Mint"
          description="Button to trigger bill mint"
        />
      </Button>
    </div>
  );
}
