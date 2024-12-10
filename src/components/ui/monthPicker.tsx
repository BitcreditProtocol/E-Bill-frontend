"use client"

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateShort, formatMonthLong } from "@/utils/dates";
import { useLanguage } from "@/context/language/LanguageContext";

interface YearPickerProps {
  baseDate: Date
  setDate: (date: Date) => void
  setShowYearPicker: (value: boolean) => void
  setShowMonthPicker: (value: boolean) => void
}

const MonthPicker = ({baseDate, setDate, setShowYearPicker, setShowMonthPicker }: YearPickerProps) => {   
  const lang = useLanguage();

  const handleMonthClick = (monthIndex: number) => {
    const newDate = new Date(baseDate);
    newDate.setMonth(monthIndex);
    setDate(newDate);
  };

  return(
    <div className="h-full w-full">
      <div className="flex justify-between items-center">
        <div>
          <ChevronLeft />
        </div>
        <div className="flex justify-between items-center gap-2">
          {formatDateShort(baseDate, lang.locale)}
          <ChevronDown strokeWidth={3} size={15} />
        </div>
        <div>
          <ChevronRight />
        </div>
      </div>
      <div className="h-full w-full grid grid-rows-4 grid-cols-3">
        {Array(12).fill('').map((_, index) => new Date(1970, index)).map((date, index) => (
          <div
            key={index}
            className="flex justify-center items-center cursor-pointer"
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
