"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdownMenu";
import { useIntl } from "react-intl";

interface DateRangeDropdownProps {
  value?: number
  onRangeChange: (range: number) => void;
}

export function DateRangeDropdown({ value, onRangeChange }: DateRangeDropdownProps) {
  const intl = useIntl(); 

  const handleRangeChanged = (value: string) => {
    const range = Number(value);
    onRangeChange(range);
  };

  const handleDisplayRange = (value: number | undefined): string => {
    switch (value) {
      case 30:
      case 60:
      case 90:
        return intl.formatMessage(
          { id: "displayRange.days", defaultMessage: "{value} days" },
          { value }
        );
      case 180:
        return intl.formatMessage({
          id: "displayRange.sixMonths",
          defaultMessage: "6 Months",
        });
      case 365:
        return intl.formatMessage({
          id: "displayRange.oneYear",
          defaultMessage: "1 Year",
        });
      default:
        return intl.formatMessage({
          id: "displayRange.selectRange",
          defaultMessage: "Select range",
        });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full rounded-lg bg-[#f6f2e7] justify-start py-3 px-4"
        >
          {handleDisplayRange(value)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-[#f6f2e7]">
        <DropdownMenuLabel>Select Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={String(value)}
          onValueChange={handleRangeChanged}
        >
          <DropdownMenuRadioItem value="30">
            {intl.formatMessage({ id: 'dropdown.option.30days', defaultMessage: "30 days" })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="60">
            {intl.formatMessage({ id: 'dropdown.option.60days', defaultMessage: "60 days" })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="90">
            {intl.formatMessage({ id: 'dropdown.option.90days', defaultMessage: "90 days" })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="180">
            {intl.formatMessage({ id: 'dropdown.option.6months', defaultMessage: "6 Months" })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="365">
            {intl.formatMessage({ id: 'dropdown.option.1year', defaultMessage: "1 year" })}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
