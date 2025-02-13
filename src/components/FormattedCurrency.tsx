import { FormattedNumber, type FormatNumberOptions } from "react-intl";
import { cn } from "@/lib/utils";

const BITCOIN_CODE = "BTC";
const BITCOIN_NAME = "bitcoin";
const BITCOIN_SYMBOL = "₿";

export type FormattedCurrencyProps = {
  value: number;
  className?: string;
  color?: "auto" | "none";
  type?: "auto" | "credit" | "debit";
  currency?: FormatNumberOptions["currency"];
  currencyDisplay?: FormatNumberOptions["currencyDisplay"] | "none";
} & Pick<FormatNumberOptions, "signDisplay">;

const FormattedCurrency = ({
  value,
  className,
  color = "auto",
  type = "auto",
  currency,
  currencyDisplay = "symbol",
  signDisplay = "exceptZero",
}: FormattedCurrencyProps) => {
  return (
    <span
      className={cn(className, {
        "text-signal-success":
          color !== "none" &&
          (type === "credit" || (type === "auto" && value > 0)),
        "text-signal-error":
          color !== "none" &&
          (type === "debit" || (type === "auto" && value < 0)),
      })}
    >
      <FormattedNumber
        value={value}
        signDisplay={signDisplay}
        minimumFractionDigits={currency === BITCOIN_CODE ? 8 : 2}
        maximumFractionDigits={8}
        style={currency !== undefined ? "currency" : "decimal"}
        currency={currency}
        currencyDisplay={
          currency !== undefined && currencyDisplay !== "none"
            ? currencyDisplay
            : undefined
        }
      >
        {(formattedNumber: string) => {
          if (currency !== BITCOIN_CODE) {
            return <>{formattedNumber}</>;
          }
          switch (currencyDisplay) {
            case "name":
              return <>{formattedNumber.replace(BITCOIN_CODE, BITCOIN_NAME)}</>;
            case "symbol":
              return (
                <>{formattedNumber.replace(BITCOIN_CODE, BITCOIN_SYMBOL)}</>
              );
            case "none":
              return <>{formattedNumber.replace(BITCOIN_CODE, "")}</>;
            default:
              return <>{formattedNumber}</>;
          }
        }}
      </FormattedNumber>
    </span>
  );
};

FormattedCurrency.displayName = "FormattedCurrency";

export { FormattedCurrency };
