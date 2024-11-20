import { CalendarDaysIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { getDates } from "@/utils/getDates";
import { Input } from "./input";
import { Button } from "./button";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { getCouponInfo } from "@/utils/getCouponInfo";

interface DiscountFormInputs {
  days: number;
  discountRate: string;
  netAmount: string;
  sum: string;
}

export const DiscountCoupon = ({ type }: { type: boolean }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<DiscountFormInputs>({
    defaultValues: {
      days: 30,
      discountRate: "",
      netAmount: "",
    },
  });
  const { days, discountRate, netAmount, sum } = watch();
  const { formattedToday, formattedFutureDate } = getDates(days);
  const { calculatedValue, setIsGross, isGross, markup, grossAmount } =
    getCouponInfo(days, discountRate, netAmount, sum, type);
  const onSubmit = (data: DiscountFormInputs) => {
    console.log(data);
  };
  return (
    <div className="absolute bg-elevation-50 bottom-0 p-6 w-[375px] rounded-t-xl">
      <div>
        <h1 className="font-medium">Calculate discount</h1>
        {type && (
          <p className="text-text-200 text-[12px] flex gap-1 items-center py-2">
            <CalendarDaysIcon strokeWidth={1.3} size={16} /> Dates{" "}
            {formattedToday}/{formattedFutureDate}
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {/* Dropdown */}
        <Controller
          control={control}
          name="days"
          render={({ field }) => (
            <Select required onValueChange={(e) => field.onChange(e)}>
              <SelectTrigger className="bg-[#F6F2E7] rounded-[8px] px-4 py-6 font-medium border-solid border-1 border-divider-50 my-2">
                <SelectValue placeholder="Select Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="60">60 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="120">120 Days</SelectItem>
                <SelectItem value="150">150 Days</SelectItem>
                <SelectItem value="180">180 Days</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {!type && (
          <p className="text-text-200 text-[12px] flex gap-1 items-center py-2">
            <CalendarDaysIcon strokeWidth={1.3} size={16} /> Dates{" "}
            {formattedToday}/{formattedFutureDate}
          </p>
        )}
        {/* Discount Input */}
        <div className="flex items-center gap-1 bg-[#F6F2E7] rounded-[8px] pl-4 border-solid border-1 border-divider-50 my-2">
          <label htmlFor="discountRate" className="text-sm font-medium w-1/2">
            Discount Rate
          </label>
          <Controller
            control={control}
            name="discountRate"
            rules={{
              required: "Discount rate is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter numbers only",
              },
              min: {
                value: 0,
                message: "Discount rate cannot be less than 0",
              },
              max: {
                value: 100,
                message: "Discount rate cannot be more than 100",
              },
            }}
            render={({ field }) => (
              <div className="flex items-center w-full">
                <Input
                  id="discountRate"
                  placeholder="Discount"
                  type="text" // Set to text for numeric-only validation
                  {...field}
                  className="bg-transparent border-none font-medium text-right outline-none w-full pr-0"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      /^(\d+\.?\d*|\.\d+)$/.test(value) &&
                      Number(value) >= 0 &&
                      Number(value) <= 100
                    ) {
                      field.onChange(value); // Update only if value is numeric and within range
                    }
                  }}
                />
                <span className="text-sm font-medium pr-4">%</span>
              </div>
            )}
          />
        </div>
        {errors.discountRate?.type !== "required" && (
          <p className="text-signal-error text-sm px-1">
            {errors.discountRate?.message}
          </p>
        )}
        {/* Net Amount Input */}
        {type && (
          <div>
            <div className="flex items-center gap-1 bg-[#F6F2E7] rounded-[8px] outline-none px-4 border-solid border-1 border-divider-50 my-2">
              <label htmlFor="netAmount" className="text-sm font-medium w-1/2">
                Net Amount
              </label>
              <Controller
                control={control}
                name="netAmount"
                rules={{
                  required: "Net amount is required",
                  pattern: {
                    value: /^-?[0-9]*$/, // Accepts optional '-' at the beginning
                    message: "Please enter valid numbers",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="netAmount"
                    placeholder="Net Amount"
                    type="text" // Set to text for numeric-only validation with optional minus
                    {...field}
                    className="bg-transparent border-none font-medium text-signal-error text-right outline-none w-full pr-0"
                    onChange={(e) => {
                      const value = e.target.value.slice(1);
                      // Allow empty, numbers, and optional minus sign at the start
                      if (/^-?[0-9]*$/.test(value)) {
                        field.onChange(`-${value}`); // Update the field with valid input
                      }
                    }}
                  />
                )}
              />
              <p className="font-normal text-text-200 text-[10px]">BTC</p>
            </div>
            {errors.netAmount?.type !== "required" && (
              <p className="text-signal-error text-sm px-1">
                {errors.netAmount?.message}
              </p>
            )}
          </div>
        )}
        {/* Markup */}
        {type && (
          <div className="flex justify-between items-center my-2">
            <p className="text-sm text-text-200">Mark up</p>
            <div className="flex items-center">
              <p className="text-[12px] text-text-200 font-medium pr-2">
                {markup && `${markup}`}
              </p>
              <p className="font-normal text-text-200 text-[10px] pr-4">BTC</p>
            </div>
          </div>
        )}
        {/* Gross Amount */}
        {type && (
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold">Gross amount</p>
            <div className="flex items-center">
              <p className="text-[16px] text-signal-error pr-2 font-semibold">
                {grossAmount && `-${grossAmount}`}
              </p>
              <p className="text-text-200 text-[10px] pr-4 font-normal">BTC</p>
            </div>
          </div>
        )}
        {/* Discount Amount */}
        {!type && (
          <div className="flex justify-between items-center my-2">
            <p className="text-sm text-text-200">Discount</p>
            <div className="flex items-center">
              <p className="text-[12px] text-text-200 font-medium pr-2">
                {markup && `-${markup}`}
              </p>
              <p className="font-normal text-text-200 text-[10px] pr-4">BTC</p>
            </div>
          </div>
        )}
        {/* Discount Input */}
        {!type && (
          <div>
            <div className="flex items-center gap-1 bg-[#F6F2E7] rounded-[8px] outline-none px-4 border-solid border-1 border-divider-50 my-2">
              <label htmlFor="sum" className="text-sm font-medium w-2/3">
                Against the sum of
              </label>
              <Controller
                control={control}
                name="sum"
                rules={{
                  required: "Sum amount is required",
                  pattern: {
                    value: /^\+?[0-9]*$/, // Accepts optional '+' at the beginning
                    message: "Please enter valid numbers",
                  },
                  min: {
                    value: 0,
                    message: "Sum amount cannot be less than 0",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="sum"
                    placeholder="Amount"
                    type="text" // Set to text for numeric-only validation
                    {...field}
                    className="bg-transparent border-none font-medium text-signal-success text-right outline-none w-1/3 pr-0"
                    onChange={(e) => {
                      const value = e.target.value.slice(1);
                      // Allow empty, numbers, and optional '+' at the start
                      if (/^\+?[0-9]*$/.test(value)) {
                        field.onChange(`+${value}`); // Update the field with valid input
                      }
                    }}
                  />
                )}
              />
              <p className="font-normal text-text-200 text-[10px]">BTC</p>
            </div>
            {errors.sum?.type !== "required" && (
              <p className="text-signal-error text-sm px-1">
                {errors.sum?.message}
              </p>
            )}
          </div>
        )}
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-foreground mt-6 rounded-[8px]"
        >
          Confirm
        </Button>
      </form>
    </div>
  );
};
