import { FormattedMessage } from "react-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Contact } from "@/types/contact";
import { ContactTypes } from "@/types/contact";

type TypeFilterProps = {
  value: Contact['type'];
  onChange: (type: Contact['type']) => void;
};

export default function TypeFilter({
  value,
  onChange,
}: TypeFilterProps) {
  return (
    <div className="flex gap-2">
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": value === ContactTypes.Person
        })}
        onClick={() => { onChange(ContactTypes.Person); }}
      >
        <FormattedMessage
          id="Person"
          defaultMessage="Person"
          description="Person contact type"
        />
      </Button>
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": value === ContactTypes.Company
        })}
        onClick={() => { onChange(ContactTypes.Company); }}
      >
        <FormattedMessage
          id="Company"
          defaultMessage="Company"
          description="Company contact type"
        />
      </Button>
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": value === ContactTypes.Mint
        })}
        onClick={() => { onChange(ContactTypes.Mint); }}
      >
        <FormattedMessage
          id="Mint"
          defaultMessage="Mint"
          description="Mint contact type"
        />
      </Button>
    </div>
  );
}
