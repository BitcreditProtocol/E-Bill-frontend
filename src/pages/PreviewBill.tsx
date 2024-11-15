import { FormattedMessage } from "react-intl";
import { CheckCircleIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

export default function PreviewBill() {
  return (
    <div className="flex flex-col gap-5 w-full min-h-fit h-screen py-4 px-5">
      <div className="w-full">
        <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
          <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
        </button>
      </div>

      <div className="flex flex-col gap-2 items-center mt-1">
        <h1 className="font-sans font-medium text-2xl tracking-tight mb-0">
          <FormattedMessage
            id="pages.issueBill.title"
            defaultMessage="Issue a bill"
            description="Header copy for Issue bill page"
          />
        </h1>
        <span className="font-normal text-text-200 text-base text-center px-0.5 leading-6">
          <FormattedMessage
            id="pages.issueBill.subtitle"
            defaultMessage="Issue a promissory note where you, the drawer, commit to making the payment"
            description="Subheader copy for Issue bill page"
          />
        </span>
      </div>

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
            <BillProperty label="Pay on" value="03-Nov-2024" />
            <Separator />
            <BillProperty label="To the order of" value="Ashwin Merle" />
            <Separator />
            <BillProperty label="The sum of" value="0.10000000" />
            <Separator />
            <BillProperty
              label="Payer"
              value="Danube Water Shipping and Transport Aktiengesellschaft"
            />
            <Separator />
            <BillProperty label="Place of payment" value="AT, Vienna" />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="pages.bill.preview.noProtest"
                defaultMessage="No protest"
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

              <div className="flex h-12 w-full p-3 bg-elevation-50 border-[1px] border-divider-75 rounded-[12px]">
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

      <div className="flex flex-col gap-3">
        <Button className="w-full bg-text-300 text-white font-medium rounded-[8px] py-3 px-6">
          <FormattedMessage
            id="pages.bill.issue.sign"
            defaultMessage="Sign"
            description="Action to sign and create the bill"
          />
        </Button>
      </div>
    </div>
  );
}
