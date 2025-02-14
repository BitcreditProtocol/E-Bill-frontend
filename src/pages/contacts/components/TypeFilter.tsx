import { FormattedMessage } from "react-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Contact } from "@/types/contact";
import { ContactTypes } from "@/types/contact";

type TypeFilterProps = {
  values: Contact["type"][];
  multiple?: boolean;
  onChange: (values: Contact["type"][]) => void;
};

export default function TypeFilter({
  values,
  onChange,
  multiple = false,
}: TypeFilterProps) {
  const handleOnClick = (type: Contact["type"]) => {
    if (!multiple) {
      onChange([type]);
    } else {
      if (values.includes(type)) {
        onChange(values.filter((value) => value !== type));
      } else {
        onChange([...values, type]);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="filter"
        size="xs"
        className={cn({
          "!font-semibold border-text-300": values.includes(
            ContactTypes.Person
          ),
        })}
        onClick={() => {
          handleOnClick(ContactTypes.Person);
        }}
      >
        <FormattedMessage
          id="Person"
          defaultMessage="Person"
          description="Person contact type"
        />
      </Button>
      <Button
        variant="filter"
        size="xs"
        className={cn({
          "!font-semibold border-text-300": values.includes(
            ContactTypes.Company
          ),
        })}
        onClick={() => {
          handleOnClick(ContactTypes.Company);
        }}
      >
        <FormattedMessage
          id="Company"
          defaultMessage="Company"
          description="Company contact type"
        />
      </Button>
      {/* TODO: reenable (remove "hidden" class) after demo */}
      <Button variant="filter" size="xs" className={cn({
          "!font-semibold border-text-300": values.includes(ContactTypes.Mint)
        }, "hidden")}
        onClick={() => { handleOnClick(ContactTypes.Mint); }}
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
