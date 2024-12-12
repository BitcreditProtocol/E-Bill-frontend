"use client";

import { useIntl } from "react-intl";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface LocaleDropdownProps {
  value?: string
  values: string[]
  onChange: (locale: string) => void;
}

export function LocaleDropdown({ value, values, onChange }: LocaleDropdownProps) {
  const intl = useIntl();
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger id="localeInput" data-testid="localeInputTestId" label={intl.formatMessage({
          id: "Locale",
          defaultMessage: "Locale",
          description: "Title for locale dropdown"
        })} >
        <SelectValue placeholder={intl.formatMessage({
          id: "Select locale",
          defaultMessage: "Select locale",
          description: "Placeholder for locale dropdown"
        })} />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[10rem]">
          <SelectGroup>
            {values.map(it => {
              return (
                <SelectItem key={it} value={it}>
                  {/*<FormattedMessage
                    id={`locale.${it}`}
                    defaultMessage={it}
                    description={`Locale dropdown menu value for locale ${it}`}
                  />*/}
                  {it}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
