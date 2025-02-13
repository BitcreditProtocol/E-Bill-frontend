import { format, parseISO } from "date-fns";
import { useIdentity } from "@/context/identity/IdentityContext";
import { cn } from "@/lib/utils";
import type { Peer } from "@/types/bill";
import { FormattedCurrency } from "../FormattedCurrency";

type BillProps = {
  title: string;
  date: string;
  amount: number | string;
  currency: string;
  drawee: Pick<Peer, "name" | "node_id">;
  payee: Pick<Peer, "name" | "node_id">;
  endorsee: Pick<Peer, "name" | "node_id"> | null;
  hasPendingAction?: boolean;
  onClick?: () => void;
};

// todo: make this general bill card component
export default function Bill({
  title,
  date,
  amount,
  currency,
  drawee,
  payee,
  endorsee,
  hasPendingAction,
  onClick,
}: BillProps) {
  const {
    activeIdentity: { node_id },
  } = useIdentity();
  const isPayer = drawee.node_id === node_id;
  const isPayee =
    (endorsee !== null && endorsee.node_id === node_id) ||
    payee.node_id === node_id;

  const formattedDate = format(parseISO(date), "dd-MMM-yyyy");

  return (
    <div
      className="flex justify-between items-end p-4 bg-elevation-200 border border-divider-50 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          {hasPendingAction && (
            <div className="h-2 w-2 bg-[#ff2600] rounded-full" />
          )}
          <span className="text-text-300 text-base font-normal leading-normal">
            {title}
          </span>
        </div>

        <span className="text-text-200 text-xs font-normal leading-normal">
          {formattedDate}
        </span>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-1 items-baseline">
          <FormattedCurrency
            value={Number(amount)}
            className={cn("!text-sm !font-normal !leading-5", {
              "!text-signal-error": isPayer,
              "!text-signal-success": isPayee,
              "!text-text-300": !isPayer && !isPayee,
            })}
          />

          <span className="text-text-200 text-xs font-normal leading-normal">
            {currency}
          </span>
        </div>
      </div>
    </div>
  );
}
