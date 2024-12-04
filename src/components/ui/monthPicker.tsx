"use client"

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useIntl } from "react-intl";

interface YearPickerProps {
    baseDate: Date
    setDate: (date: Date) => void
    setShowYearPicker: (value: boolean) => void
    setShowMonthPicker: (value: boolean) => void
}

const MonthPicker = ({baseDate, setDate, setShowYearPicker, setShowMonthPicker }: YearPickerProps) => {   
    const intl = useIntl();

    const monthList = (): string[] => {
        return [
          intl.formatMessage({ id: "months.january", defaultMessage: "January" }),
          intl.formatMessage({ id: "months.february", defaultMessage: "February" }),
          intl.formatMessage({ id: "months.march", defaultMessage: "March" }),
          intl.formatMessage({ id: "months.april", defaultMessage: "April" }),
          intl.formatMessage({ id: "months.may", defaultMessage: "May" }),
          intl.formatMessage({ id: "months.june", defaultMessage: "June" }),
          intl.formatMessage({ id: "months.july", defaultMessage: "July" }),
          intl.formatMessage({ id: "months.august", defaultMessage: "August" }),
          intl.formatMessage({ id: "months.september", defaultMessage: "September" }),
          intl.formatMessage({ id: "months.october", defaultMessage: "October" }),
          intl.formatMessage({ id: "months.november", defaultMessage: "November" }),
          intl.formatMessage({ id: "months.december", defaultMessage: "December" }),
        ];
    };

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
                {monthList().map((month, index) => (
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