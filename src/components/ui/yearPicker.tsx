"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/language/LanguageContext";
import { formatYearNumeric } from "@/utils/dates";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

interface YearPickerProps {
    value: Date
    onChange: (date: Date) => void
    onCaptionLabelClicked: () => void
    numberYears?: number
}

const YearPicker = ({ value, onChange, onCaptionLabelClicked, numberYears = 21 }: YearPickerProps) => {
  const lang = useLanguage();
  const [base, setBase] = useState(value)

  const handleOnChange = (year: number) => {
    const updateDate = new Date(value);
    updateDate.setFullYear(year);
    onChange(updateDate);
  }

  const addYears = (years: number) => {
    setBase((val) => {
      const newVal = new Date(val);
      newVal.setFullYear(val.getFullYear() + years);
      return newVal;
    });
  };
  const nextYears = () => {
    addYears(numberYears);
  };
  const prevYears = () => {
    addYears(numberYears * -1);
  };

  return (<div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <ChevronLeft className="mx-1 cursor-pointer" onClick={() => { prevYears() }} />
      <div className="flex justify-between items-center gap-2 cursor-pointer" onClick={() => {
        onCaptionLabelClicked();
      }}>
        {formatYearNumeric(value, lang.locale)}
        <ChevronUp strokeWidth={3} size={15} />
      </div>
      <ChevronRight className="mx-1 cursor-pointer" onClick={() => { nextYears() }} />
    </div>
    <div className="grid grid-rows-7 grid-cols-3">
      {Array(numberYears).fill('').map((_, index) => new Date(base.getFullYear() + index, 0)).map((date, index) => {
        return (
          <div
            className={cn("h-[42px] flex justify-center items-center cursor-pointer", buttonVariants({ variant: "ghost" }), {
              "bg-elevation-200 hover:bg-elevation-200 border-[1px] border-divider-100": date.getFullYear() === value.getFullYear()
            })}
            key={index}
            onClick={() => {
              handleOnChange(date.getFullYear());
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
