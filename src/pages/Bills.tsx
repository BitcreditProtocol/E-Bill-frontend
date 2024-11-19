import { FormattedMessage, FormattedNumber } from "react-intl";
import { CalendarDaysIcon, ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import createBillIllustration from "@/assets/create-bill-illustration.svg";

export function Bills() {
  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-12 px-6 w-full">
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 justify-between items-center">
          <h2 className="text-xl font-medium text-text-300">
            <FormattedMessage
              id="pages.bills.title"
              defaultMessage="Bills"
              description="Title for Bills page"
            />
          </h2>

          <Button variant="link" className="gap-1 text-xs text-text-300 px-0">
            <CalendarDaysIcon size={16} strokeWidth={1} color="#1B0F00" />

            <FormattedMessage
              id="pages.bills.selectDates"
              defaultMessage="Select dates"
              description="Button to filter bills by date range"
            />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center h-[46px] border-[1px] border-divider-75 rounded-[8px] px-4">
            <SearchIcon size={16} strokeWidth={1} color="#1B0F00" />
            <input
              type="text"
              placeholder="Search for bills..."
              className="w-full bg-transparent text-sm font-medium text-text-300 outline-none"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="filter">
              <FormattedMessage
                id="pages.bills.all"
                defaultMessage="All"
                description="Filter to view All bills"
              />
            </Button>
            <Button variant="filter">
              <FormattedMessage
                id="pages.bills.payee"
                defaultMessage="Payee"
                description="Filter to view Payee bills"
              />
            </Button>
            <Button variant="filter">
              <FormattedMessage
                id="pages.bills.payer"
                defaultMessage="Payer"
                description="Filter to view Payer bills"
              />
            </Button>
            <Button variant="filter">
              <FormattedMessage
                id="pages.bills.contingent"
                defaultMessage="Contingent"
                description="Filter to view Contingent bills"
              />
            </Button>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium text-text-300">Today</h3>
              <Button
                variant="link"
                className="gap-1 text-xs text-text-300 h-fit p-0"
              >
                <ChevronsUpDownIcon size={16} strokeWidth={1} color="#1B0F00" />

                <FormattedMessage
                  id="pages.bills.orderByMaturity"
                  defaultMessage="Maturity"
                  description="Button to order bills by maturity date"
                />
              </Button>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex flex-col p-4 gap-0.5 bg-elevation-200 border-[1px] border-divider-50 rounded-[8px]">
                <span className="text-base font-medium text-text-300">
                  Hayek Ltd.
                </span>

                <div className="flex justify-between">
                  <span className="text-sm text-text-200">12-Nov-24</span>
                  <div className="flex gap-1 items-baseline">
                    <span className="text-sm text-signal-success">
                      <FormattedNumber value={12.49002} signDisplay="always" minimumFractionDigits={2} maximumFractionDigits={8} />
                    </span>
                    <span className="text-xs text-text-300">USD</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-4 gap-0.5 bg-elevation-200 border-[1px] border-divider-50 rounded-[8px]">
                <span className="text-base font-medium text-text-300">
                  Hayek Ltd.
                </span>

                <div className="flex justify-between">
                  <span className="text-sm text-text-200">12-Nov-24</span>
                  <div className="flex gap-1 items-baseline">
                    <span className="text-sm text-signal-success">
                      <FormattedNumber value={3234.12001} signDisplay="always" minimumFractionDigits={2} maximumFractionDigits={8} />
                    </span>
                    <span className="text-xs text-text-300">USD</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-4 gap-0.5 bg-elevation-200 border-[1px] border-divider-50 rounded-[8px]">
                <span className="text-base font-medium text-text-300">
                  Zeusix web en design
                </span>

                <div className="flex justify-between">
                  <span className="text-sm text-text-200">10-Nov-24</span>
                  <div className="flex gap-1 items-baseline">
                    <span className="text-sm text-signal-error">
                      <FormattedNumber value={-2.49002} signDisplay="always" minimumFractionDigits={2} maximumFractionDigits={8} />
                    </span>
                    <span className="text-xs text-text-300">USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BillsEmpty() {
  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-12 px-6 w-full">
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 justify-between items-center">
          <h2 className="text-xl font-medium text-text-300">
            <FormattedMessage
              id="pages.bills.title"
              defaultMessage="Bills"
              description="Title for Bills page"
            />
          </h2>

          <Button variant="link" className="gap-1 text-xs text-text-300 px-0">
            <CalendarDaysIcon size={16} strokeWidth={1} color="#1B0F00" />

            <FormattedMessage
              id="pages.bills.selectDates"
              defaultMessage="Select dates"
              description="Button to filter bills by date range"
            />
          </Button>
        </div>

        <div className="flex gap-2 items-center h-[46px] border-[1px] border-divider-75 rounded-[8px] px-4">
          <SearchIcon size={16} strokeWidth={1} color="#1B0F00" />
          <input
            type="text"
            placeholder="Search for bills..."
            className="w-full bg-transparent text-sm font-medium text-text-300 outline-none"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="filter">
            <FormattedMessage
              id="pages.bills.all"
              defaultMessage="All"
              description="Filter to view All bills"
            />
          </Button>
          <Button variant="filter">
            <FormattedMessage
              id="pages.bills.payee"
              defaultMessage="Payee"
              description="Filter to view Payee bills"
            />
          </Button>
          <Button variant="filter">
            <FormattedMessage
              id="pages.bills.payer"
              defaultMessage="Payer"
              description="Filter to view Payer bills"
            />
          </Button>
          <Button variant="filter">
            <FormattedMessage
              id="pages.bills.contingent"
              defaultMessage="Contingent"
              description="Filter to view Contingent bills"
            />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4 px-12">
          <img src={createBillIllustration} className="mb-1" />

          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-medium text-text-300">
              <FormattedMessage
                id="pages.bills.empty"
                defaultMessage="No bills issued yet"
                description="Empty bills list message"
              />
            </h3>

            <span className="text-base text-text-200 text-center">
              <FormattedMessage
                id="pages.bills.startCreating"
                defaultMessage="Start creating a bill and distribute it to your contacts"
                description="Description to start creating a bill"
              />
            </span>
          </div>

          <Button
            className="text-text-300 bg-transparent font-medium border-text-300 rounded-[8px] py-3 px-6 hover:bg-transparent"
            variant="outline"
          >
            <FormattedMessage
              id="pages.bills.issueBill"
              defaultMessage="Issue a bill"
              description="Action to start creating a bill"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
