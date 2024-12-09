import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ReceiptTextIcon } from "lucide-react";

import Bill from "@/components/Bill";
import routes from "@/constants/routes";

export default function Bills() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <span className="text-text-300 text-sm font-medium leading-5">
        <FormattedMessage
          id="Recent bills"
          defaultMessage="Recent bills"
          description="Recent bills section title for home page"
        />
      </span>

      <div className="flex flex-col gap-3">
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

          <Bill
            title="Hayek Ltd."
            date="12-Nov-24"
            amount={-3234.12001}
            currency="USD"
          />
        </div>

        <button
          className="flex items-center gap-1 bg-transparent text-brand-200 text-sm font-medium leading-5 mx-auto"
          onClick={() => {
            navigate(routes.BILLS);
          }}
        >
          <FormattedMessage
            id="See all bills"
            defaultMessage="See all bills"
            description="Button to view all bills"
          />

          <ReceiptTextIcon className="h-4 w-4 text-brand-200" strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}
