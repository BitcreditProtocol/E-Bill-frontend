import { useIntl } from "react-intl";
import { cva } from "class-variance-authority";
import {
  ChevronRightIcon,
  LandmarkIcon,
  LoaderIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type QuoteProps = {
  mintName: string;
  rate: number;
  status: "pending" | "accepted" | "declined";
};

const statusTextVariants = cva("text-xs font-normal leading-[18px]", {
  variants: {
    status: {
      pending: "text-text-300",
      accepted: "text-signal-success",
      declined: "text-signal-error",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

function StatusText({ status, rate }: Pick<QuoteProps, "status" | "rate">) {
  const intl = useIntl();

  const pendingMessage = intl.formatMessage({
    id: "bill.mint.quote.status.pending",
    defaultMessage: "Waiting for quote",
    description: "Pending quote status",
  });

  const declinedMessage = intl.formatMessage({
    id: "bill.mint.quote.status.declined",
    defaultMessage: "Declined",
    description: "Declined quote status",
  });

  const displayedText = {
    accepted: `${(rate * 100).toFixed(6)}%`,
    pending: pendingMessage,
    declined: declinedMessage,
  };

  return (
    <span className={cn(statusTextVariants({ status }))}>
      {displayedText[status]}
    </span>
  );
}

export default function Quote({ mintName, rate, status }: QuoteProps) {
  const displayedIcon = {
    accepted: (
      <ChevronRightIcon className="text-signal-success h-6 w-6 stroke-1" />
    ),
    pending: <LoaderIcon className="text-text-300 h-6 w-6 stroke-1 animate-spin" />,
    declined: <XIcon className="text-signal-error h-6 w-6 stroke-1" />,
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 bg-elevation-50 border border-divider-50 rounded-xl cursor-pointer",
        {
          "bg-elevation-200": status === "accepted",
          "cursor-auto": status !== "accepted",
        }
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 bg-elevation-50 p-2.5 border border-divider-50 rounded-full">
          <LandmarkIcon className="text-text-300 h-5 w-5 stroke-1" />
        </div>
        <div className="flex flex-col">
          <span className="text-text-300 text-base font-medium">
            {mintName}
          </span>
          <StatusText status={status} rate={rate} />
        </div>
      </div>

      {displayedIcon[status]}
    </div>
  );
}
