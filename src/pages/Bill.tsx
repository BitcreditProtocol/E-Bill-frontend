import { FormattedMessage } from "react-intl";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  MoveRightIcon,
  PaperclipIcon,
  PrinterIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

export default function Bill() {
  return (
    <div className="flex flex-col justify-between gap-6 w-full min-h-fit h-screen py-4 px-5">
      <div className="flex justify-between">
        <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
          <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
        </button>

        <div className="flex gap-2">
          <button className="flex justify-center items-center w-8 h-8 bg-elevation-200 border-[1px] border-divider-50 rounded-[6px]">
            <PaperclipIcon size={20} color="#1B0F00" strokeWidth={1} />
          </button>
          <button className="flex justify-center items-center w-8 h-8 bg-elevation-200 border-[1px] border-divider-50 rounded-[6px]">
            <PrinterIcon size={20} color="#1B0F00" strokeWidth={1} />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-text-200 text-sm font-medium">
            Stockholm, SE, 03-Nov-2024
          </span>
          <h2 className="text-text-300 text-xl font-medium">
            <FormattedMessage
              id="Against this bill of exchange"
              defaultMessage="Against this bill of exchange"
              description="Heading for bill visualization page"
            />
          </h2>
        </div>

        <div className="flex flex-col gap-3 pt-3 border-[1px] border-divider-75 rounded-t-[12px] rounded-b-[16px]">
          <BillProperty label="Pay on" value="03-Nov-2024" />
          <Separator />
          <BillProperty label="To the order of" value="Ashwin Merle" />
          <Separator />
          <BillProperty label="The sum of" value="03-Nov-2024" />
          <Separator />
          <BillProperty
            label="Payer"
            value="Danube Water Shipping and Transport Aktiengesellschaft"
          />
          <Separator />
          <BillProperty label="Place of payment" value="AT, Vienna" />
          <Separator />
          <BillProperty label="Drawer" value="Bitcredit Austria" />
          <button className="flex items-center justify-between bg-elevation-200 py-3 px-5 border-t-[1px] border-t-divider-75 rounded-b-[16px]">
            <div className="flex gap-1 items-center">
              <span className="text-xs font-normal">Endorsements</span>
              <span className="text-[10px] font-medium">(12)</span>
            </div>
            <MoveRightIcon size={20} color="#1B0F00" strokeWidth={1} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button className="w-full bg-text-300 text-white font-medium rounded-[8px] py-3 px-6">
          <FormattedMessage
            id="Request to accept"
            defaultMessage="Request to accept"
            description="Action to request to accept the bill"
          />
        </Button>
        <Button
          className="gap-2.5 w-full text-text-300 bg-transparent font-medium border-text-300 rounded-[8px] py-3 px-6 hover:bg-transparent"
          variant="outline"
        >
          <FormattedMessage
            id="Endorse"
            defaultMessage="Endorse"
            description="Action to endorse the bill"
          />
          <ChevronDownIcon size={20} color="#1B0F00" strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
}
