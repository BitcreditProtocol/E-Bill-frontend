"use client"

import { useState, useEffect, useCallback } from "react"
import { format } from "date-fns"
import { ArrowRight, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DateRangeDropdown } from "./dataRangeDropdown"
import { YearPicker } from "./yearPicker"
import { MonthPicker } from "./monthPicker"
import { DateRange } from "../../types/DateRange"
import { FormattedMessage } from "react-intl"
import { formatDateLong, formatDateShort } from "@/utils/dates"
import { useLanguage } from "@/context/language/LanguageContext"


interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  allowRangeSelection?: boolean;
  dateRange?: DateRange;
  setDateRange?: (dateRange: DateRange) => void; 
}

export function DatePicker({allowRangeSelection = false, date, setDate, setDateRange}: DatePickerProps) {
  const lang = useLanguage();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState<number | null>(null);

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  }

  const toggleYearPicker = () => {
    setShowYearPicker((prev => !prev));
  }

  const rangedDate = useCallback((date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + (selectedRange ?? 0));
    return newDate;
  }, [selectedRange]);

  useEffect(() => {
    const newDate: DateRange = {
      startDate: date,
      endDate: rangedDate(date),
    };
    if (setDateRange) {
      setDateRange(newDate);
    }
  }, [selectedRange, date, setDateRange, rangedDate]);

  return (
    <div>
      <Button
        variant="outline"
        className="w-full flex gap-1 justify-start items-center"
        onClick={toggleCalendar}>
        <CalendarIcon className="text-muted-foreground" />
        {format(date, "PPP")}
      </Button>

      <div className={cn(
          "fixed inset-0 bg-black/30 transition-opacity duration-300 max-w-[375px] left-1/2 -translate-x-1/2",
          showCalendar ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => { setShowCalendar(false); }} 
      ></div>

      <div
        className={cn(
          `fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[375px] w-full ${allowRangeSelection ? "h-5/6" : "h-3/4"} bg-elevation-50 p-3 transition-transform duration-300 ease-in-out rounded-t-2xl justify-center`,
          showCalendar ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {allowRangeSelection ?
              (<>
                <div className="text-xs text-text-200">
                  <FormattedMessage
                    id="Select date range"
                    defaultMessage="Select date range"
                    description="Header label for picking date range in datepicker form"
                  />
                </div>

                <DateRangeDropdown onRangeChange={setSelectedRange}/>

                <div className="grid grid-cols-9 text-sm">
                  <div className="col-span-4">
                    <div className="py-3 px-4 w-full bg-[#f6f2e7] border border-gray-200 rounded-lg truncate">
                      {formatDateShort(date, lang.locale)}
                    </div>
                  </div>

                  <div className="col-auto flex justify-center items-center">
                    <ArrowRight className="text-text-200" strokeWidth={1} size={24} />
                  </div>

                  <div className="col-span-4">
                    <div className="py-3 px-4 w-full bg-[#f6f2e7] border border-gray-200 rounded-lg truncate">
                      {formatDateShort(rangedDate(date), lang.locale)}
                    </div>
                  </div>
                </div>
              </>) : (<>
                <div className="text-xs text-text-200">
                  <FormattedMessage
                    id="Selected date"
                    defaultMessage="Selected date"
                    description="Header label for picking single date in datepicker form"
                  />
                </div>
                <div className="text-base">
                  {formatDateLong(date, lang.locale)}
                </div>
              </>)
            }
          </div>

          <div className="min-h-[330px] mb-4">
            {showYearPicker && (
              <YearPicker
                baseDate={date}
                setDate={setDate}
                setShowYearPicker={setShowYearPicker}
                setShowMonthPicker={setShowMonthPicker}
              />
            )}
            {showMonthPicker && (
              <MonthPicker
                baseDate={date}
                setDate={setDate}
                setShowYearPicker={setShowYearPicker}
                setShowMonthPicker={setShowMonthPicker}
              />
            )}
            {!showYearPicker && !showMonthPicker && (
              <Calendar
                mode="single"
                selected={date}
                onToggleYearPicker={toggleYearPicker}
                onSelect={(_: Date | undefined, selectDate: Date) => {
                  setDate(selectDate)
                }}
                initialFocus
              />
            )}
          </div>
          
          <div className="flex gap-1 items-center">
            <Button
              className="w-full border-text-300"
              variant="outline"
              size="sm"
              onClick={() => {
                setDate(new Date());
                setShowYearPicker(false);
                setShowCalendar(false);
              }}
            >
              <FormattedMessage
                id="Cancel"
                defaultMessage="Cancel"
                description="Cancel button text in datepicker form"
              />
            </Button>
            <Button
              className="w-full"
              size="sm"
              onClick={() => { setShowCalendar(false); }}
            >
              <FormattedMessage
                id="Confirm"
                defaultMessage="Confirm"
                description="Confirm button text in datepicker form"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}