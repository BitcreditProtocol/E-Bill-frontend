import { cn } from "@/lib/utils";

import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";

export type SearchTypeFilterValue = "all" | "bills" | "companies" | "contacts";

export type SearchTypeFilterProps = {
  values: SearchTypeFilterValue[];
  multiple?: boolean;
  onChange: (values: SearchTypeFilterValue[]) => void;
  unionType?: SearchTypeFilterValue;
};

export default function SearchTypeFilter({ values, onChange, multiple = false, unionType = "all" }: SearchTypeFilterProps) {

  const handleOnClick = (type: SearchTypeFilterValue) => {
    if (!multiple) {
      onChange([type]);
    } else {
      if (values.includes(type)) {
        onChange(values.filter(value => value !== type));
      } else {
        onChange(type === unionType ? [type] : [...values.filter(value => value !== unionType), type]);
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": values.includes("all")
        })}
        onClick={() => { handleOnClick("all"); }}
      >
        <FormattedMessage
          id="All"
          defaultMessage="All"
          description="All filter type on home page"
        />
      </Button>
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": values.includes("companies")
        })}
        onClick={() => { handleOnClick("companies"); }}
      >
        <FormattedMessage
          id="Companies"
          defaultMessage="Companies"
          description="Companies filter type on home page"
        />
      </Button>
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": values.includes("bills")
        })}
        onClick={() => { handleOnClick("bills"); }}
      >
        <FormattedMessage
          id="Bills"
          defaultMessage="Bills"
          description="Bills filter type on home page"
        />
      </Button>
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": values.includes("contacts")
        })}
        onClick={() => { handleOnClick("contacts"); }}
      >
        <FormattedMessage
          id="Contacts"
          defaultMessage="Contacts"
          description="Contacts filter type on home page"
        />
      </Button>
    </div>
  );
}
