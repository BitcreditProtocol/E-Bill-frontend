import { LabelHTMLAttributes, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CalendarDaysIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import Big from "big.js";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language/LanguageContext";
import { parseFloatSafe, parseIntSafe } from "@/utils/numbers";
import { daysBetween, formatDate } from "@/utils/dates";
import { Button } from "../ui/button";
import { FormattedCurrency } from "../FormattedCurrency";
import { Act360 } from "./discount-util";

type InputContainerProps = PropsWithChildren<{
  htmlFor: LabelHTMLAttributes<HTMLLabelElement>['htmlFor'],
  label: React.ReactNode
 }>

const InputContainer = ({ children, htmlFor, label }: InputContainerProps) => {
  return (<div className={cn("flex gap-2 justify-between items-center font-semibold",
    "peer flex h-[58px] w-full rounded-[8px] border bg-elevation-200 px-4 text-sm transition-all duration-200 ease-in-out outline-none focus:outline-none",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-0",
  )}>
    <label htmlFor={htmlFor}>{label}</label>
    {children}
  </div>);
}

type CurrencyAmount = {
  value: Big
  currency: string
};


type CommonDiscountFormProps = {
  startDate?: Date
  endDate: Date
  onSubmit: (values: FormResult) => void
};

type NetToGrossProps = CommonDiscountFormProps & {
  currency: string
};

type GrossToNetProps = CommonDiscountFormProps & {
  gross: CurrencyAmount
};

export type DiscountFormProps = NetToGrossProps | GrossToNetProps;

type FormResult = {
  days: number
  discountRate: Big
  net: CurrencyAmount
  gross: CurrencyAmount
};

type FormValues = {
  daysInput?: string
  discountRateInput?: string
};

const DiscountForm = ({ startDate: userStartDate, endDate, ...props } : DiscountFormProps) => {
  const lang = useLanguage();
  const startDate = useMemo(() => userStartDate || new Date(Date.now()), [userStartDate]);

  return (<div className="flex flex-col gap-2 min-w-[8rem]">
    <h2 className="text-text-300 text-lg font-medium">
      <FormattedMessage
        id="Calculate discount"
        defaultMessage="Calculate discount"
        description="Title of discount form"
      />
    </h2>

    <div className="flex gap-1 text-xs">
      <div className="flex gap-1 text-text-200">
        <CalendarDaysIcon size={16} strokeWidth={1} />

        <FormattedMessage
          id="Dates"
          defaultMessage="Dates"
          description="Dates label in discount form"
        />
      </div>
      <div className="flex gap-1 text-text-300">
        <span>{formatDate(startDate, lang.locale)}</span>
        <span>to</span>
        <span>{formatDate(endDate, lang.locale)}</span>
      </div>
    </div>
    {'currency' in props ? (
      <NetToGrossDiscountForm startDate={startDate} endDate={endDate} { ...props } />
    ) : (
      <GrossToNetDiscountForm startDate={startDate} endDate={endDate} { ...props } />
    )}
  </div>);
};

DiscountForm.displayName = "DiscountForm";

const INPUT_DAYS_MIN_VALUE = 1;
const INPUT_DAYS_MAX_VALUE = 360;

type NetToGrossFormValues = FormValues & {
  netInput?: string
};

const NetToGrossDiscountForm = ({ startDate, endDate, currency, onSubmit } : NetToGrossProps) => {
  const intl = useIntl();

  const { watch, register, setValue, handleSubmit, formState: { isValid, errors }, } = useForm<NetToGrossFormValues>({
    mode: "all"
  });

  const { daysInput, discountRateInput, netInput } = watch();

  const days = useMemo<number | undefined>(() => {
    return parseIntSafe(daysInput);
  }, [daysInput]);

  const discountRate = useMemo<Big | undefined>(() => {
    const parsed = parseFloatSafe(discountRateInput);
    return parsed === undefined ? undefined : new Big(parsed).div(new Big("100"))
  }, [discountRateInput]);

  const net = useMemo<CurrencyAmount | undefined>(() => {
    const parsed = parseFloatSafe(netInput);
    return parsed === undefined ? undefined : {
      value: new Big(parsed),
      currency
    }
  }, [netInput, currency]);

  const [gross, setGross] = useState<CurrencyAmount>();

  const markUp = useMemo<CurrencyAmount | undefined>(() => {
    return net === undefined || gross === undefined ? undefined : {
      value: gross.value.sub(net.value),
      currency: net.currency
    }
  }, [gross, net]);

  useEffect(() => {
    if (startDate === undefined) return
    setValue("daysInput", String(Math.min(daysBetween(startDate, endDate), 100)), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [startDate, endDate, setValue]);

  useEffect(() => {
    if (!isValid || net === undefined || discountRate === undefined || days === undefined) {
      setGross(undefined);
      return;
    }

    const grossValue = Act360.netToGross(net.value, discountRate, days);
    setGross(grossValue === undefined ? undefined : {
      value: grossValue,
      currency: net.currency
    });
  }, [isValid, net, days, discountRate]);

  return (<form className="flex flex-col gap-2 min-w-[8rem]"
    onSubmit={(e) => {
      handleSubmit(() => {
        if (gross === undefined || net === undefined || discountRate === undefined || days === undefined) return;

        onSubmit({
          days,
          discountRate,
          net,
          gross,
        });
      })(e).catch(() => {
        // TODO
      })
    }}>
      <div className="flex flex-col">
        <InputContainer htmlFor="daysInput" label={
          <FormattedMessage
              id="Days"
              defaultMessage="Days"
              description="Days label in discount form"
          />}>
          <input
            id="daysInput"
            step="1"
            type="number"
            className="bg-transparent text-right focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            {...register("daysInput", {
              required: true,
              min: INPUT_DAYS_MIN_VALUE,
              max: INPUT_DAYS_MAX_VALUE,
            })}
          />
        </InputContainer>
        {errors.daysInput && (<div className="text-[10px] text-signal-error">
          {intl.formatMessage({
            id: "discountForm.daysInput.error.text",
            defaultMessage: "Please enter a valid value between {min} and {max}.",
            description: "Error message for field 'days' in discount form",
          }, {
            min: intl.formatNumber(INPUT_DAYS_MIN_VALUE),
            max: intl.formatNumber(INPUT_DAYS_MAX_VALUE),
          })}
        </div>)}
      </div>

      <div className="flex flex-col">
        <InputContainer htmlFor="discountRateInput" label={<FormattedMessage
            id="Discount rate"
            defaultMessage="Discount rate"
            description="Discount rate label in discount form"
          />}>
          <div>
            <input
              id="discountRateInput"
              step="0.0001"
              type="number"
              className="bg-transparent text-right focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...register("discountRateInput", {
                required: true,
                min: 0,
                max: 99.9999,
              })}
            />
            %
          </div>
        </InputContainer>
        {errors.discountRateInput && (<div className="text-[10px] text-signal-error">
          {intl.formatMessage({
            id: "discountForm.discountRate.error.text",
            defaultMessage: "Please enter a valid value between {min} and {max}.",
            description: "Error message for field 'discountRate' in discount form",
          }, {
            min: `${intl.formatNumber(0)}%`,
            max: `${intl.formatNumber(99.9999)}%`,
          })}
        </div>)}
      </div>

      <div className="flex flex-col">
        <InputContainer htmlFor="netInput" label={<FormattedMessage
            id="Net amount"
            defaultMessage="Net amount"
            description="Net amount label in discount form"
          />}>
          <div className="flex gap-1 items-center">
            <input
              id="netInput"
              type="number"
              step="any"
              className={cn("bg-transparent text-right focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", {
                "text-signal-success": net !== undefined && net.value.toNumber() > 0,
                "text-signal-error": net !== undefined && net.value.toNumber() < 0
              })}
              {...register("netInput", {
                required: true
              })}
            />
            <span className="font-medium text-[10px] text-text-200 leading-3">{currency}</span>
          </div>
        </InputContainer>
        {errors.netInput && (<div className="text-[10px] text-signal-error">
          {intl.formatMessage({
            id: "Please enter a valid value.",
            defaultMessage: "Please enter a valid value.",
            description: "Error message for field 'net' in discount form",
          })}
        </div>)}
      </div>

      <div className="mt-1 flex justify-between text-sm text-text-200 font-normal">
        <FormattedMessage
          id="Mark up"
          defaultMessage="Mark up"
          description="Mark up label in discount form"
        />

        <div className="flex gap-1 items-center">
          {markUp === undefined ? (<>?</>) : (<FormattedCurrency
            value={markUp.value.toNumber()}
            currency={markUp.currency}
            currencyDisplay="none"
            color="none"
          />)}
          <span className="text-[10px] text-text-200 leading-3">{markUp?.currency}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-md text-text-300 font-semibold">
        <FormattedMessage
          id="Gross amount"
          defaultMessage="Gross amount"
          description="Gross amount label in discount form"
        />

        <div className="flex gap-1 items-center">
          {gross === undefined ? (<>?</>) : (<FormattedCurrency
            value={gross.value.toNumber()}
            currency={gross.currency}
            currencyDisplay="none"
          />)}
          <span className="font-medium text-[10px] text-text-200 leading-3">{gross?.currency}</span>
        </div>
      </div>

      <Button type="submit" size="sm" className="my-[16px]" disabled={!isValid}>
        <FormattedMessage
          id="Confirm"
          defaultMessage="Confirm"
          description="Submit button in discount form"
        />
      </Button>
  </form>);
};

