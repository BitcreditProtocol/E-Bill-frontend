import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { isToday, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import { CalendarDaysIcon, ChevronsUpDownIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/typography/PageTitle";
import { DatePicker } from "@/components/DatePicker/datePicker";
import { Skeleton } from "@/components/ui/skeleton";
import Search from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import RefreshButton from "@/components/RefreshButton";
import { checkBillsInDHT, getBillsLight } from "@/services/bills";
import { cn } from "@/lib/utils";
import routes from "@/constants/routes";
import { Card } from "./components/Card";
import Empty from "./components/Empty";

function DateRangeFilter({ onChange }: { onChange: (e: unknown) => void }) {
  return (
    <DatePicker
      customComponent={
        <button className="flex items-center gap-1 p-0 text-text-300 text-xs font-medium leading-normal">
          <CalendarDaysIcon className="text-text-300 h-4 w-4 stroke-1" />
          <FormattedMessage
            id="bills.list.dateRange"
            defaultMessage="Date range"
            description="Filter by date range button"
          />
        </button>
      }
      mode="range"
      onChange={onChange}
    />
  );
}

function MaturityFilter({ onClick }: { onClick: (e: unknown) => void }) {
  return (
    <button
      className="flex items-center gap-1 p-0 text-text-300 text-xs font-medium leading-normal"
      onClick={onClick}
    >
      <ChevronsUpDownIcon className="text-text-300 h-4 w-4 stroke-1" />
      <FormattedMessage
        id="bills.list.maturity"
        defaultMessage="Maturity"
        description="Filter by maturity button"
      />
    </button>
  );
}

function TypeFilter({
  selectedType,
  onClick,
}: {
  selectedType: string;
  onClick: (e: "all" | "payee" | "payer" | "contingent" | "history") => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        className={cn("!min-w-px", {
          "!font-medium border-text-300": selectedType === "all",
        })}
        variant="filter"
        onClick={() => {
          onClick("all");
        }}
      >
        <FormattedMessage
          id="bills.list.type.all"
          defaultMessage="All"
          description="Filter by all button"
        />
      </Button>

      <Button
        className={cn("!min-w-px", {
          "!font-medium border-text-300": selectedType === "payee",
        })}
        variant="filter"
        onClick={() => {
          onClick("payee");
        }}
      >
        <FormattedMessage
          id="bills.list.type.payee"
          defaultMessage="Payee"
          description="Filter as payee button"
        />
      </Button>

      <Button
        className={cn("!min-w-px", {
          "!font-medium border-text-300": selectedType === "payer",
        })}
        variant="filter"
        onClick={() => {
          onClick("payer");
        }}
      >
        <FormattedMessage
          id="bills.list.type.payer"
          defaultMessage="Payer"
          description="Filter as payer button"
        />
      </Button>

      <Button
        className={cn("!min-w-px", {
          "!font-medium border-text-300": selectedType === "contingent",
        })}
        variant="filter"
        onClick={() => {
          onClick("contingent");
        }}
      >
        <FormattedMessage
          id="bills.list.type.continget"
          defaultMessage="Contingent"
          description="Filter as contingent button"
        />
      </Button>

      <Button
        className={cn("!min-w-px", {
          "!font-medium border-text-300": selectedType === "history",
        })}
        variant="filter"
        onClick={() => {
          onClick("history");
        }}
      >
        <FormattedMessage
          id="bills.list.type.history"
          defaultMessage="History"
          description="Filter as history button"
        />
      </Button>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-5 w-1/4 bg-elevation-200 mb-1.5" />
      <Skeleton className="h-16 w-full bg-elevation-200" />
      <Skeleton className="h-16 w-full bg-elevation-200" />
      <Skeleton className="h-16 w-full bg-elevation-200" />
    </div>
  );
}

function List() {
  const { formatMessage: f } = useIntl();
  const { data } = useSuspenseQuery({
    queryKey: ["bills"],
    queryFn: () => getBillsLight(),
  });

  // todo: fix bills being identified as earlier if date is not strictly today
  const todayBills = data.bills.filter((bill) =>
    isToday(parseISO(bill.issue_date))
  );
  const earlierBills = data.bills.filter(
    (bill) => !isToday(parseISO(bill.issue_date))
  );

  const { refetch } = useQuery({
    queryFn: () => checkBillsInDHT(),
    queryKey: ["bills", "check"],
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    // todo: fix scroll area viewports
    <div className="flex-1 flex flex-col gap-6 mb-24">
      <div className="ml-auto">
        <RefreshButton
          label={f({
            id: "bills.list.refresh",
            defaultMessage: "Refresh",
            description: "Refresh button label",
          })}
          content={f({
            id: "bills.list.refresh.content",
            defaultMessage: "Refresh bills list",
            description: "Refresh bills list tooltip",
          })}
          onClick={() => {
            void refetch();
          }}
        />
      </div>

      {data.bills.length === 0 ? (
        <div className="flex-1 flex flex-col items-center">
          <Empty />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1.5">
            {todayBills.length > 0 && (
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-text-300 text-base font-medium leading-normal">
                  <FormattedMessage
                    id="bills.list.today"
                    defaultMessage="Today"
                    description="Today bills section title"
                  />
                </span>

                <MaturityFilter
                  onClick={() => {
                    console.log("clicked");
                  }}
                />
              </div>
            )}

            {todayBills.map((bill) => (
              <Link to={routes.VIEW_BILL.replace(":id", bill.id)} key={bill.id}>
                <Card
                  key={bill.id}
                  name={bill.drawer.name}
                  date={bill.issue_date}
                  amount={Number(bill.sum)}
                  currency={bill.currency}
                />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-text-300 text-base font-medium leading-normal">
                <FormattedMessage
                  id="bills.list.earlier"
                  defaultMessage="Earlier"
                  description="Earlier bills section title"
                />
              </span>

              {earlierBills.length > 0 && todayBills.length === 0 && (
                <MaturityFilter
                  onClick={() => {
                    console.log("clicked");
                  }}
                />
              )}
            </div>

            {earlierBills.map((bill) => (
              <Link to={routes.VIEW_BILL.replace(":id", bill.id)} key={bill.id}>
                <Card
                  key={bill.id}
                  name={bill.drawee.name}
                  date={bill.issue_date}
                  amount={Number(bill.sum)}
                  currency={bill.currency}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Bills() {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");

  return (
    <Page className="gap-3" displayBottomNavigation>
      <Topbar
        lead={
          <PageTitle className="text-xl font-medium">
            <FormattedMessage
              id="bills.list.title"
              defaultMessage="Bills"
              description="Title for bills page"
            />
          </PageTitle>
        }
        trail={
          <DateRangeFilter
            onChange={(e) => {
              console.log(e);
            }}
          />
        }
      />
      <div className="flex flex-col gap-2">
        <Search
          size="sm"
          placeholder="Search for bills..."
          onSearch={() => {
            console.log("search");
          }}
        />
        <TypeFilter
          selectedType={selectedTypeFilter}
          onClick={setSelectedTypeFilter}
        />
      </div>

      <Suspense fallback={<Loader />}>
        <List />
      </Suspense>
    </Page>
  );
}
