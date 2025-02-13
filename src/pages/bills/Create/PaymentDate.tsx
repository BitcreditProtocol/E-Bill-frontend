import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { useIntl } from "react-intl";
import { CalendarIcon } from "lucide-react";
import { DatePicker } from "@/components/DatePicker/datePicker";
import type { CreateBillFormSchema } from "./index";

const formSchema = z.object({
  date: z.string().nullable(),
});

export default function PaymentDate() {
  const { formatMessage: f } = useIntl();
  const { control, setValue } = useFormContext<CreateBillFormSchema>();
  const date = useWatch<CreateBillFormSchema, "payment.date">({
    control,
    name: "payment.date",
  });

  return (
    <DatePicker
      value={{ from: date ? parseISO(date) : undefined }}
      mode="single"
      customComponent={
        <div className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg cursor-pointer">
          <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />

          {date
            ? format(parseISO(date), "dd-MMM-yyyy")
            : f({
                id: "bills.create.payment.date",
                defaultMessage: "Date",
                description: "Payment date picker label",
              })}
        </div>
      }
      onChange={(e) => {
        setValue(
          "payment.date",
          e.from ? format(parseISO(e.from.toISOString()), "yyyy-MM-dd") : null
        );
      }}
    />
  );
}

PaymentDate.formSchema = formSchema;
