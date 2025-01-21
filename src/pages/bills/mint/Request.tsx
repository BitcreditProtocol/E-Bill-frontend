import { FormattedMessage } from "react-intl";
import {
  CheckIcon,
  ChevronRightIcon,
  CircleXIcon,
  LoaderIcon,
} from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import Label from "@/components/typography/Label";
import SectionTitle from "@/components/typography/SectionTitle";

import BillPreview from "../components/BillPreview";
import { Button } from "@/components/ui/button";

function MintRequest() {
  return (
    <div className="flex flex-col gap-2 p-3 bg-elevation-200 border border-divider-75 rounded-xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <LoaderIcon className="text-text-300 h-4 w-4 stroke-1" />
          <Label>
            <FormattedMessage
              id="bill.mint.requestToMint"
              defaultMessage="Request to mint"
              description="Request to mint label"
            />
          </Label>
        </div>

        <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
      </div>

      <BillPreview
        className="bg-elevation-50 border-divider-75"
        company="Pear, Inc"
        date="31-Jan-2025"
        amount={1.2311}
      />
    </div>
  );
}

export default function Request() {
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

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <SectionTitle>Nvidia, Inc</SectionTitle>
            <span className="text-text-200 text-sm font-medium leading-5">
              11001 Lakeline Blvd #100, Austin, Tx
            </span>
          </div>
        </div>

        <MintRequest />
      </div>

      <div className="flex flex-col">
        <div className="flex gap-2">
          <Button className="w-full gap-2" variant="outline" size="md">
            <CircleXIcon className="text-text-300 h-5 w-5 stroke-1" />

            <FormattedMessage
              id="bill.mint.request.reject"
              defaultMessage="Reject"
              description="Reject button label"
            />
          </Button>

          <Button className="w-full gap-2" variant="outline" size="md">
            <CheckIcon className="text-text-300 h-5 w-5 stroke-1" />

            <FormattedMessage
              id="bill.mint.request.quote"
              defaultMessage="Quote"
              description="Quote button label"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
