import { FormattedMessage } from "react-intl";
import { ChevronDownIcon } from "lucide-react";

import Card from "@/components/Bill/Card";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";

export default function Bill() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5">
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
        <Button className="w-full" variant="outline">
          <FormattedMessage
            id="bill.actions.actionsList"
            defaultMessage="Endorse"
            description="Actions list trigger button"
          />

          <ChevronDownIcon className="text-text-300 w-5 h-5 stroke-1" />
        </Button>
      </div>
    </div>
  );
}
