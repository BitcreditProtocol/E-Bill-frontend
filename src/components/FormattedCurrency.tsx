import { FormattedNumber, type FormatNumberOptions } from "react-intl";
import { cn } from "@/lib/utils";

export type FormattedCurrencyProps = {
  value: number,
  className?: string,
  color?: "auto" | "none",
  type?: "auto" | "credit" | "debit",
  currency?: FormatNumberOptions['currency'] | "BTC"
} & Pick<FormatNumberOptions, 'signDisplay' | 'currencyDisplay'>

const FormattedCurrency = ({ value, className, color = "auto", type = "auto", currency, currencyDisplay = "symbol", signDisplay = "exceptZero" } : FormattedCurrencyProps) => {
  return (
    <span className={cn(className, {
        "text-signal-success": color !== "none" && (type === "credit" || (type === "auto" && value > 0)),
        "text-signal-error": color !== "none" && (type === "debit" || (type === "auto" && value < 0)),
      })}>
      <FormattedNumber
        value={value}
        signDisplay={signDisplay}
        minimumFractionDigits={currency === "BTC" ? 8 : 2}
        maximumFractionDigits={8}
        style={currency !== undefined ? "currency" : "decimal"}
        currency={currency}
        currencyDisplay={currency !== undefined ? currencyDisplay : undefined}
      />
    </span>
  )
};

FormattedCurrency.displayName = "FormattedCurrency";

export { FormattedCurrency };
