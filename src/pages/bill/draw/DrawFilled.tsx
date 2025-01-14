import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  CalculatorIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  PencilIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import bitcoinIcon from "@/assets/bitcoin-icon.svg";

function TopBar() {
  return (
    <div className="flex items-center justify-between w-full">
      <button className="flex justify-center items-center h-8 w-8 bg-elevation-200 border-[1px] border-divider-50 rounded-full">
        <ChevronLeftIcon className="h-5 w-5 text-text-300" strokeWidth={1} />
      </button>

      <h1 className="flex-1 flex justify-center text-text-300 text-base font-medium leading-6 mr-8">
        <FormattedMessage
          id="Draw bill"
          defaultMessage="Draw bill"
          description="Draw bill title"
        />
      </h1>
    </div>
  );
}

export default function DrawFilled() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <TopBar />

      <div className="flex-1 flex flex-col w-full">
        <div className="flex items-center justify-between mb-5">
          <span className="text-text-300 text-sm font-normal leading-5">
            Stockholm, SE, 03-Nov-2024
          </span>

          <button className="flex gap-1 items-center text-brand-200 text-xs font-medium p-0">
            <FormattedMessage
              id="bill.draw.edit"
              defaultMessage="Edit"
              description="Edit button"
            />
            <PencilIcon className="w-3 h-3 text-brand-200" />
          </button>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-text-300 text-xl font-medium leading-[30px]">
            <FormattedMessage
              id="Against this bill of exchange"
              defaultMessage="Against this bill of exchange"
              description="Draw a bill title"
            />
          </h1>

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-normal">
              <FormattedMessage
                id="bill.draw.payOn"
                defaultMessage="pay on"
                description="Payment date label"
              />
            </span>

            <div className="flex items-center justify-between w-full bg-elevation-200 py-5 px-4 border-[1px] border-divider-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <CalendarIcon
                  className="w-5 h-5 text-text-300"
                  strokeWidth={1}
                />

                <span className="text-text-300 text-sm font-medium">
                  03-Nov-2024
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-normal">
              <FormattedMessage
                id="bill.draw.toTheOrderOf"
                defaultMessage="to the sum of"
                description="Order of property label"
              />
            </span>

            <div className="flex items-center justify-between w-full bg-elevation-200 py-5 px-4 border-[1px] border-divider-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 py-1.5 px-2.5 bg-brand-50 text-brand-200 rounded-full">
                  A
                </div>

                <div className="flex flex-col">
                  <span className="text-text-300 text-base font-medium">
                    Apple, Inc
                  </span>
                  <span className="text-text-200 text-xs">
                    One Apple Park Way, Cupertino, CA
                  </span>
                </div>
              </div>
              <PencilIcon className="w-4 h-4 text-text-300" strokeWidth={1} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-text-300 text-sm font-normal">
                <FormattedMessage
                  id="bill.draw.sum"
                  defaultMessage="the sum of"
                  description="Value property label"
                />
              </span>

              <Button
                variant="link"
                className="gap-1 text-text-300 text-xs font-medium p-0 h-fit"
              >
                <CalculatorIcon
                  className="w-4 h-4 text-text-300"
                  strokeWidth={1}
                />
                90 @ 4.125%
              </Button>
            </div>

            <div className="flex items-center justify-between w-full bg-elevation-200 py-5 px-4 border-[1px] border-divider-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <img className="w-5 h-5" src={bitcoinIcon} />

                <span className="text-text-300 text-sm font-medium">BTC</span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-signal-error text-sm font-medium">
                  -12.49029
                </span>
                <span className="text-text-200 text-xs">BTC</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-normal">
              <FormattedMessage
                id="bill.draw.payer"
                defaultMessage="Payer"
                description="Payer label"
              />
            </span>

            <div className="flex items-center justify-between w-full bg-elevation-200 py-5 px-4 border-[1px] border-divider-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 py-1.5 px-2.5 bg-brand-50 text-brand-200 rounded-full">
                  G
                </div>

                <div className="flex flex-col">
                  <span className="text-text-300 text-base font-medium">
                    Google, Inc
                  </span>
                  <span className="text-text-200 text-xs">
                    165 University Avenue in Palo Alto, CA
                  </span>
                </div>
              </div>
              <PencilIcon className="w-4 h-4 text-text-300" strokeWidth={1} />
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2">
              <span className="text-text-200 text-xs font-normal leading-5">
                <FormattedMessage
                  id="bill.draw.placeOfPayment"
                  defaultMessage="Place of payment"
                  description="Place of payment"
                />
              </span>

              <span className="text-text-300 text-sm font-normal">
                Vienna, AT
              </span>
            </div>

            <button className="flex gap-1 items-center text-brand-200 text-xs font-medium p-0">
              <FormattedMessage
                id="bill.draw.edit"
                defaultMessage="Edit"
                description="Edit button"
              />
              <PencilIcon className="w-3 h-3 text-brand-200" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-normal">
              <FormattedMessage
                id="bill.draw.noProtest"
                defaultMessage="No protest. Value received."
                description="No protest bill"
              />
            </span>

            <div className="flex items-center h-12 w-full p-4 bg-elevation-200 border-[1px] border-divider-50 rounded-lg">
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

      <Button
        size="md"
        className="w-full"
        onClick={() => {
          navigate("/preview-bill");
        }}
      >
        <FormattedMessage
          id="Preview"
          defaultMessage="Preview"
          description="Preview bill button"
        />
      </Button>
    </div>
  );
}
