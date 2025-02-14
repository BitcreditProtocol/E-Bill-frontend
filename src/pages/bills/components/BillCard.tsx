import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import {
  CheckIcon,
  ChevronRightIcon,
  LoaderIcon,
  PaperclipIcon,
  XIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { cn } from "@/lib/utils";
import type { BillFull, Peer } from "@/types/bill";
import { messages } from "./messages";
import routes from "@/constants/routes";

function Separators() {
  return (
    <div className="flex flex-col gap-0.5">
      <Separator className="bg-divider-300" />
      <Separator className="bg-divider-300" />
      <Separator className="bg-divider-300" />
    </div>
  );
}

export function Loader() {
  return (
    <div className="flex flex-col border border-divider-50 rounded-xl select-none">
      <div className="flex flex-col gap-3 p-5 bg-elevation-200 rounded-t-xl">
        <div className="flex justify-between">
          <div className="flex-1 flex flex-col gap-1">
            <Skeleton className="h-4 w-1/3 bg-elevation-350" />
            <Skeleton className="h-6 w-2/3 bg-elevation-300" />
          </div>
          <Skeleton className="h-7 w-7 bg-elevation-300" />
        </div>

        <Separators />

        <div className="flex flex-col gap-3 bg-elevation-200 rounded-b-2xl">
          <div className="flex flex-col gap-3 py-3 bg-elevation-50 border-[1px] border-divider-75 rounded-t-xl rounded-b-2xl">
            <Skeleton className="h-5 w-11/12 bg-elevation-300 mx-auto" />
            <Separator />
            <Skeleton className="h-5 w-11/12 bg-elevation-300 mx-auto" />
            <Separator />
            <Skeleton className="h-5 w-11/12 bg-elevation-300 mx-auto" />
            <Separator />
            <Skeleton className="h-5 w-11/12 bg-elevation-300 mx-auto" />
            <Separator />
            <Skeleton className="h-5 w-11/12 bg-elevation-300 mx-auto" />
            <Separator />
            <Skeleton className="h-5 w-11/12 bg-elevation-300 mx-auto" />
          </div>
        </div>

        <Separators />

        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-2/3 bg-elevation-300" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 py-4 px-5">
        <Skeleton className="h-6 w-2/3 bg-elevation-250" />
        <Skeleton className="h-6 w-2/3 bg-elevation-250" />
      </div>
    </div>
  );
}

function Property({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-start px-5">
      <span className="flex-1 text-text-200 text-xs font-normal pt-0.5">
        {label}
      </span>
      {typeof value === "string" ? (
        <div className="flex-1 text-text-300 text-sm font-medium text-right">
          {value}
        </div>
      ) : (
        <>{value}</>
      )}
    </div>
  );
}

type StatusProps = {
  accepted: BillFull["accepted"];
  requested_to_accept: BillFull["requested_to_accept"];
  paid: BillFull["paid"];
  requested_to_pay: BillFull["requested_to_pay"];
  waiting_for_payment: BillFull["waiting_for_payment"];
};

function Status({
  accepted,
  requested_to_accept,
  paid,
  requested_to_pay,
  waiting_for_payment,
}: StatusProps) {
  const { formatMessage: f } = useIntl();

  // requested_to_accept = true: acceptance pending
  // requested_to_accept = false: unaccepted
  // accepted = true: accepted
  // accepted = false: rejected
  // requested_to_pay = true: payment pending
  // requested_to_pay = false: unpaid
  // paid = true: paid
  // paid = false: unpaid
  // waiting_for_payment = true: payment pending
  // waiting_for_payment = false: unpaid

  const status = {
    //TODO: rejected for accept and reject for pay
    acceptance: accepted
      ? "accepted"
      : requested_to_accept
      ? "pending_acceptance"
      : "unaccepted",
    payment: paid
      ? "paid"
      : requested_to_pay
      ? "pending_payment"
      : waiting_for_payment
      ? "pending_payment"
      : "unpaid",
  };

  const message = {
    accepted: f(messages["bill.status.accepted"]),
    pending_acceptance: f(messages["bill.status.pending_acceptance"]),
    unaccepted: f(messages["bill.status.unaccepted"]),
    paid: f(messages["bill.status.paid"]),
    pending_payment: f(messages["bill.status.pending_payment"]),
    unpaid: f(messages["bill.status.unpaid"]),
  }[status.payment || status.acceptance];

  const icon = {
    accepted: <CheckIcon className="h-4 w-5 stroke-1" />,
    pending_acceptance: (
      <LoaderIcon className="h-4 w-5 stroke-1 animate-spin" />
    ),
    unaccepted: <XIcon className="h-4 w-5 stroke-1" />,
    paid: <CheckIcon className="w-5 h-5" />,
    pending_payment: (
      <LoaderIcon className="h-4 w-5 stroke-1 animate-spin ease-in-out" />
    ),
    unpaid: <XIcon className="h-4 w-5 stroke-1" />,
  }[status.payment || status.acceptance];

  return (
    <div className="flex items-center gap-1">
      {icon}

      <span
        className={cn("text-xs font-normal leading-normal", {
          "text-signal-success":
            status.acceptance === "accepted" || status.payment === "paid",
          "text-text-300":
            status.acceptance === "pending_acceptance" ||
            status.acceptance === "unaccepted" ||
            status.payment === "pending_payment",
          "text-signal-error":
            //TODO: we put red color only if we reject something
            status.acceptance === "accepted" && status.payment === "unpaid",
        })}
      >
        {message}
      </span>
    </div>
  );
}

type CardProps = {
  id: BillFull["id"];
  sum: BillFull["sum"];
  currency: string;
  city_of_issuing: string;
  country_of_issuing: string;
  issue_date: BillFull["issue_date"];
  maturity_date: BillFull["maturity_date"];
  holder: Pick<Peer, "name" | "address">;
  payer: Pick<Peer, "name" | "address">;
  drawer: Pick<Peer, "name" | "address">;
  city_of_payment: BillFull["city_of_payment"];
  country_of_payment: BillFull["country_of_payment"];
  accepted: BillFull["accepted"];
  requested_to_accept: BillFull["requested_to_accept"];
  paid: BillFull["paid"];
  requested_to_pay: BillFull["requested_to_pay"];
  waiting_for_payment: BillFull["waiting_for_payment"];
  endorsements_count: BillFull["endorsements_count"];
  attachment: string | null;
  isPayer: boolean;
  isPayee: boolean;
};

export default function BillCard({
  id,
  sum,
  currency,
  city_of_issuing,
  country_of_issuing,
  issue_date,
  maturity_date,
  holder,
  payer,
  drawer,
  city_of_payment,
  country_of_payment,
  accepted,
  requested_to_accept,
  paid,
  requested_to_pay,
  waiting_for_payment,
  endorsements_count,
  attachment,
  isPayer,
  isPayee,
}: CardProps) {
  const intl = useIntl();
  const formattedIssueDate = format(parseISO(issue_date), "dd-MMM-yyyy");
  const issuingInformation = `${city_of_issuing}, ${country_of_issuing}, ${formattedIssueDate}`;
  const placeOfPayment = [city_of_payment, country_of_payment]
    .filter(Boolean)
    .join(", ");

  const formattedMaturityDate = format(parseISO(maturity_date), "dd-MMM-yyyy");

  return (
    <div className="flex flex-col border border-divider-50 rounded-xl select-none">
      <div className="flex flex-col gap-3 p-5 bg-elevation-200 rounded-t-xl">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-text-200 text-sm font-medium">
              {issuingInformation}
            </span>

            <h2 className="text-text-300 text-base font-medium">
              <FormattedMessage
                id="bill.view.details.billOfExchange"
                defaultMessage="Against this bill of exchange"
                description="Heading for bill preview page"
              />
            </h2>
          </div>

          {attachment && attachment !== "" && (
            <Link to={attachment} target="_blank">
              <button className="h-fit p-0">
                <PaperclipIcon className="text-text-300 w-5 h-5 stroke-1" />
              </button>
            </Link>
          )}
        </div>

        <Separators />

        <div className="flex flex-col gap-3 bg-elevation-200 rounded-b-2xl">
          <div className="flex flex-col gap-3 py-3 bg-elevation-50 border-[1px] border-divider-75 rounded-t-xl rounded-b-2xl">
            <Property
              label={intl.formatMessage({
                id: "bill.view.details.payOn",
                defaultMessage: "Pay on",
                description: "Pay on property for bill card",
              })}
              value={formattedMaturityDate}
            />
            <Separator />

            <Property
              label={intl.formatMessage({
                id: "bill.view.details.toTheOrderOf",
                defaultMessage: "To the order of",
                description: "To the order of property for bill card",
              })}
              value={
                <div className="flex flex-col items-end gap-1">
                  <span className="text-text-300 text-sm font-medium leading-5">
                    {holder.name}
                  </span>
                  <span className="text-text-200 text-xs font-normal leading-normal">
                    {holder.address}
                  </span>
                </div>
              }
            />
            <Separator />

            <Property
              label={intl.formatMessage({
                id: "bill.view.details.sum",
                defaultMessage: "The sum of",
                description: "Sum property for bill card",
              })}
              value={
                <div className="flex items-center gap-1">
                  <FormattedCurrency
                    className={cn("!text-sm, !font-medium !leading-5", {
                      "!text-signal-error": isPayer,
                      "!text-signal-success": isPayee,
                      "!text-text-300": !isPayer && !isPayee,
                    })}
                    value={isPayer ? -parseInt(sum) : parseInt(sum)}
                    currency=""
                  />
                  <span className="text-text-200 text-[10px] font-normal leading-[14px]">
                    {currency}
                  </span>
                </div>
              }
            />
            <Separator />

            <Property
              label={intl.formatMessage({
                id: "bill.view.details.payer",
                defaultMessage: "Payer",
                description: "Payer property for bill card",
              })}
              value={
                <div className="flex flex-col items-end gap-1">
                  <span className="text-text-300 text-sm font-medium leading-5">
                    {payer.name}
                  </span>
                  <span className="text-text-200 text-xs font-normal leading-normal">
                    {payer.address}
                  </span>
                </div>
              }
            />
            <Separator />

            <Property
              label={intl.formatMessage({
                id: "bill.view.details.drawer",
                defaultMessage: "Drawer",
                description: "Drawer property for bill card",
              })}
              value={
                // todo: refactor this component
                <div className="flex flex-col items-end gap-1">
                  <span className="text-text-300 text-sm font-medium leading-5">
                    {drawer.name}
                  </span>
                  <span className="text-text-200 text-xs font-normal leading-normal">
                    {drawer.address}
                  </span>
                </div>
              }
            />
            <Separator />

            <Property
              label={intl.formatMessage({
                id: "bill.view.details.placeOfPayment",
                defaultMessage: "Place of payment",
                description: "Place of payment property for bill card",
              })}
              value={placeOfPayment}
            />
          </div>
        </div>

        <Separators />

        <div className="flex flex-col gap-3">
          <span className="text-text-300 text-sm font-medium">
            <FormattedMessage
              id="bill.view.details.noProtest"
              defaultMessage="No protest."
              description="No protest copy for bill card"
            />{" "}
            {attachment && attachment !== "" && (
              <FormattedMessage
                id="bill.view.details.valueReceived"
                defaultMessage="Value received."
                description="Value received. copy for bill card"
              />
            )}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 py-4 px-5">
        <div className="flex flex-col items-start gap-1">
          <span className="text-text-200 text-xs font-normal">
            <FormattedMessage
              id="bill.view.details.status"
              defaultMessage="Status:"
              description="Status property for bill card"
            />
          </span>

          <Status
            accepted={accepted}
            requested_to_accept={requested_to_accept}
            paid={paid}
            requested_to_pay={requested_to_pay}
            waiting_for_payment={waiting_for_payment}
          />
        </div>

        <Link to={routes.ENDORSEMENTS.replace(":id", id)}>
          <button className="flex items-center gap-1">
            <span className="text-text-200 text-xs font-normal">
              <FormattedMessage
                id="bill.view.details.endorsements"
                defaultMessage="Endorsements"
                description="Endorsements button for bill card"
              />
            </span>

            <span className="text-text-300 text-xs font-medium">
              (
              <FormattedNumber
                value={endorsements_count}
                signDisplay="negative"
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
              )
            </span>

            <ChevronRightIcon className="text-text-300 w-5 h-5 ml-0.5 stroke-1" />
          </button>
        </Link>
      </div>
    </div>
  );
}
