import { FormattedMessage } from "react-intl";
import { DollarSignIcon, EuroIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import BitcoinCurrencyIcon from "@/assets/icons/bitcoin-currency.svg";
import { PropsWithChildren, useState } from "react";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-text-300 text-base font-medium leading-6">
      {children}
    </span>
  );
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-text-200 text-sm font-normal leading-5">
      {children}
    </span>
  );
}

type CurrencySelectorProps = PropsWithChildren<{
  value: string;
  onChange: (value: string) => void;
}>;

export default function CurrencySelector({
  children,
  onChange,
}: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);

  const _onChange = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>

      <DrawerContent className="max-w-[375px] py-4 px-5 bg-elevation-50 mx-auto">
        <div className="flex flex-col gap-3">
          <span className="text-text-300 text-lg font-medium leading-[28px]">
            <FormattedMessage
              id="settings.displayCurrency.title"
              defaultMessage="Display currency"
              description="Display currency title"
            />
          </span>

          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => {
                _onChange("USD");
              }}
            >
              <div className="flex items-center justify-center h-8 w-8 p-2 bg-[#118200] rounded-full">
                <DollarSignIcon className="text-white h-4 w-4 stroke-1" />
              </div>

              <div className="flex flex-col gap-0.5">
                <Label>US Dollar</Label>
                <Description>USD</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />

            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => {
                _onChange("EUR");
              }}
            >
              <div className="flex items-center justify-center h-8 w-8 p-2 bg-[#003398] rounded-full">
                <EuroIcon className="text-white h-4 w-4 stroke-1" />
              </div>

              <div className="flex flex-col gap-0.5">
                <Label>Euro</Label>
                <Description>EUR</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />

            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => {
                _onChange("BTC");
              }}
            >
              <div className="flex items-center justify-center rounded-full">
                <img
                  src={BitcoinCurrencyIcon}
                  alt="Bitcoin"
                  className="h-8 w-8"
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <Label>Bitcoin</Label>
                <Description>BTC</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />

            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => {
                _onChange("sat");
              }}
            >
              <div className="flex items-center justify-center rounded-full">
                <img
                  src={BitcoinCurrencyIcon}
                  alt="Bitcoin"
                  className="h-8 w-8"
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <Label>Bitcoin</Label>
                <Description>sat</Description>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
