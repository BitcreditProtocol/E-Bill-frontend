"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/language/LanguageContext";
import { formatDateLong } from "@/utils/dates";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

interface YearPickerProps {
    baseDate: Date
    setDate: (date: Date) => void
    setShowYearPicker: (value: boolean) => void
    setShowMonthPicker: (value: boolean) => void
}

const YearPicker = ({baseDate, setDate, setShowYearPicker, setShowMonthPicker }: YearPickerProps) => {
  const lang = useLanguage();
  const numberYears = 21;
  const [baseYear, setBaseYear] = useState(baseDate.getFullYear())

  const handleYearClick = (year: number) => {
    const updateDate = new Date(baseDate);
    updateDate.setFullYear(year);
    setDate(updateDate);
  }

  return (<div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <ChevronLeft className="mx-1 cursor-pointer" onClick={() => {
        setBaseYear(baseYear - numberYears);
      }} />
      <div className="flex justify-between items-center gap-2 cursor-pointer" onClick={() => {
        setShowYearPicker(false);
        setShowMonthPicker(false);
      }}>
        {formatDateLong(baseDate, lang.locale)}
        <ChevronUp strokeWidth={3} size={15} />
      </div>
      <ChevronRight className="mx-1 cursor-pointer" onClick={() => {
        setBaseYear(baseYear + numberYears);
      }} />
    </div>
    <div className="grid grid-rows-7 grid-cols-3">
      {Array(numberYears).fill('').map((_, index) => new Date(baseYear + index, 0)).map((date, index) => {
        return (
          <div
            className={cn("h-[42px] flex justify-center items-center cursor-pointer", buttonVariants({ variant: "ghost" }), {
              "bg-elevation-200 hover:bg-elevation-200 border-[1px] border-divider-100": date.getFullYear() === baseDate.getFullYear()
            })}
            key={index}
            onClick={() => {
              handleYearClick(date.getFullYear());
              setShowYearPicker(false);
              setShowMonthPicker(true);
            }}
          >
            {date.getFullYear()}
          </div>
        )
      })}
    </div>
  </div>);
}

export { YearPicker }
