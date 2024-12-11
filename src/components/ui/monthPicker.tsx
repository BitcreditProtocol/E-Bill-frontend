"use client"

import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { formatDateShort, formatMonthLong } from "@/utils/dates";
import { useLanguage } from "@/context/language/LanguageContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

interface YearPickerProps {
  baseDate: Date
  setDate: (date: Date) => void
  setShowYearPicker: (value: boolean) => void
  setShowMonthPicker: (value: boolean) => void
}

const MonthPicker = ({baseDate, setDate, setShowYearPicker, setShowMonthPicker }: YearPickerProps) => {   
  const lang = useLanguage();

  const [baseYear, setBaseYear] = useState(baseDate.getFullYear())

  const handleMonthClick = (monthIndex: number) => {
    const newDate = new Date(baseDate);
    newDate.setMonth(monthIndex);
    setDate(newDate);
  };

  return(
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <ChevronLeft className="mx-1 cursor-pointer" onClick={() => {
          setBaseYear(baseYear - 1);
        }} />
        <div className="flex justify-between items-center gap-2 cursor-pointer" onClick={() => {
          setShowYearPicker(false);
          setShowMonthPicker(false);
        }}>
          {formatDateShort(baseDate, lang.locale)}
          <ChevronUp strokeWidth={3} size={15} />
        </div>
        <ChevronRight className="mx-1 cursor-pointer" onClick={() => {
          setBaseYear(baseYear + 1);
        }} />
      </div>
      <div className="grid grid-rows-4 grid-cols-3">
        {Array(12).fill('').map((_, index) => new Date(baseYear, index)).map((date, index) => (
          <div
            key={index}
            className={cn("h-[42px] flex justify-center items-center cursor-pointer", buttonVariants({ variant: "ghost" }), {
              "bg-elevation-200 hover:bg-elevation-200 border-[1px] border-divider-100": date.getMonth() === baseDate.getMonth()
            })}
            onClick={() => {
              handleMonthClick(index)
              setShowMonthPicker(false);
              setShowYearPicker(false);
            }}
          >
            {formatMonthLong(date, lang.locale)}
          </div>
        ))}
      </div>
    </div>
  );
}

export { MonthPicker }
