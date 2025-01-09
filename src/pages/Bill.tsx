import { ChevronLeftIcon, PaperclipIcon, PrinterIcon } from "lucide-react";
import Card from "@/components/Bill/Card";

export default function Bill() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5">
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
    </div>
  );
}
