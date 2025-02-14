import { FormattedMessage } from "react-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { NotificationActionType } from "@/types/notification";

type TypeFilterProps = {
  values: NotificationActionType[];
  multiple?: boolean;
  onChange: (values: NotificationActionType[]) => void;
};

export default function TypeFilter({
  values,
  onChange,
  multiple = false,
}: TypeFilterProps) {
  const handleOnClick = (type: NotificationActionType | undefined) => {
    if (type === undefined) {
      onChange([]);
    } else if (!multiple) {
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
        className={cn({
          "!font-semibold border-text-300": values.length === 0,
        })}
        onClick={() => {
          handleOnClick(undefined);
        }}
      >
        <FormattedMessage
          id="notifications.filter.all"
          defaultMessage="All"
          description="Filter to view all notifications"
        />
      </Button>
      <Button
        variant="filter"
        className={cn({
          "!font-semibold border-text-300": values.includes("PayBill"),
        })}
        onClick={() => {
          handleOnClick("PayBill");
        }}
      >
        <FormattedMessage
          id="notifications.filter.pay"
          defaultMessage="Pay"
          description="Filter to view pending pay notifications"
        />
      </Button>
      <Button
        variant="filter"
        className={cn({
          "!font-semibold border-text-300": values.includes("AcceptBill"),
        })}
        onClick={() => {
          handleOnClick("AcceptBill");
        }}
      >
        <FormattedMessage
          id="notifications.filter.accept"
          defaultMessage="Accept"
          description="Filter to view pending accept notifications"
        />
      </Button>
      {/* TODO: reenable (remove "hidden" class) after demo */}
      <Button variant="filter" className="hidden">
        <FormattedMessage
          id="notifications.filter.recourse"
          defaultMessage="Recourse"
          description="Filter to view pending recourse notifications"
        />
      </Button>
      <Button variant="filter" className="hidden">
        <FormattedMessage
          id="notifications.filter.check"
          defaultMessage="Check"
          description="Filter to view pending Check notifications"
        />
      </Button>
    </div>
  );
}
