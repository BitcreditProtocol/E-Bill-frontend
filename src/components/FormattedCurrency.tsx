import { FormattedNumber, type FormatNumberOptions } from "react-intl";
import { cn } from "@/lib/utils";

export type FormattedCurrencyProps = {
  value: number,
  className?: string,
  color?: "auto" | "none",
  type?: "auto" | "credit" | "debit",
} & Pick<FormatNumberOptions, 'signDisplay'>

const FormattedCurrency = ({ value, className, color = "auto", type = "auto", signDisplay = "exceptZero" } : FormattedCurrencyProps) => {
  return (
    <span className={cn(className, {
        "text-signal-success": color !== "none" && (type === "credit" || (type === "auto" && value > 0)),
        "text-signal-error": color !== "none" && (type === "debit" || (type === "auto" && value < 0)),
      })}>
      <FormattedNumber value={value} 
        signDisplay={signDisplay}
        minimumFractionDigits={2}
        maximumFractionDigits={8} />
    </span>
  )
};

FormattedCurrency.displayName = "FormattedCurrency";

export { FormattedCurrency };
