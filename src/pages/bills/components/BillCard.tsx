import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import { CheckIcon, ChevronRightIcon, PaperclipIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import routes from "@/constants/routes";
import type { BillFull, Peer } from "@/types/bill";
import { Skeleton } from "@/components/ui/skeleton";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { useQuery } from "@tanstack/react-query";
import { getEndorsements } from "@/services/bills";

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

type CardProps = {
  id: BillFull["id"];
  sum: BillFull["sum"];
  city_of_issuing: string;
  country_of_issuing: string;
  issue_date: BillFull["issue_date"];
  maturity_date: BillFull["maturity_date"];
  payee: Pick<Peer, "name" | "address">;
  drawee: Pick<Peer, "name" | "address">;
  drawer: Pick<Peer, "name" | "address">;
  city_of_payment: BillFull["city_of_payment"];
  country_of_payment: BillFull["country_of_payment"];
  endorsed: BillFull["endorsed"];
};

export default function BillCard({
  id,
  sum,
  city_of_issuing,
  country_of_issuing,
  issue_date,
  maturity_date,
  payee,
  drawee,
  drawer,
  city_of_payment,
  country_of_payment,
  endorsed,
}: CardProps) {
  const intl = useIntl();
  const formattedIssueDate = format(parseISO(issue_date), "dd-MMM-yyyy");
  const issuingInformation = `${city_of_issuing}, ${country_of_issuing}, ${formattedIssueDate}`;
  const placeOfPayment = `${city_of_payment}, ${country_of_payment}`;

  const { data: endorsements } = useQuery({
    queryKey: ["bills", id, "endorsements"],
    queryFn: () => getEndorsements(id),
    enabled: endorsed,
  });

  const endorsementsCount = endorsements?.past_endorsees.length || 0;

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

          <button className="h-fit p-0">
            <PaperclipIcon className="text-text-300 w-5 h-5 stroke-1" />
          </button>
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
              value={maturity_date}
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
                    {payee.name}
                  </span>
                  <span className="text-text-200 text-xs font-normal leading-normal">
                    {payee.address}
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
                <FormattedCurrency
                  value={Number(sum)}
                  color="none"
                  signDisplay="never"
                />
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
                    {drawee.name}
                  </span>
                  <span className="text-text-200 text-xs font-normal leading-normal">
                    {drawee.address}
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
              defaultMessage="No protest. Value received."
              description="No protest copy for bill card"
            />
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 py-4 px-5">
        <div className="flex gap-1">
          <span className="text-text-200 text-xs font-normal">
            <FormattedMessage
              id="bill.view.details.status"
              defaultMessage="Status:"
              description="Status property for bill card"
            />
          </span>

          <div className="flex items-center gap-1">
            <CheckIcon className="text-text-300 w-3 h-3 stroke-3" />

            <span className="text-text-300 text-xs font-normal">
              <FormattedMessage
                id="bill.view.details.accepted"
                defaultMessage="Accepted"
                description="Accepted status for bill card"
              />
            </span>
          </div>
        </div>

        <Link to={endorsed ? routes.ENDORSEMENTS : "#"}>
          <button className="flex items-center gap-1">
            <span className="text-text-200 text-xs font-normal">
              <FormattedMessage
                id="bill.view.details.endorsements"
                defaultMessage="Endorsements"
                description="Endorsements button for bill card"
              />
            </span>

            <span className="text-text-300 text-xs font-medium">
              ({endorsementsCount})
            </span>

            <ChevronRightIcon className="text-text-300 w-5 h-5 ml-0.5 stroke-1" />
          </button>
        </Link>
      </div>
    </div>
  );
}
