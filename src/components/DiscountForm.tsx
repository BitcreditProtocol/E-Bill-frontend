import { useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CalendarDaysIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormattedCurrency } from "./FormattedCurrency";
import { Controller, useForm } from "react-hook-form";
import { daysBetween, Act360 } from "./discount-util";
import Big from "big.js";

export type DiscountFormProps = {
  startDate?: Date
  endDate: Date
  currency?: string
  onSubmit: (values: FormResult) => void
};

type CurrencyAmount = {
  value: number
  currency: string
};

type FormResult = {
  days: number
  discountRate: number
  net: CurrencyAmount
  gross: CurrencyAmount
};


type FormValues = {
  days?: number
  discountRate?: number
  netAmount?: number
};

const DiscountForm = ({ startDate: userStartDate, endDate, currency = "BTC", onSubmit } : DiscountFormProps) => {
  const intl = useIntl();
  const startDate = useMemo(() => userStartDate || new Date(Date.now()), [userStartDate])

  const { control, watch, register, setValue, handleSubmit, formState: { errors }, } = useForm<FormValues>({
    defaultValues: {
      days: daysBetween(startDate, endDate),
      discountRate: undefined,
      netAmount: undefined
    }
  });

  const { days, discountRate, netAmount } = watch();
  const [gross, setGross] = useState<CurrencyAmount>();
  const net = useMemo<CurrencyAmount | undefined>(() => {
    return netAmount === undefined || isNaN(netAmount) ? undefined : {
      value: netAmount,
      currency
    }
  }, [netAmount, currency]);

  const markUp = useMemo<CurrencyAmount | undefined>(() => {
    return net === undefined || gross === undefined ? undefined : {
      value: gross.value - net.value,
      currency: net.currency
    }
  }, [gross, net]);

  useEffect(() => {
    setValue("days", daysBetween(startDate, endDate), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [startDate, endDate, setValue]);

  useEffect(() => {
    if (net === undefined || discountRate === undefined || days === undefined) {
      setGross(undefined);
      return;
    }

    const grossValue = Act360.netToGross(new Big(net.value), new Big(discountRate).div(100), days);
    setGross({
      value: grossValue.toNumber(),
      currency: net.currency
    });
  }, [net, days, discountRate]);

  return (<form className="flex flex-col gap-1 min-w-[8rem]"
    onSubmit={(e) => {
      handleSubmit((values) => {
        if (gross === undefined || net === undefined || values.discountRate === undefined || values.days === undefined) return;

        onSubmit({
          days: values.days,
          discountRate: values.discountRate,
          net,
          gross,
        });
      })(e).catch(() => {
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
        <Input id="days" type="number" step="1"
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
        <Input id="discountRate" type="number" step="0.01"
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
              id="netAmount"
              step={currency === "BTC" ? 8 : 2}
              onChange={(e) => { field.onChange(parseFloat(e.target.value))}}
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
          {markUp === undefined ? (<>?</>) : (<FormattedCurrency
            value={markUp.value}
            currency={markUp.currency}
            currencyDisplay="none"
            color="none"
          />)}
          <span className="text-xxs text-text-200 leading-3">{markUp?.currency}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-md text-text-300 font-medium">
        <FormattedMessage
          id="Gross amount"
          defaultMessage="Gross amount"
          description="Gross amount label in discount form"
        />

        <div className="flex gap-1 items-center">
          {gross === undefined ? (<>?</>) : (<FormattedCurrency
            value={gross.value}
            currency={gross.currency}
            currencyDisplay="none"
          />)}
          <span className="text-xxs text-text-200 leading-3">{gross?.currency}</span>
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
