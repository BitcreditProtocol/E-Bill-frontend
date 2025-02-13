import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import Big from "big.js";
import { parseISO } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import { CalculatorIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DiscountForm } from "@/components/DiscountForm/DiscountForm";
import { useToast } from "@/hooks/use-toast";
import BitcoinIcon from "@/assets/bitcoin-icon.svg";
import { CreateBillFormSchema } from ".";

const formSchema = z.object({
  sum: z.number().min(1).nullable(),
  currency: z.string().min(1),
  discount: z
    .object({
      days: z.number(),
      rate: z.number(),
    })
    .nullable(),
});

function CalculateDiscount() {
  const [open, setOpen] = useState(false);
  const { formatMessage: f } = useIntl();
  const { control, watch, setValue } = useFormContext<CreateBillFormSchema>();
  const discount = useWatch<CreateBillFormSchema, "billing.discount">({
    control,
    name: "billing.discount",
  });

  const { toast } = useToast();

  return (
    <Drawer
      open={open}
      onOpenChange={() => {
        const requiredDates = [watch("issuance")?.date, watch("payment")?.date];

        if (requiredDates.some((date) => !date?.trim())) {
          toast({
            title: f({
              id: "bill.create.discount.missingDates",
              defaultMessage: "Error",
              description: "Missing dates toast title",
            }),
            description: f({
              id: "bill.create.discount.missingDates.description",
              defaultMessage: "Please fill in the issuance and payment dates",
              description: "Missing dates toast description",
            }),
            position: "bottom-center",
          });

          return;
        }

        setOpen((prev) => !prev);
      }}
    >
      <DrawerTrigger className="flex items-center gap-1">
        <CalculatorIcon className="text-text-300 h-4 w-4 stroke-1" />
        <span className="text-text-300 text-xs font-medium leading-normal">
          {discount ? (
            <>
              {discount.days} @ {discount.rate * 100}%
            </>
          ) : (
            <FormattedMessage
              id="bill.create.discount"
              defaultMessage="Calculate discount"
              description="Calculate discount button"
            />
          )}
        </span>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-6 pb-5 px-5 max-w-[375px] bg-elevation-50 mx-auto">
        <DiscountForm
          startDate={parseISO(
            watch("issuance.date") ?? new Date().toISOString()
          )}
          endDate={parseISO(watch("issuance.date") ?? new Date().toISOString())}
          onSubmit={(e) => {
            setValue(
              "billing.sum",
              Number(e.net.value.round(0, Big.roundDown))
            );

            setValue("billing.discount", {
              days: e.days,
              rate: e.discountRate.toNumber(),
            });

            setOpen(false);
          }}
          gross={{
            value: Big(watch("billing.sum") || 0),
            currency: "BTC",
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default function Amount() {
  const { control, register, setValue } =
    useFormContext<CreateBillFormSchema>();
  const billing = useWatch<CreateBillFormSchema, "billing">({
    control,
    name: "billing",
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-text-300 text-sm font-normal leading-5">
          <FormattedMessage
            id="bills.create.sumOf"
            defaultMessage="the sum of"
            description="Sum of label"
          />
        </span>

        <CalculateDiscount />
      </div>
      <div className="flex items-center gap-1.5 py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
        <img className="h-5 w-5" src={BitcoinIcon} />
        <span className="text-text-300 text-sm font-medium leading-5 mr-auto">
          {billing.currency}
        </span>

        <input
          {...register("billing.sum", {
            valueAsNumber: true,
            validate: (value) =>
              Number.isInteger(value) || "Sum must be an non-negative integer",
          })}
          className="bg-transparent text-right outline-none"
          type="text"
          onChange={(e) => {
            const sanitizedValue = e.target.value.replace(/\D/g, "");
            e.target.value = sanitizedValue;

            if (!sanitizedValue || sanitizedValue === "") {
              setValue("billing.sum", 0);
              return;
            }

            setValue("billing.sum", parseInt(sanitizedValue, 10) || 0);
          }}
        />

        <span className="text-text-200 text-[10px] font-normal leading-snug">
          {billing.currency}
        </span>
      </div>
    </div>
  );
}

Amount.formSchema = formSchema;