NetToGrossDiscountForm.displayName = "NetToGrossDiscountForm";

type GrossToNetFormValues = FormValues

const GrossToNetDiscountForm = ({ startDate, endDate, gross, onSubmit } : GrossToNetProps) => {
  const intl = useIntl();

  const { watch, register, setValue, handleSubmit, formState: { isValid, errors }, } = useForm<GrossToNetFormValues>({
    mode: "all"
  });

  const { daysInput, discountRateInput } = watch();

  const days = useMemo<number | undefined>(() => {
    return parseIntSafe(daysInput);
  }, [daysInput]);

  const discountRate = useMemo<Big | undefined>(() => {
    const parsed = parseFloatSafe(discountRateInput);
    return parsed === undefined ? undefined : new Big(parsed).div(new Big("100"))
  }, [discountRateInput]);

  const [net, setNet] = useState<CurrencyAmount>();

  const discount = useMemo<CurrencyAmount | undefined>(() => {
    return net === undefined ? undefined : {
      value: net.value.sub(gross.value),
      currency: net.currency
    }
  }, [gross, net]);

  useEffect(() => {
    if (startDate === undefined) return;
    setValue("daysInput", String(Math.min(daysBetween(startDate, endDate), 100)), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [startDate, endDate, setValue]);

  useEffect(() => {
    if (!isValid || discountRate === undefined || days === undefined) {
      setNet(undefined);
      return;
    }

    setNet({
      value: Act360.grossToNet(gross.value, discountRate, days),
      currency: gross.currency
    });
  }, [isValid, gross, days, discountRate]);

  return (<form className="flex flex-col gap-2 min-w-[8rem]"
    onSubmit={(e) => {
      handleSubmit(() => {
        if (net === undefined || discountRate === undefined || days === undefined) return;

        onSubmit({
          days,
          discountRate,
          net,
          gross,
        });
      })(e).catch(() => {
        // TODO
      })
    }}>
      <div className="flex flex-col">
        <InputContainer htmlFor="daysInput" label={
          <FormattedMessage
              id="Days"
              defaultMessage="Days"
              description="Days label in discount form"
          />}>
          <input
            id="daysInput"
            step="1"
            type="number"
            className="bg-transparent text-right focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            {...register("daysInput", {
              required: true,
              min: INPUT_DAYS_MIN_VALUE,
              max: INPUT_DAYS_MAX_VALUE,
            })}
          />
        </InputContainer>
        {errors.daysInput && (<div className="text-[10px] text-signal-error">
          {intl.formatMessage({
            id: "discountForm.daysInput.error.text",
            defaultMessage: "Please enter a valid value between {min} and {max}.",
            description: "Error message for field 'days' in discount form",
          }, {
            min: intl.formatNumber(INPUT_DAYS_MIN_VALUE),
            max: intl.formatNumber(INPUT_DAYS_MAX_VALUE),
          })}
        </div>)}
      </div>

      <div className="flex flex-col">
        <InputContainer htmlFor="discountRateInput" label={<FormattedMessage
            id="Discount rate"
            defaultMessage="Discount rate"
            description="Discount rate label in discount form"
          />}>
          <div className="flex gap-0.5">
            <input
              id="discountRateInput"
              step="0.0001"
              type="number"
              className="bg-transparent text-right focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...register("discountRateInput", {
                required: true,
                min: 0,
                max: 99.9999,
              })}
            />
            %
          </div>
        </InputContainer>
        {errors.discountRateInput && (<div className="text-[10px] text-signal-error">
          {intl.formatMessage({
            id: "discountForm.discountRate.error.text",
            defaultMessage: "Please enter a valid value between {min} and {max}.",
            description: "Error message for field 'discountRate' in discount form",
          }, {
            min: `${intl.formatNumber(0)}%`,
            max: `${intl.formatNumber(99.9999)}%`,
          })}
        </div>)}
      </div>

      <div className="mt-1 flex justify-between items-center text-sm text-text-200 font-medium">
        <FormattedMessage
          id="Gross amount"
          defaultMessage="Gross amount"
          description="Gross amount label in discount form"
        />

        <div className="flex gap-1 items-center">
          <FormattedCurrency
            value={gross.value.toNumber()}
            currency={gross.currency}
            currencyDisplay="none"
            color="none"
          />
          <span className="text-[10px] text-text-200 leading-3">{gross.currency}</span>
        </div>
      </div>

      <div className="flex justify-between text-sm text-text-200 font-medium">
        <FormattedMessage
          id="Discount"
          defaultMessage="Discount"
          description="Discount label in discount form"
        />

        <div className="flex gap-1 items-center">
          {discount === undefined ? (<>?</>) : (<FormattedCurrency
            value={discount.value.toNumber()}
            currency={discount.currency}
            currencyDisplay="none"
            color="none"
          />)}
          <span className="text-[10px] text-text-200 leading-3">{discount?.currency}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-md text-text-300 font-semibold">
        <FormattedMessage
          id="Net amount"
          defaultMessage="Net amount"
          description="Net amount label in discount form"
        />

        <div className="flex gap-1 items-center">
          {net === undefined ? (<>?</>) : (<FormattedCurrency
            value={net.value.toNumber()}
            currency={net.currency}
            currencyDisplay="none"
          />)}
          <span className="font-medium text-[10px] text-text-200 leading-3">{net?.currency}</span>
        </div>
      </div>

      <Button type="submit" size="sm" className="my-[16px]" disabled={!isValid}>
        <FormattedMessage
          id="Confirm"
          defaultMessage="Confirm"
          description="Submit button in discount form"
        />
      </Button>
  </form>);
};

GrossToNetDiscountForm.displayName = "GrossToNetDiscountForm";

export { DiscountForm, NetToGrossDiscountForm, GrossToNetDiscountForm };
