import { FormattedMessage, useIntl } from "react-intl";
import { BanknoteIcon, DollarSignIcon, EuroIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import BitcoinCurrencyIcon from "@/assets/icons/bitcoin-currency.svg";

import MenuOption from "./MenuOption";
import { Description, Label } from "./Typography";

export default function DisplayCurrency() {
  const intl = useIntl();

  return (
    <Drawer>
      <DrawerTrigger>
        <MenuOption
          icon={<BanknoteIcon className="text-text-300 h-6 w-6 stroke-1" />}
          label={intl.formatMessage({
            id: "settings.displayCurrency",
            defaultMessage: "Display currency",
          })}
          defaultValue="USD"
        />
      </DrawerTrigger>

      <DrawerContent className="bg-elevation-50 py-4 px-5">
        <div className="flex flex-col gap-3">
          <span className="text-text-300 text-lg font-medium leading-[28px]">
            <FormattedMessage
              id="settings.displayCurrency.title"
              defaultMessage="Display currency"
              description="Display currency title"
            />
          </span>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-8 w-8 p-2 bg-[#118200] rounded-full">
                <DollarSignIcon className="text-white h-4 w-4 stroke-1" />
              </div>

              <div className="flex flex-col gap-0.5">
                <Label>US Dollar</Label>
                <Description>USD</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-8 w-8 p-2 bg-[#003398] rounded-full">
                <EuroIcon className="text-white h-4 w-4 stroke-1" />
              </div>

              <div className="flex flex-col gap-0.5">
                <Label>Euro</Label>
                <Description>EUR</Description>
              </div>
            </div>
            <Separator className="bg-divider-75" />

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center  rounded-full">
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

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center  rounded-full">
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
