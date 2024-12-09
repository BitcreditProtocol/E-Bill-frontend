import Bill from "@/components/Bill";
import { FormattedMessage } from "react-intl";

export default function Bills() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-text-300 text-sm font-medium leading-5">
        <FormattedMessage
          id="Recent bills"
          defaultMessage="Recent bills"
          description="Recent bills section title for home page"
        />
      </span>

      <div className="flex flex-col gap-1.5">
        <Bill
          title="Hayek Ltd."
          date="12-Nov-24"
          amount={12.49002}
          currency="USD"
        />

        <Bill
          title="Hayek Ltd."
          date="12-Nov-24"
          amount={-3234.12001}
          currency="USD"
        />
      </div>
    </div>
  );
}
