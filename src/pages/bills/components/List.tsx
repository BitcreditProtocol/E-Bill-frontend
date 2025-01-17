import Bill from "@/components/Bill";
import { Skeleton } from "@/components/ui/skeleton";
import type { Bill as BillType } from "@/types/bill";
import { useNavigate } from "react-router-dom";

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

type ListProps = {
  isLoading: boolean;
  bills: BillType[];
};

export default function List({ isLoading, bills }: ListProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-1.5">
      {isLoading ? (
        <Loader />
      ) : (
        bills.map((bill) => (
          <Bill
            key={bill.bill_name}
            title={bill.drawer.name}
            amount={Number(bill.sum.amount)}
            currency={bill.sum.currency}
            date={bill.issue_date}
            onClick={() => {
              navigate("/bill");
            }}
          />
        ))
      )}
    </div>
  );
}
