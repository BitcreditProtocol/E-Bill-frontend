import { FormattedMessage } from "react-intl";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDaysIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ChashFlowChart from "./components/CashFlowChart";
import { getBillsLight } from "@/services/bills";
import { Suspense } from "react";

function Loader() {
  return (
    <Skeleton className="w-full h-64 bg-elevation-200 rounded-lg" />
  );
}

export default function CashFlow() {
  const { data } = useSuspenseQuery({
    queryKey: ["bills"],
    queryFn: getBillsLight,
  });

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5">
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 justify-between items-center">
          <h2 className="text-xl font-medium text-text-300">
            <FormattedMessage
              id="page.cashflow.title"
              defaultMessage="Cash flow"
              description="Page title for Cash flow page"
            />
          </h2>

          <Button variant="link" className="gap-1 text-xs text-text-300 px-0">
            <CalendarDaysIcon size={16} strokeWidth={1} color="#1B0F00" />

            <FormattedMessage
              id="Date range"
              defaultMessage="Date range"
              description="Header label for picking date range on Cash flow page"
            />
          </Button>
        </div>

        <div className="flex flex-col gap-1.5">
          <Suspense fallback={<Loader />}>
            <ChashFlowChart values={data.bills} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
