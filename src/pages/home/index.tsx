import { Suspense } from "react";
import { Link } from "react-router-dom";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { FormattedMessage, useIntl } from "react-intl";
import { ChartColumnIcon, LayoutListIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import Search from "@/components/ui/search";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Picture from "@/components/Picture";
import Bill from "@/components/Bill";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { getBalances } from "@/services/balances";
import { getBillsLight } from "@/services/bills";
import { useIdentity } from "@/context/identity/IdentityContext";
import routes from "@/constants/routes";
import Empty from "../bills/components/Empty";

function Balances() {
  const { isPending, data } = useQuery({
    queryKey: ["balances"],
    queryFn: () => getBalances("sat"),
  });

  return (
    <div className="flex flex-col gap-3 pt-4 pb-2 bg-elevation-200 border border-divider-50 rounded-2xl">
      <div className="flex-1 flex items-center justify-between px-4">
        <span className="text-text-300 text-base font-medium leading-6">
          <FormattedMessage
            id="home.balances"
            defaultMessage="Balances"
            description="Balances section title for home page"
          />
        </span>

        <span className="text-text-300 text-xs font-medium leading-normal">
          BTC
        </span>
      </div>

      <Separator className="bg-divider-75" />

      <div className="flex flex-col gap-3 pb-2 px-4">
        <div className="flex items-start justify-between py-2 border-b-[1px] border-divider-75">
          <span className="text-text-200 text-sm">
            <FormattedMessage
              id="home.balances.payee"
              defaultMessage="Payee"
              description="Payee label for balances section"
            />
          </span>

          <div className="flex items-center gap-1.5">
            {isPending || !data ? (
              <Skeleton className="h-5 w-16 bg-elevation-300 rounded-sm" />
            ) : (
              <FormattedCurrency
                value={+Number(data.balances.payee.sum)}
                type="credit"
              />
            )}
            <span className="text-text-200 text-xs leading-[18px]">BTC</span>
          </div>
        </div>

        <div className="flex items-start justify-between py-2 border-b-[1px] border-divider-75">
          <span className="text-text-200 text-sm">
            <FormattedMessage
              id="home.balances.payer"
              defaultMessage="Payer"
              description="Payer label for balances section"
            />
          </span>

          <div className="flex items-center gap-1.5">
            {isPending || !data ? (
              <Skeleton className="h-5 w-16 bg-elevation-300 rounded-sm" />
            ) : (
              <FormattedCurrency
                value={-Number(data.balances.payer.sum)}
                type="debit"
              />
            )}
            <span className="text-text-200 text-xs leading-normal">BTC</span>
          </div>
        </div>

        <div className="flex items-start justify-between py-2">
          <span className="text-text-200 text-sm">
            <FormattedMessage
              id="home.balances.contingent"
              defaultMessage="Contingent"
              description="Contingent label for balances section"
            />
          </span>

          <div className="flex items-center gap-1.5">
            {isPending || !data ? (
              <Skeleton className="h-5 w-16 bg-elevation-300 rounded-sm" />
            ) : (
              <FormattedCurrency
                signDisplay="never"
                value={Number(data.balances.contingent.sum)}
                color="none"
              />
            )}
            <span className="text-text-200 text-xs leading-normal">BTC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentBillsLoader() {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-16 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-16 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-16 bg-elevation-200 rounded-lg" />
    </div>
  );
}

function RecentBills() {
  const { data } = useSuspenseQuery({
    queryKey: ["recent-bills"],
    queryFn: getBillsLight,
  });

  return data.bills.length === 0 ? (
    <div className="flex-1 flex flex-col items-center">
      <Empty />
    </div>
  ) : (
    <div className="flex flex-col gap-1.5">
      {data.bills.slice(0, 3).map((bill) => (
        <Link to={`/${routes.VIEW_BILL.replace(":id", bill.id)}`} key={bill.id}>
          <Bill
            title={bill.drawer.name}
            amount={bill.sum}
            currency={"BTC"}
            date={bill.issue_date}
          />
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  const { activeIdentity } = useIdentity();
  const intl = useIntl();

  return (
    <Page
      className="gap-6 pb-20"
      displayBackgroundEllipse
      displayBottomNavigation
    >
      <Topbar
        lead={
          <Link to={routes.IDENTITY_LIST}>
            <Picture
              type={activeIdentity.type === "company" ? 1 : 0}
              name={activeIdentity.name}
              image={activeIdentity.avatar}
              size="sm"
            />
          </Link>
        }
        middle={
          <Search
            className="w-full"
            size="xs"
            placeholder={intl.formatMessage({
              id: "Search field for home page",
              defaultMessage: "Search...",
              description: "Search placeholder for home page",
            })}
            onSearch={() => {
              console.log("search");
            }}
          />
        }
      />

      <div className="flex-1 flex flex-col gap-8">
        <Balances />

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-text-300 text-sm font-medium leading-5">
              <FormattedMessage
                id="home.recentBills"
                defaultMessage="Recent bills"
                description="Recent bills section title for home page"
              />
            </span>
            <Link to={routes.BILLS}>
              <button className="flex items-center gap-1 p-0 text-brand-200 text-sm font-medium leading-5">
                <FormattedMessage
                  id="home.recentBills.list"
                  defaultMessage="Bill list"
                  description="Bill list link for home page"
                />
                <LayoutListIcon className="text-brand-200 h-4 w-4 stroke-1" />
              </button>
            </Link>
          </div>

          <Suspense fallback={<RecentBillsLoader />}>
            <RecentBills />
          </Suspense>

          <button className="flex items-center gap-1 p-0 text-brand-200 text-sm font-medium leading-5 mx-auto">
            <FormattedMessage
              id="home.recentBills.cashflow"
              defaultMessage="Cashflow"
              description="Button to access the cashflow page"
            />
            <ChartColumnIcon className="text-brand-200 h-4 w-4 stroke-1" />
          </button>
        </div>
      </div>
    </Page>
  );
}
