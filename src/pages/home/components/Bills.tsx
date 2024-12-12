import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import { ReceiptTextIcon } from "lucide-react";

import Bill from "@/components/Bill";
import routes from "@/constants/routes";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecentBills } from "@/services/bill";

function BillsLoader() {
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
      <span className="text-text-300 text-sm font-medium leading-5">
        <FormattedMessage
          id="Recent bills"
          defaultMessage="Recent bills"
          description="Recent bills section title for home page"
        />
      </span>

      <div className="flex flex-col gap-3">
        {isPending || !data ? (
          <BillsLoader />
        ) : (
          data.map((bill) => (
            <Bill
              key={bill.id}
              title={bill.name}
              amount={bill.amount_numbers}
              currency={bill.currency_code}
              date={bill.date_of_issue}
            />
          ))
        )}

        <button
          className="flex items-center gap-1 bg-transparent text-brand-200 text-sm font-medium leading-5 mx-auto"
          onClick={() => {
            navigate(routes.BILLS);
          }}
        >
          <FormattedMessage
            id="See all bills"
            defaultMessage="See all bills"
            description="Button to view all bills"
          />

          <ReceiptTextIcon className="h-4 w-4 text-brand-200" strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}
