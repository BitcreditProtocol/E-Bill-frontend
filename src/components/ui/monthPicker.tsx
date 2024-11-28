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

const MonthPicker = ({baseDate, setDate, setShowYearPicker, setShowMonthPicker }: YearPickerProps) => {
    const monthList = [
        "January",
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "June", 
        "June", 
        "September", 
        "October", 
        "November", 
        "Dezember"
    ];

    const formatDate = (date: Date | undefined) => {
        if(!date) return "Pick a date";
        return new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(date);
    };

    const handleMonthClick = (monthIndex: number) => {
        const newDate = new Date(baseDate);
        newDate.setMonth(monthIndex);
        setDate(newDate);
    }
    
    return(
        <div className="h-full w-full">
            <div className="flex justify-between">
                <div>
                    <ChevronLeft />
                </div>
                <div className={cn("flex justify-between items-center gap-2")}>
                    <div>{formatDate(baseDate)}</div>
                    <ChevronDown strokeWidth={3} size={15} />
                </div>
                <div>
                    <ChevronRight />
                </div>
            </div>
            <div className="h-full w-full grid grid-rows-4 grid-cols-3">
                {monthList.map((month, index) => (
                    <div
                        key={index}
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => {
                            handleMonthClick(index)
                            setShowMonthPicker(false);
                            setShowYearPicker(false);
                        }} 
                    >
                        {month}
                    </div>
                ))}
            </div>
        </div>
    );
}

export { MonthPicker }