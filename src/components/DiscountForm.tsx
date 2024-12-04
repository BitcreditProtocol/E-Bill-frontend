import { useEffect, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CalendarDaysIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormattedCurrency } from "./FormattedCurrency";
import { Controller, useForm } from "react-hook-form";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1_000;

const daysBetween = (startDate: Date, endDate: Date): number => {
  const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  return Math.round((start - end) / MILLISECONDS_PER_DAY);
};

export type DiscountFormProps = {
  startDate?: Date
  endDate: Date
  onSubmit: (values: FormValues) => void
};

type CurrencyAmount = {
  value?: number
  currency: string
};

type FormValues = {
  startDate: Date
  endDate: Date
  days: number
  discountRate: number
  markUp: CurrencyAmount
  netAmount: CurrencyAmount
  grossAmount: CurrencyAmount
};

const DiscountForm = ({ startDate: userStartDate, endDate, onSubmit } : DiscountFormProps) => {
  const intl = useIntl();
  const startDate = useMemo(() => userStartDate || new Date(Date.now()), [userStartDate])

  const { control, watch, register, setValue, handleSubmit, formState: { errors }, } = useForm<FormValues>({
    defaultValues: {
      days: daysBetween(startDate, endDate),
      discountRate: undefined,
      netAmount: {
        value: undefined,
        currency: "BTC"
      },
      markUp: {
        value: undefined,
        currency: "BTC"
      },
      grossAmount: {
        value: undefined,
        currency: "BTC"
      }
    }
  });

  const { days, discountRate, netAmount, markUp, grossAmount } = watch();

  useEffect(() => {
    setValue("days", daysBetween(startDate, endDate), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [startDate, endDate, setValue]);

  useEffect(() => {
    if (netAmount.value === undefined) return;
    // gross_amount = (t1-t0)/365*e^i * net_amount
    const grossValue = (days / 365) * Math.pow(Math.E, 1 + (discountRate / 100)) * netAmount.value
    // const grossValue = Math.pow(Math.E, (1 + discountRate / 100) * (days / 365)) * netAmount.value

    setValue("grossAmount", {
      value: grossValue,
      currency: "BTC"
    });
  }, [days, discountRate, netAmount, setValue]);

  useEffect(() => {
    if (netAmount.value === undefined ||
        grossAmount.value === undefined
    ) return;
    
    const markUpValue = grossAmount.value - netAmount.value;

    setValue("markUp", {
      value: markUpValue,
      currency: "BTC"
    });
  }, [grossAmount, netAmount, setValue]);

  return (<form className="flex flex-col gap-1 min-w-[8rem]"
    onSubmit={(e) => {
      handleSubmit(onSubmit)(e).catch(() => {
        // TODO
      })
    }}>
      <h2 className="text-text-300 text-lg font-medium">
        <FormattedMessage
          id="Calculate discount"
          defaultMessage="Calculate discount"
          description="Title of discount form"
        />
      </h2>

      <div className="flex gap-1 text-xs py-[4px]">
        <div className="flex gap-1 text-text-200">
          <CalendarDaysIcon size={16} strokeWidth={1} />

          <FormattedMessage
            id="Dates"
            defaultMessage="Dates"
            description="Dates label in discount form"
          />
        </div>
        <div className="flex gap-1 text-text-300">
          <span>{startDate.toDateString()}</span>
          <span>to</span>
          <span>{endDate.toDateString()}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <Input id="days" type="number"
          label={intl.formatMessage({
            id: "Days",
            defaultMessage: "Days",
            description: "Days label in discount form",
          })}
          {...register("days", { 
            required: true,
            min: 0,
          })}
          />
          {errors.days && (<span className="text-xxs text-signal-error">
            <FormattedMessage
              id="Please enter a valid value."
              defaultMessage="Please enter a valid value."
              description="Error message for field 'days' in discount form"
            />
          </span>)}
      </div>

      <div className="flex flex-col">
        <Input id="discountRate" type="number"
          label={intl.formatMessage({
            id: "Discount rate",
            defaultMessage: "Discount rate",
            description: "Discount rate label in discount form",
          })}
          {...register("discountRate", { 
            required: true,
            min: 0,
            max: 100,
          })}
          />
          {errors.discountRate && (<span className="text-xxs text-signal-error">
            <FormattedMessage
              id="Please enter a valid value."
              defaultMessage="Please enter a valid value."
              description="Error message for field 'discountRate' in discount form"
            />
          </span>)}
      </div>

      <div>
        <Controller
          name="netAmount"
          control={control}
          render={({ field }) => (
            <Input
              onChange={(e) => { field.onChange({
                value: e.target.value ? Number(e.target.value) : undefined,
                currency: "BTC"
              })}}
              label={intl.formatMessage({
                id: "Net amount",
                defaultMessage: "Net amount",
                description: "Net amount label in discount form",
              })} />
          )}
        />
      </div>

      <div className="flex justify-between text-sm text-text-200 font-normal">
        <FormattedMessage
          id="Mark up"
          defaultMessage="Mark up"
          description="Mark up label in discount form"
        />

        <div className="flex gap-1 items-center">
          {markUp.value === undefined ? (<>?</>) : (<FormattedCurrency
            value={markUp.value}
            currency={markUp.currency}
            currencyDisplay="none"
            color="none"
          />)}
          <span className="text-xxs text-text-200 leading-3">{markUp.currency}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-md text-text-300 font-medium">
        <FormattedMessage
          id="Gross amount"
          defaultMessage="Gross amount"
          description="Gross amount label in discount form"
        />

        <div className="flex gap-1 items-center">
          {grossAmount.value === undefined ? (<>?</>) : (<FormattedCurrency
            value={grossAmount.value}
            currency={grossAmount.currency}
            currencyDisplay="none"
          />)}
          <span className="text-xxs text-text-200 leading-3">{grossAmount.currency}</span>
        </div>
      </div>

      <Button type="submit" size="xs" className="my-[16px]">
        <FormattedMessage
          id="Confirm"
          defaultMessage="Confirm"
          description="Submit button in discount form"
        />
      </Button>
  </form>);
};

DiscountForm.displayName = "DiscountForm";

export { DiscountForm };
