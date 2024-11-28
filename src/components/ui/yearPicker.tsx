"use client"

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface YearPickerProps {
    baseDate: Date
    setDate: (date: Date) => void
    setShowYearPicker: (value: boolean) => void
    setShowMonthPicker: (value: boolean) => void
}

const YearPicker = ({baseDate, setDate, setShowYearPicker, setShowMonthPicker }: YearPickerProps) => {
    const numberYears = 21;
    const [baseYear, setBaseYear] = React.useState(baseDate.getFullYear())
    
    const formatDate = (date: Date | undefined) => {
        if(!date) return "Pick a date";
        return new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(date);
    };

    const handleYearClick = (year: number) => {
        const updateDate = new Date(baseDate);
        updateDate.setFullYear(year);
        setDate(updateDate);
    }
    
    return(
        <div className="h-full w-full">
            <div className="flex justify-between">
                <div>
                    <ChevronLeft onClick={() => {
                        setBaseYear(baseYear - numberYears);
                    }}/>
                </div>
                <div className={cn("flex justify-between items-center gap-2")}>
                    <div>{formatDate(baseDate)}</div>
                    <ChevronDown strokeWidth={3} size={15} />
                </div>
                <div>
                    <ChevronRight onClick={() => {
                        setBaseYear(baseYear + numberYears);
                    }}/>
                </div>
            </div>
            <div className="h-full w-full grid grid-rows-7 grid-cols-3">
                {Array.from({ length: numberYears }).map((_, index) => { 
                    const year = baseYear + index;
                    return (
                        <div 
                            className="flex items-center justify-center" 
                            key={index}
                            onClick={() => {
                                handleYearClick(year);
                                setShowYearPicker(false);
                                setShowMonthPicker(true);
                            }}
                        >
                            {year}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export { YearPicker }