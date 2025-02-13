import { format, parseISO } from "date-fns";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { useIdentity } from "@/context/identity/IdentityContext";
import type { Peer } from "@/types/bill";
import { cn } from "@/lib/utils";

type CardProps = {
  name: string;
  date: string;
  amount: number;
  currency: string;
  drawee: Pick<Peer, "name" | "node_id">;
  payee: Pick<Peer, "name" | "node_id">;
  endorsee: Pick<Peer, "name" | "node_id"> | null;
  hasPendingAction?: boolean;
};

export function Card({
  name,
  date,
  amount,
  currency,
  drawee,
  payee,
  endorsee,
  hasPendingAction,
}: CardProps) {
  const {
    activeIdentity: { node_id },
  } = useIdentity();
  const isPayer = drawee.node_id === node_id;
  const isPayee =
    (endorsee !== null && endorsee.node_id === node_id) ||
    payee.node_id === node_id;
  const formattedDate = format(parseISO(date), "dd-MMM-yyyy");

  return (
    <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          {hasPendingAction && (
            <div className="h-2 w-2 bg-[#ff2600] rounded-full" />
          )}
          <span className="text-text-300 text-base !font-medium leading-6 !not-italic">
            {name}
          </span>
        </div>
        <span className="text-text-200 text-xs font-normal leading-normal">
          {formattedDate}
        </span>
      </div>

      <div className="flex items-center gap-1 self-end">
        <FormattedCurrency
          className={cn("!text-sm !font-normal !leading-5", {
            "!text-signal-error": isPayer,
            "!text-signal-success": isPayee,
            "!text-text-300": !isPayer && !isPayee,
          })}
          value={isPayer ? -amount : amount}
          currency=""
        />
        <span className="text-text-300 text-xs font-normal leading-normal">
          {currency}
        </span>
      </div>
    </div>
  );
}
