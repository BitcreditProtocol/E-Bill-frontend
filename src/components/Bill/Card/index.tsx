import { FormattedMessage, useIntl } from "react-intl";
import { CheckCircleIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function Separators() {
  return (
    <div className="flex flex-col gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Separator key={index} className="bg-divider-300" />
      ))}
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
    <div className="flex flex-col border-[1px] border-divider-50 rounded-[16px]">
      <span className="py-3 px-5 text-text-300 text-sm font-medium">
        {issuingInformation}
      </span>

      <div className="flex flex-col gap-3 py-6 px-5 bg-elevation-200 rounded-b-[16px]">
        <div className="flex flex-col gap-1">
          <h2 className="text-text-300 text-base font-medium">
            <FormattedMessage
              id="Against this bill of exchange"
              defaultMessage="Against this bill of exchange"
              description="Heading for bill preview page"
            />
          </h2>
        </div>

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
              id: "bill.card.placeOfPayment",
              defaultMessage: "Place of payment",
              description: "Place of payment property for bill card",
            })}
            value={placeOfPayment}
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
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-text-300 text-sm font-medium">
            <FormattedMessage
              id="No protest"
              defaultMessage="No protest"
              description="No protest copy for bill preview page"
            />
          </span>

          <Separators />

          <div className="flex flex-col gap-1.5">
            <span className="text-text-200 text-xs font-normal">
              <FormattedMessage
                id="Invoice"
                defaultMessage="Invoice"
                description="Invoice copy for bill preview page"
              />
            </span>

            <div className="flex h-12 w-full p-3 bg-elevation-50 border-[1px] border-divider-75 rounded-[12px]">
              <div className="flex gap-1">
                <span className="text-sm font-medium text-text-300">
                  Invoice.pdf
                </span>

                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#1B0F0080]">200 KB</span>
                  <CheckCircleIcon color="#006F29" width={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
