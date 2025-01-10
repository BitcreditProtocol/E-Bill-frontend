import { FormattedMessage } from "react-intl";
import {
  BanknoteIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LandmarkIcon,
  SendHorizonalIcon,
} from "lucide-react";

import Card from "@/components/Bill/Card";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

function Actions() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button className="w-full" variant="outline">
          <FormattedMessage
            id="bill.actions.actionsList"
            defaultMessage="Endorse"
            description="Actions list trigger button"
          />

          <ChevronDownIcon className="text-text-300 w-5 h-5 stroke-1" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-elevation-50">
        <div className="p-5">
          <Button className="w-full" variant="outline">
            <FormattedMessage
              id="bill.actions.actionsList"
              defaultMessage="Endorse"
              description="Actions list trigger button"
            />

            <ChevronUpIcon className="text-text-300 w-5 h-5 stroke-1" />
          </Button>
        </div>
        <div className="flex flex-col gap-6 p-5 border-t border-divider-75">
          <button className="flex items-center gap-2 p-0 text-text-300 text-base font-medium">
            <SendHorizonalIcon className="text-text-300 w-5 h-5 stroke-1" />

            <FormattedMessage
              id="bill.actions.endorse"
              defaultMessage="Endorse"
              description="Endorse button"
            />
          </button>

          <button className="flex items-center gap-2 p-0 text-text-300 text-base font-medium">
            <BanknoteIcon className="text-text-300 w-5 h-5 stroke-1" />

            <FormattedMessage
              id="bill.actions.sell"
              defaultMessage="Sell"
              description="Sell button"
            />
          </button>

          <button className="flex items-center gap-2 p-0 text-text-300 text-base font-medium">
            <LandmarkIcon className="text-text-300 w-5 h-5 stroke-1" />

            <FormattedMessage
              id="bill.actions.mint"
              defaultMessage="Mint"
              description="Mint button"
            />
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function Bill() {
  return (
    <div className="flex flex-col gap-6 max-w-[375px] bg-elevation-50 w-full min-h-fit h-screen py-4 px-5 absolute z-10">
      <Topbar lead={<NavigateBack />} />

      <Card
        city_of_issuing="São Paulo"
        country_of_issuing="BR"
        issue_date="08-Jan-2025"
        maturity_date="11-Jan-2025"
        payer="John Doe"
        drawee="Jane Doe"
        drawer="John Jon"
        city_of_payment="São Paulo"
        country_of_payment="BR"
      />

      <div className="flex-1 flex flex-col justify-end gap-3">
        <Button className="w-full">
          <FormattedMessage
            id="bill.actions.requestToAccept"
            defaultMessage="Request to accept"
            description="Request to accept button"
          />
        </Button>
        <Actions />
      </div>
    </div>
  );
}
