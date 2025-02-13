import { cn } from "@/lib/utils";

import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { SearchItemType } from "@/services/search";

export type SearchTypeFilterProps = {
  values: SearchItemType[];
  onChange: (values: SearchItemType[]) => void;
};

export default function SearchTypeFilter({ values, onChange }: SearchTypeFilterProps) {
  const handleOnClick = (type: SearchItemType | undefined) => {
    if (type === undefined) {
      onChange([]);
    } else {
        onChange(values.includes(type) ? values.filter(value => value !== type) : [...values, type]);
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": values.length === 0
        })}
        onClick={() => { handleOnClick(undefined); }}
      >
        <FormattedMessage
          id="home.search.filter.all.label"
          defaultMessage="All"
          description="All filter type on home page"
        />
      </Button>
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": values.includes("Company")
        })}
        onClick={() => { handleOnClick("Company"); }}
      >
        <FormattedMessage
          id="home.search.filter.company.label"
          defaultMessage="Companies"
          description="Companies filter type on home page"
        />
      </Button>
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": values.includes("Bill")
        })}
        onClick={() => { handleOnClick("Bill"); }}
      >
        <FormattedMessage
          id="home.search.filter.bill.label"
          defaultMessage="Bills"
          description="Bills filter type on home page"
        />
      </Button>
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": values.includes("Contact")
        })}
        onClick={() => { handleOnClick("Contact"); }}
      >
        <FormattedMessage
          id="home.search.filter.contact.label"
          defaultMessage="Contacts"
          description="Contacts filter type on home page"
        />
      </Button>
    </div>
  );
}
