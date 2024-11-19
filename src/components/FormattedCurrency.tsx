import { FormattedNumber } from "react-intl";
import { cn } from "@/lib/utils";

export type FormattedCurrencyProps = {
  value: number,
  className?: string,
  color?: "auto" | "red" | "green" | "none",
};

const FormattedCurrency = ({ value, className, color = "auto" } : FormattedCurrencyProps) => {
  return (
    <span className={cn(className, {
        "text-signal-success": color === "green" || (color === "auto" && value > 0),
        "text-signal-error": color === "red" || (color === "auto" && value < 0),
      })}>
      <FormattedNumber value={value} 
        signDisplay="exceptZero"
        minimumFractionDigits={2}
        maximumFractionDigits={8} />
    </span>
  )
};

FormattedCurrency.displayName = "FormattedCurrency";

export { FormattedCurrency };
