import { FormattedNumber } from "react-intl";
import { cn } from "@/lib/utils";

export type FormattedCurrencyProps = {
  value: number,
  className?: string,
};

const FormattedCurrency = ({ value, className } : FormattedCurrencyProps) => {
  return (
    <span className={cn(className, {
        "text-signal-success": value > 0,
        "text-signal-error": value < 0,
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
