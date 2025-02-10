import { useState } from "react";
import { useIntl } from "react-intl";
import { BanknoteIcon } from "lucide-react";
import MenuOption from "./MenuOption";
import CurrencySelector from "@/components/CurrencySelector";

export default function DisplayCurrency() {
  const intl = useIntl();
  const [currency, setCurrency] = useState("SAT");

  return (
    <CurrencySelector
      value={currency}
      onChange={(currency) => { setCurrency(currency); }}
    >
      <MenuOption
        icon={<BanknoteIcon className="text-text-300 h-6 w-6 stroke-1" />}
        label={intl.formatMessage({
          id: "settings.displayCurrency",
          defaultMessage: "Display currency",
        })}
        defaultValue={currency}
      />
    </CurrencySelector>
  );
}
