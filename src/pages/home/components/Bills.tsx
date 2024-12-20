import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import { ChartColumnIcon, LayoutListIcon } from "lucide-react";

import Bill from "@/components/Bill";
import routes from "@/constants/routes";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecentBills } from "@/services/bill";

function Loader() {
  return (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton
          id={`bill-skeleton-${i.toString()}`}
          key={`bill-skeleton-${i.toString()}`}
          className="w-full h-16 bg-elevation-200 rounded-lg"
        />
      ))}
    </>
  );
}

export default function Bills() {
  const navigate = useNavigate();
  const { isPending, data } = useQuery({
    queryKey: ["recent-bills"],
    queryFn: getRecentBills,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="flex-1 text-text-300 text-sm font-medium leading-5">
          <FormattedMessage
            id="Recent bills"
            defaultMessage="Recent bills"
            description="Recent bills section title for home page"
          />
        </span>

        <button
          className="flex items-center gap-1 bg-transparent text-brand-200 text-sm font-medium leading-5 mx-auto"
          onClick={() => {
            navigate(routes.BILLS);
          }}
        >
          <FormattedMessage
            id="Bill list"
            defaultMessage="Bill list"
            description="Button to view all bills"
          />

          <LayoutListIcon className="h-4 w-4 text-brand-200" strokeWidth={1} />
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {isPending || !data ? (
          <Loader />
        ) : (
          data.map((bill) => (
            <Bill
              key={bill.bill_name}
              title={bill.drawer.name}
              amount={bill.sum.amount}
              currency={bill.sum.currency}
              date={bill.issue_date}
            />
          ))
        )}

        <button
          className="flex items-center gap-1 bg-transparent text-brand-200 text-sm font-medium leading-5 mx-auto"
          onClick={() => {
            console.log("/cashflow");
          }}
        >
          <FormattedMessage
            id="Cashflow"
            defaultMessage="Cashflow"
            description="Button to access the cashflow"
          />

          <ChartColumnIcon className="h-4 w-4 text-brand-200" strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}
