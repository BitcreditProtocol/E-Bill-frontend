import { FormattedMessage } from "react-intl";
import { LandmarkIcon } from "lucide-react";

import NavigateBack from "@/components/NavigateBack";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/typography/PageTitle";
import SectionTitle from "@/components/typography/SectionTitle";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Preview from "./components/Preview";
import { Button } from "@/components/ui/button";

function Mint({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-10 w-10 bg-elevation-200 p-2.5 border border-divider-50 rounded-full">
          <LandmarkIcon className="text-text-300 h-5 w-5 stroke-1" />
        </div>
        <span className="text-text-300 text-base font-medium">{name}</span>
      </div>

      <Checkbox />
    </div>
  );
}

export default function RequestMint() {
  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-4 px-5 w-full select-none">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.mint.request.title"
              defaultMessage="Request to mint"
              description="Request to mint page title"
            />
          </PageTitle>
        }
        trail={<></>}
      />

      <div className="flex-1 flex flex-col gap-6">
        <Preview
          name="Pear, Inc"
          date="31-Jan-2025"
          amount={1.2311}
          currency="BTC"
        />

        <div className="flex flex-col gap-4">
          <SectionTitle>
            <FormattedMessage
              id="bill.mint.request.selectMint"
              defaultMessage="Select a mint"
              description="Select a mint section title"
            />
          </SectionTitle>

          <div className="flex flex-col gap-3 p-4 border border-divider-75 rounded-xl">
            <Mint name="Wildcat One" />
            <Separator className="bg-divider-75" />
            <Mint name="Fishermans Mint" />
            <Separator className="bg-divider-75" />
            <Mint name="Whalers Mint" />
          </div>
        </div>

        <Button className="mt-auto">
          <FormattedMessage
            id="bill.mint.request.action"
            defaultMessage="Request mint quote"
            description="Request mint quote button"
          />
        </Button>
      </div>
    </div>
  );
}
