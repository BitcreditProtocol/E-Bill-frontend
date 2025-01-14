import { FormattedMessage } from "react-intl";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

function TopBar() {
  return (
    <div className="flex items-center justify-between w-full mb-16">
      <button className="flex justify-center items-center h-8 w-8 bg-elevation-200 border-[1px] border-divider-50 rounded-full">
        <ChevronLeftIcon className="h-5 w-5 text-text-300" strokeWidth={1} />
      </button>

      <h1 className="flex-1 flex justify-center text-text-300 text-base font-medium leading-6 mr-8">
        <FormattedMessage
          id="New bill"
          defaultMessage="New bill"
          description="New bill title"
        />
      </h1>
    </div>
  );
}

export default function Category() {
  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <TopBar />

      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex items-center justify-between w-full bg-elevation-200 py-4 px-5 border-[1px] border-divider-50 rounded-xl cursor-pointer">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center w-8 h-8 py-1.5 px-2.5 bg-elevation-50 border-[1px] border-divider-50 rounded-full">
              {">|>"}
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-text-300 text-base font-medium">
                Three party
              </span>
              <span className="text-text-200 text-xs">
                Drawee pays to payee
              </span>
            </div>
          </div>

          <ChevronRightIcon className="w-6 h-6 text-text-300" strokeWidth={1} />
        </div>

        <div className="flex items-center justify-between w-full bg-elevation-200 py-4 px-5 border-[1px] border-divider-50 rounded-xl cursor-pointer">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center w-8 h-8 py-1.5 px-2.5 bg-elevation-50 border-[1px] border-divider-50 rounded-full">
              {">|"}
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-text-300 text-base font-medium">
                Self drafted
              </span>
              <span className="text-text-200 text-xs">Drawee pays to me</span>
            </div>
          </div>

          <ChevronRightIcon className="w-6 h-6 text-text-300" strokeWidth={1} />
        </div>

        <div className="flex items-center justify-between w-full bg-elevation-200 py-4 px-5 border-[1px] border-divider-50 rounded-xl cursor-pointer">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center w-8 h-8 py-1.5 px-2.5 bg-elevation-50 border-[1px] border-divider-50 rounded-full">
              {">|"}
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-text-300 text-base font-medium">
                Promissory note
              </span>
              <span className="text-text-200 text-xs">I pay to payee</span>
            </div>
          </div>

          <ChevronRightIcon className="w-6 h-6 text-text-300" strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}
