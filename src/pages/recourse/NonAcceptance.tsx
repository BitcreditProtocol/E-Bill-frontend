import { useState } from "react";
import { FormattedMessage } from "react-intl";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import Preview from "@/components/Bill/Preview";
import { RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Label from "@/components/typography/Label";
import { Button } from "@/components/ui/button";
import BitcoinCurrencyIcon from "@/assets/icons/bitcoin-currency.svg";
import Holder from "./components/Holder";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import IdentityAvatar from "@/components/IdentityAvatar";
import Sign from "./components/Sign";

function RequestRecourse({
  holders,
  selectedHolder,
  setSelectedHolder,
}: {
  holders: { name: string; terms: string }[];
  selectedHolder: number | null;
  setSelectedHolder: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Label className="text-base">
          <FormattedMessage
            id="bill.recourse.nonAcceptance.priorHolders"
            defaultMessage="Prior holders"
            description="Non acceptance recourse prior holders label"
          />
        </Label>
        <span className="text-text-200 text-sm font-normal leading-6">
          <FormattedMessage
            id="bill.recourse.nonAcceptance.priorHolders.description"
            defaultMessage="Select a prior holder for recourse"
            description="Non acceptance recourse prior holders description"
          />
        </span>
      </div>
      <RadioGroup className="gap-3">
        {holders.map((holder, index) => (
          <>
            <Holder
              key={index}
              name={holder.name}
              terms={holder.terms}
              checked={selectedHolder === index}
              onClick={() => {
                setSelectedHolder(index);
              }}
            />

            {index < holders.length - 1 && (
              <Separator className="bg-divider-75" />
            )}
          </>
        ))}
      </RadioGroup>
    </div>
  );
}

function Review({
  selectedHolder,
}: {
  selectedHolder: { name: string; address: string };
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 py-4 px-3 bg-elevation-200 border border-divider-50 rounded-lg">
        <IdentityAvatar
          name={selectedHolder.name}
          picture=""
          identityType="company"
          size="md"
        />

        <div className="flex flex-col">
          <Label>{selectedHolder.name}</Label>
          <span className="text-text-200 text-xs font-normal leading-normal">
            {selectedHolder.address}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-text-300 text-sm font-medium leading-5">
          <FormattedMessage
            id="bill.recourse.nonAcceptance.sum"
            defaultMessage="Request the sum of"
            description="Request the sum of label"
          />
        </span>

        <div className="flex items-center gap-2 py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
          <img
            src={BitcoinCurrencyIcon}
            alt="Bitcoin currency icon"
            className="h-5 w-5"
          />

          <span className="text-text-300 text-sm font-medium leading-5">
            BTC
          </span>

          <div className="flex items-center gap-1 ml-auto">
            <FormattedCurrency
              value={12.49002}
              type="credit"
              signDisplay="never"
            />
            <span className="text-text-200 text-[10px] font-normal leading-[14px]">
              BTC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// remove when integrated with the API
const holders = [
  {
    name: "Nvidia, Inc",
    terms: "San Francisco, 1 Nov 2024",
    address: "One Apple Park Way, Cupertino, CA",
  },
  {
    name: "Tesla, Inc",
    terms: "San Francisco, 3 Nov 2024",
    address: "One Apple Park Way, Cupertino, CA",
  },
  {
    name: "Hayek Ltd",
    terms: "San Francisco, 5 Nov 2024",
    address: "One Apple Park Way, Cupertino, CA",
  },
  {
    name: "Vienna Ltd",
    terms: "San Francisco, 11 Nov 2024",
    address: "One Apple Park Way, Cupertino, CA",
  },
];

export default function NonAcceptance() {
  const [selectedHolder, setSelectedHolder] = useState<null | number>(null);
  const [currentStep, setCurrentStep] = useState<"select_holder" | "review">(
    "select_holder"
  );

  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle className="text-signal-error">
            <FormattedMessage
              id="bill.recourse.nonAcceptance.title"
              defaultMessage="Request recourse"
              description="Non acceptance recourse page title"
            />
          </PageTitle>
        }
      />

      <Preview
        company="Danube Water Shipping"
        date="12-Nov-24"
        amount={12.491}
      />

      {currentStep === "select_holder" && (
        <RequestRecourse
          holders={holders}
          selectedHolder={selectedHolder}
          setSelectedHolder={setSelectedHolder}
        />
      )}

      {currentStep === "review" && selectedHolder !== null && (
        <Review selectedHolder={holders[selectedHolder]} />
      )}

      <div className="w-full mt-auto">
        {currentStep === "select_holder" && (
          <Button
            className="w-full"
            size="md"
            onClick={() => {
              setCurrentStep("review");
            }}
            disabled={selectedHolder === null}
          >
            <FormattedMessage
              id="bill.recourse.nonAcceptance.select"
              defaultMessage="Select"
              description="Non acceptance request select button"
            />
          </Button>
        )}
        {currentStep === "review" && <Sign />}
      </div>
    </Page>
  );
}
