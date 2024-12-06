import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  CalculatorIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Upload from "@/components/ui/upload";
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

export default function Draw() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <TopBar />

      <div className="flex-1 flex flex-col w-full">
        <div className="flex items-center justify-between mb-5">
          <span className="text-text-300 text-sm font-normal leading-5">
            Stockholm, SE, 03-Nov-2024
          </span>

          <button
            className="flex gap-1 items-center text-brand-200 text-xs font-medium p-0"
            onClick={() => {
              navigate("/edit-issue");
            }}
          >
            Edit
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
            <span className="text-text-300 text-sm font-normal">pay on</span>

            <div className="flex items-center justify-between w-full bg-elevation-200 py-5 px-4 border-[1px] border-divider-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <CalendarIcon
                  className="w-5 h-5 text-text-300"
                  strokeWidth={1}
                />

                <span className="text-text-300 text-sm font-medium">Date</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-normal">
              to the order of
            </span>

            <div className="flex items-center justify-between w-full bg-elevation-200 py-5 px-4 border-[1px] border-divider-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-text-300" strokeWidth={1} />

                <span className="text-text-300 text-sm font-medium">Payee</span>
              </div>

              <ChevronRightIcon
                className="w-5 h-5 text-text-300"
                strokeWidth={1}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-text-300 text-sm font-normal">
                the sum of
              </span>

              <Button
                variant="link"
                className="gap-1 text-text-300 text-xs font-medium p-0 h-fit"
              >
                <CalculatorIcon
                  className="w-4 h-4 text-text-300"
                  strokeWidth={1}
                />
                <FormattedMessage
                  id="pages.mintBill.billInformation.calculateDiscount"
                  defaultMessage="Calculate discount"
                  description="Calculate discount button"
                />
              </Button>
            </div>

            <div className="flex items-center justify-between w-full bg-elevation-200 py-5 px-4 border-[1px] border-divider-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <img className="w-5 h-5" src={bitcoinIcon} />

                <span className="text-text-300 text-sm font-medium">BTC</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-normal">Payer</span>

            <div className="flex items-center justify-between w-full bg-elevation-200 py-5 px-4 border-[1px] border-divider-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-text-300" strokeWidth={1} />

                <span className="text-text-300 text-sm font-medium">Payer</span>
              </div>

              <ChevronRightIcon
                className="w-5 h-5 text-text-300"
                strokeWidth={1}
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <span className="text-text-200 text-xs font-normal leading-5">
              Place of payment
            </span>

            <button
              className="flex gap-1 items-center text-brand-200 text-xs font-medium p-0"
              onClick={() => {
                navigate("/place-of-payment");
              }}
            >
              Edit
              <PencilIcon className="w-3 h-3 text-brand-200" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-normal">
              No protest.
            </span>
            <Upload />
          </div>
        </div>
      </div>

      <Button
        size="md"
        className="w-full"
        onClick={() => {
          navigate("/draw-bill-filled");
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
