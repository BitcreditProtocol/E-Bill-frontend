import { FormattedMessage } from "react-intl";
import {
  FileCheckIcon,
  FileInputIcon,
  ReceiptRussianRubleIcon,
} from "lucide-react";

type BillTypeButton = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function BillTypeButton({ icon, title, description }: BillTypeButton) {
  return (
    <button className="flex items-center gap-2 py-4 px-5 bg-elevation-200 border-[1px] border-divider-50 rounded-[12px]">
      <div className="flex justify-center items-center p-2 w-9 h-9 bg-elevation-50 border-[1px] border-divider-50 rounded-full">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 items-start">
        <span className="text-base text-text-300 font-medium">{title}</span>
        <span className="text-sm text-text-200">{description}</span>
      </div>
    </button>
  );
}

export default function IssueBill() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5">
      <div className="flex flex-col gap-2 items-center">
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

      <div className="flex flex-col gap-4">
        <BillTypeButton
          icon={<FileInputIcon color="#1B0F00" width={20} strokeWidth={1} />}
          title="Promissory note"
          description="Issue a promissory note where you"
        />
        <BillTypeButton
          icon={
            <ReceiptRussianRubleIcon
              color="#1B0F00"
              width={20}
              strokeWidth={1}
            />
          }
          title="Three parties"
          description="Issue a promissory note where you"
        />
        <BillTypeButton
          icon={<FileCheckIcon color="#1B0F00" width={20} strokeWidth={1} />}
          title="Draw on payer"
          description="Issue a promissory note where you"
        />
      </div>
    </div>
  );
}
