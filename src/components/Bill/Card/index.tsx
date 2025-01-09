import { FormattedMessage, useIntl } from "react-intl";
import { CheckIcon, ChevronRightIcon, PaperclipIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function Separators() {
  return (
    <div className="flex flex-col gap-0.5">
      <Separator className="bg-divider-300" />
      <Separator className="bg-divider-300" />
      <Separator className="bg-divider-300" />
    </div>
  );
}

function Property({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start px-5">
      <span className="flex-1 text-text-200 text-xs font-normal pt-0.5">
        {label}
      </span>
      <span className="flex-1 text-text-300 text-sm font-medium text-right">
        {value}
      </span>
    </div>
  );
}

type CardProps = {
  city_of_issuing: string;
  country_of_issuing: string;
  issue_date: string;
  maturity_date: string;
  payer: string;
  drawee: string;
  drawer: string;
  city_of_payment: string;
  country_of_payment: string;
};

export default function Card({
  city_of_issuing,
  country_of_issuing,
  issue_date,
  maturity_date,
  payer,
  drawee,
  drawer,
  city_of_payment,
  country_of_payment,
}: CardProps) {
  const intl = useIntl();
  const issuingInformation = `${city_of_issuing}, ${country_of_issuing}, ${issue_date}`;
  const placeOfPayment = `${city_of_payment}, ${country_of_payment}`;

  return (
    <div className="flex flex-col border border-divider-50 rounded-xl">
      <div className="flex flex-col p-5 bg-elevation-200 rounded-t-xl">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-text-200 text-sm font-medium">
              {issuingInformation}
            </span>

            <h2 className="text-text-300 text-base font-medium">
              <FormattedMessage
                id="Against this bill of exchange"
                defaultMessage="Against this bill of exchange"
                description="Heading for bill preview page"
              />
            </h2>
          </div>

          <PaperclipIcon className="text-text-300 w-5 h-5 stroke-1" />
        </div>

        <div className="flex flex-col gap-3 bg-elevation-200 rounded-b-[16px]">
          <Separators />

          <div className="flex flex-col gap-3 py-3 bg-elevation-50 border-[1px] border-divider-75 rounded-t-[12px] rounded-b-[16px]">
            <Property
              label={intl.formatMessage({
                id: "bill.card.payOn",
                defaultMessage: "Pay on",
                description: "Pay on property for bill card",
              })}
              value={maturity_date}
            />
            <Separator />

            <Property
              label={intl.formatMessage({
                id: "bill.card.drawee",
                defaultMessage: "Drawee",
                description: "Drawee property for bill card",
              })}
              value={drawee}
            />
            <Separator />

            <Property label="The sum of" value="0.10000000" />
            <Separator />

            <Property
              label={intl.formatMessage({
                id: "bill.card.payer",
                defaultMessage: "Payer",
                description: "Payer property for bill card",
              })}
              value={payer}
            />
            <Separator />

            <Property
              label={intl.formatMessage({
                id: "bill.card.drawer",
                defaultMessage: "Drawer",
                description: "Drawer property for bill card",
              })}
              value={drawer}
            />
            <Separator />

            <Property
              label={intl.formatMessage({
                id: "bill.card.placeOfPayment",
                defaultMessage: "Place of payment",
                description: "Place of payment property for bill card",
              })}
              value={placeOfPayment}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Separators />

            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="bill.card.noProtest"
                defaultMessage="No protest. Value received."
                description="No protest copy for bill card"
              />
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 py-4 px-5">
        <div className="flex gap-1">
          <span className="text-text-200 text-xs font-normal">
            <FormattedMessage
              id="bill.card.status"
              defaultMessage="Status:"
              description="Status property for bill card"
            />
          </span>

          <div className="flex items-center gap-1">
            <CheckIcon className="text-text-300 w-3 h-3 stroke-3" />

            <span className="text-text-300 text-xs font-normal">
              <FormattedMessage
                id="bill.card.accepted"
                defaultMessage="Accepted"
                description="Accepted status for bill card"
              />
            </span>
          </div>
        </div>

        <button className="flex items-center gap-1">
          <span className="text-text-200 text-xs font-normal">
            <FormattedMessage
              id="bill.card.endorsements"
              defaultMessage="Endorsements"
              description="Endorsements button for bill card"
            />
          </span>

          <span className="text-text-300 text-xs font-medium">(12)</span>

          <ChevronRightIcon className="text-text-300 w-5 h-5 ml-0.5 stroke-1" />
        </button>
      </div>
    </div>
  );
}
