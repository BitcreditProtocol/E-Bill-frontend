"use client"

import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { formatMonthLong, formatMonthYear } from "@/utils/dates";
import { useLanguage } from "@/context/language/LanguageContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button"; 

interface MonthPickerProps {
  value: Date
  onChange: (date: Date) => void
  onCaptionLabelClicked: () => void
}

const MonthPicker = ({ value, onChange, onCaptionLabelClicked }: MonthPickerProps) => {   
  const lang = useLanguage();

  const [base, setBase] = useState(value)

  const handleOnChange = (monthIndex: number) => {
    const newDate = new Date(base);
    newDate.setMonth(monthIndex);
    onChange(newDate);
  };

  const addYears = (years: number) => {
    setBase((val) => {
      const newVal = new Date(val);
      newVal.setFullYear(val.getFullYear() + years);
      return newVal;
    });
  };
  const nextYear = () => {
    addYears(1);
  };
  const prevYear = () => {
    addYears(-1);
  };

  return(
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <ChevronLeft className="mx-1 cursor-pointer" onClick={() => { prevYear() }} />
        <div className="flex justify-between items-center gap-2 cursor-pointer" onClick={() => {
          onCaptionLabelClicked();
        }}>
          {formatMonthYear(base, lang.locale)}
          <ChevronUp strokeWidth={3} size={15} />
        </div>
        <ChevronRight className="mx-1 cursor-pointer" onClick={() => { nextYear() }} />
      </div>
      <div className="grid grid-rows-4 grid-cols-3">
        {Array(12).fill('').map((_, index) => new Date(base.getFullYear(), index)).map((date, index) => (
          <div
            key={index}
            className={cn("h-[42px] flex justify-center items-center cursor-pointer", buttonVariants({ variant: "ghost" }), {
              "bg-elevation-200 hover:bg-elevation-200 border-[1px] border-divider-100": date.getMonth() === value.getMonth()
            })}
            onClick={() => {
              handleOnChange(index);
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
