"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdownMenu"

interface DateRangeDropdownProps {
  onRangeChange: (range: number) => void;
}

export function DateRangeDropdown({ onRangeChange }: DateRangeDropdownProps) {
  const [selectedRange, setSelectedRange] = React.useState<number | null>(null);

  const handleRangeChanged = (value: string) => {
    const range = Number(value);
    setSelectedRange(Number(range));
    onRangeChange(range);
  }

  const handleDisplayRange = (value: number | null): string => {
    switch (value) {
      case 30:
      case 60:
      case 90:
        return `${value} days`
      case 180:
        return "6 Months"
      case 365:
        return "1 Year"
      default:
        return "Select range"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full flex items-start justify-start rounded-lg bg-[#f6f2e7]">
          {handleDisplayRange(selectedRange)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-[#f6f2e7]">
        <DropdownMenuLabel>Select Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={String(selectedRange)} onValueChange={handleRangeChanged}>
          <DropdownMenuRadioItem value="30">30 days</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="60">60 days</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="90">90 days</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="180">6 months</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="365">1 year</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
