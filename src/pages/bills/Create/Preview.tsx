import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import { PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { useToast } from "@/hooks/use-toast";
import { useIdentity } from "@/context/identity/IdentityContext";
import { createBill } from "@/services/bills";
import routes from "@/constants/routes";
import type { CreateBillFormSchema } from "./index";

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

export default function Preview() {
  const { formatMessage: f } = useIntl();
  const navigate = useNavigate();
  const { getValues } = useFormContext<CreateBillFormSchema>();

  const { toast } = useToast();
  const { activeIdentity } = useIdentity();

  console.log("getValues", getValues());

  const formattedIssueDate = format(
    parseISO(getValues("issuance.date") || ""),
    "dd-MMM-yyyy"
  );
  const formattedMaturityDate = format(
    parseISO(getValues("payment.date") || ""),
    "dd-MMM-yyyy"
  );

  const issuanceInformation = `${getValues("issuance.city")}, ${getValues(
    "issuance.country"
  )}, ${formattedIssueDate}`;
  const placeOfPayment = `${getValues("payment.city")}, ${getValues(
    "payment.country"
  )}`;

  const { mutate } = useMutation({
    mutationFn: () =>
      createBill({
        type: getValues("type"),
        country_of_issuing: getValues("issuance.country"),
        city_of_issuing: getValues("issuance.city"),
        issue_date: getValues("issuance.date") || "",
        maturity_date: getValues("payment.date") || "",
        sum: getValues("billing.sum")?.toString() || "",
        currency: getValues("billing.currency"),
        language: getValues("language"),
        country_of_payment: getValues("payment.country"),
        city_of_payment: getValues("payment.city"),
        payee: getValues("payee.node_id"),
        drawee: getValues("drawee.node_id"),
        file_upload_id: getValues("invoice.file_upload_id"),
      }),
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "Bill created successfully",
        position: "bottom-center",
      });

      navigate(routes.VIEW_BILL.replace(":id", data.id));
    },
    onError: () => {
      toast({
        title: f({
          id: "bill.create.preview.error",
          defaultMessage: "Error",
          description: "Error toast title",
        }),
        description: f({
          id: "bill.create.preview.error.description",
          defaultMessage:
            "Error while creating bill. Please review the information and try again.",
          description: "Error toast description",
        }),
        position: "bottom-center",
      });
    },
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col border border-divider-50 rounded-xl select-none mb-auto">
        <div className="flex flex-col gap-3 p-5 bg-elevation-200 rounded-xl">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-text-200 text-sm font-medium">
                {issuanceInformation}
              </span>

              <h2 className="text-text-300 text-base font-medium">
                <FormattedMessage
                  id="bill.create.preview.details.billOfExchange"
                  defaultMessage="Against this bill of exchange"
                  description="Heading for bill preview page"
                />
              </h2>
            </div>

            <button className="h-fit p-0">
              <PaperclipIcon className="text-text-300 w-5 h-5 stroke-1" />
            </button>
          </div>

          <div className="flex flex-col gap-0.5">
            <Separator className="bg-divider-300" />
            <Separator className="bg-divider-300" />
            <Separator className="bg-divider-300" />
          </div>

          <div className="flex flex-col gap-3 bg-elevation-200 rounded-b-2xl">
            <div className="flex flex-col gap-3 py-3 bg-elevation-50 border-[1px] border-divider-75 rounded-t-xl rounded-b-2xl">
              <Property
                label={f({
                  id: "bill.create.preview.details.payOn",
                  defaultMessage: "Pay on",
                  description: "Pay on property for bill card",
                })}
                value={formattedMaturityDate}
              />
              <Separator />

              <Property
                label={f({
                  id: "bill.create.preview.details.toTheOrderOf",
                  defaultMessage: "To the order of",
                  description: "To the order of property for bill card",
                })}
                value={
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-text-300 text-sm font-medium leading-5">
                      {getValues("payee.name")}
                    </span>
                    <span className="text-text-200 text-xs font-normal leading-normal">
                      {getValues("payee.address")}
                    </span>
                  </div>
                }
              />
              <Separator />

              <Property
                label={f({
                  id: "bill.create.preview.details.sum",
                  defaultMessage: "The sum of",
                  description: "Sum property for bill card",
                })}
                value={
                  <div className="flex items-center gap-1">
                    <FormattedCurrency
                      value={getValues("billing.sum") || 0}
                      type="debit"
                      signDisplay="never"
                    />
                    <span className="text-text-200 text-[10px] font-normal leading-[14px]">
                      {getValues("billing.currency")}
                    </span>
                  </div>
                }
              />
              <Separator />

              <Property
                label={f({
                  id: "bill.create.preview.details.payer",
                  defaultMessage: "Payer",
                  description: "Payer property for bill card",
                })}
                value={
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-text-300 text-sm font-medium leading-5">
                      {getValues("drawee.name")}
                    </span>
                    <span className="text-text-200 text-xs font-normal leading-normal">
                      {getValues("drawee.address")}
                    </span>
                  </div>
                }
              />
              <Separator />

              <Property
                label={f({
                  id: "bill.create.preview.details.drawer",
                  defaultMessage: "Drawer",
                  description: "Drawer property for bill card",
                })}
                value={
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-text-300 text-sm font-medium leading-5">
                      {activeIdentity.name}
                    </span>
                    <span className="text-text-200 text-xs font-normal leading-normal">
                      {activeIdentity.address}
                    </span>
                  </div>
                }
              />
              <Separator />

              <Property
                label={f({
                  id: "bill.create.preview.details.placeOfPayment",
                  defaultMessage: "Place of payment",
                  description: "Place of payment property for bill card",
                })}
                value={placeOfPayment}
              />
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <Separator className="bg-divider-300" />
            <Separator className="bg-divider-300" />
            <Separator className="bg-divider-300" />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="bill.create.preview.details.noProtest"
                defaultMessage="No protest."
                description="No protest copy for bill card"
              />{" "}
              {getValues("invoice.file_upload_id") && (
                <FormattedMessage
                  id="bill.create.preview.details.valueReceived"
                  defaultMessage="Value received."
                  description="Value received label"
                />
              )}
            </span>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        size="md"
        onClick={() => {
          mutate();
        }}
      >
        <FormattedMessage
          id="bill.create.sign"
          defaultMessage="Sign"
          description="Sign bill creation button"
        />
      </Button>
    </div>
  );
}
