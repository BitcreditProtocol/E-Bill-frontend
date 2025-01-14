import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { CheckCircleIcon, ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

function Separators() {
  return (
    <div className="flex flex-col gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Separator key={index} className="bg-divider-300" />
      ))}
    </div>
  );
}

function BillProperty({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start px-5">
      <span className="flex-1 text-text-200 text-xs font-normal pt-0.5">
        {label}
      </span>
      <span className="flex-1 text-text-300 text-sm font-medium text-right">
        {value}
      </span>
    </div>
  );
}

function TopBar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full">
      <button
        className="flex justify-center items-center h-8 w-8 bg-elevation-200 border-[1px] border-divider-50 rounded-full"
        onClick={() => {
          navigate("/draw-bill");
        }}
      >
        <ChevronLeftIcon className="h-5 w-5 text-text-300" strokeWidth={1} />
      </button>

      <h1 className="flex-1 flex justify-center text-text-300 text-base font-medium leading-6 mr-8">
        <FormattedMessage
          id="Preview bill"
          defaultMessage="Preview bill"
          description="Preview bill title"
        />
      </h1>
    </div>
  );
}

export default function Preview() {
  const navigate = useNavigate();

  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <TopBar />

      <div className="flex-1 flex flex-col gap-6 w-full">
        <div className="flex flex-col border-[1px] border-divider-50 rounded-[16px]">
          <span className="py-3 px-5 text-text-300 text-sm font-medium">
            Stockholm, SE, 03-Nov-2024
          </span>

          <div className="flex flex-col gap-3 py-6 px-5 bg-elevation-200 rounded-b-[16px]">
            <div className="flex flex-col gap-1">
              <h2 className="text-text-300 text-base font-medium">
                <FormattedMessage
                  id="pages.bill.preview.heading"
                  defaultMessage="Against this bill of exchange"
                  description="Heading for bill preview page"
                />
              </h2>
            </div>

            <Separators />

            <div className="flex flex-col gap-3 py-3 bg-elevation-50 border-[1px] border-divider-75 rounded-t-[12px] rounded-b-[16px]">
              <BillProperty label="pay on" value="03-Nov-2024" />
              <Separator />
              <BillProperty label="to the order of" value="Apple, Inc" />
              <Separator />
              <BillProperty label="the sum of" value="12.32211 BTC" />
              <Separator />
              <BillProperty label="payer" value="Google, Inc" />
              <Separator />
              <BillProperty label="place of payment" value="AT, Vienna" />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-text-300 text-sm font-medium">
                <FormattedMessage
                  id="pages.bill.preview.noProtest"
                  defaultMessage="No protest. Value received."
                  description="No protest copy for bill preview page"
                />
              </span>

              <Separators />

              <div className="flex flex-col gap-1.5">
                <span className="text-text-200 text-xs font-normal">
                  <FormattedMessage
                    id="pages.bill.preview.invoice"
                    defaultMessage="Invoice"
                    description="Invoice copy for bill preview page"
                  />
                </span>

                <div className="flex h-12 w-full p-3 bg-elevation-50 border-[1px] border-divider-75 rounded-lg">
                  <div className="flex gap-1">
                    <span className="text-sm font-medium text-text-300">
                      Invoice.pdf
                    </span>

                    <div className="flex items-center gap-1">
                      <span className="text-xs text-[#1B0F0080]">200 KB</span>
                      <CheckCircleIcon color="#006F29" width={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-2">
          <Checkbox id="terms_and_conditions" checked={hasAgreedToTerms} />
          <span
            className="text-text-300 text-sm"
            onClick={() => {
              setHasAgreedToTerms(!hasAgreedToTerms);
            }}
          >
            <FormattedMessage
              id="pages.onboarding.confirmIdentity.agreeToTerms"
              defaultMessage="I agree to the Terms and conditions"
              description="Agree to terms and conditions checkbox label"
            />
          </span>
        </div>

        <Button
          className="w-full"
          size="sm"
          disabled={!hasAgreedToTerms}
          onClick={() => {
            navigate("/bill-success");
          }}
        >
          <FormattedMessage
            id="Sign"
            defaultMessage="Sign"
            description="Sign button"
          />
        </Button>
      </div>
    </div>
  );
}
