"use client"

import { useState, useEffect, useMemo } from "react"
import { ArrowRight, CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/DatePicker/calendar"
import { DateRangeDropdown } from "./dataRangeDropdown" 
import { YearPicker } from "./yearPicker"
import { MonthPicker } from "./monthPicker"
import { FormattedMessage } from "react-intl"
import { formatDateLong, formatDateShort } from "@/utils/dates"
import { useLanguage } from "@/context/language/LanguageContext"
import { addDays, differenceInCalendarDays } from "date-fns"

interface DatePickerProps {
  mode: 'single' | 'range'
  value?: DateRange
  onChange: (dateRange: DateRange) => void
}

export function DatePicker({ mode, value, onChange }: DatePickerProps) {
  const lang = useLanguage();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState<number>();
  const allowRangeSelection = useMemo(() => mode === 'range', [mode]);
  const [current, setCurrent] = useState(value || {
    from: new Date(),
    to: undefined
  });
  const baseDate = useMemo(() => current.from || new Date(), [current]);

  useEffect(() => {
    setCurrent(value || {
      from: new Date(),
      to: undefined
    })
  }, [value]);

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  }

  const toggleYearPicker = () => {
    setShowYearPicker((prev => !prev));
  }

  useEffect(() => {
    setCurrent((val) => {
      if (selectedRange === undefined || val.from === undefined) return val;
      return ({
        ...val,
        to: addDays(val.from, selectedRange),
      })
    });
  }, [selectedRange]);

  useEffect(() => {
      setSelectedRange((val) => {
        if (current.from === undefined || current.to === undefined) {
          return val;
        }
        const diffDays = differenceInCalendarDays(current.to, current.from);
        return diffDays !== val ? undefined : val;
      });
  }, [current]);

  return (
    <>
      <Button
        variant="outline"
        className="w-full flex gap-1 justify-start items-center"
        onClick={toggleCalendar}>
        <CalendarIcon className="text-muted-foreground" />
        {mode === 'single' ? (
          <>{value && value.from && formatDateLong(value.from, lang.locale)}</>
        ) : (<>
          <div className="flex gap-1 justify-start items-center truncate">
            {value && (<>{value.from && formatDateShort(value.from, lang.locale)}
              <span>-</span>
              {value.to && formatDateShort(value.to, lang.locale)}
            </>)}
          </div>
        </>)}
      </Button>

      <div className={cn(
          "fixed inset-0 bg-black/30 transition-opacity duration-300 max-w-[375px] left-1/2 -translate-x-1/2",
          showCalendar ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => { setShowCalendar(false); }} 
      />

      <div className={cn(
        `fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[375px] w-full ${allowRangeSelection ? "h-5/6" : "h-3/4"} bg-elevation-50 p-3 transition-transform duration-300 ease-in-out rounded-t-2xl justify-center`,
        showCalendar ? "translate-y-0" : "translate-y-full"
      )}>
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

                <DateRangeDropdown value={selectedRange} onRangeChange={setSelectedRange}/>

                <div className="grid grid-cols-9 text-sm">
                  <div className="col-span-4">
                    <div className="h-[46px] py-3 px-4 w-full bg-[#f6f2e7] border border-gray-200 rounded-lg truncate">
                      {current.from && formatDateShort(current.from, lang.locale)}
                    </div>
                  </div>

                  <div className="col-auto flex justify-center items-center">
                    <ArrowRight className="text-text-200" strokeWidth={1} size={24} />
                  </div>

                  <div className="col-span-4">
                    <div className="h-[46px] py-3 px-4 w-full bg-[#f6f2e7] border border-gray-200 rounded-lg truncate">
                      {current.to && formatDateShort(current.to, lang.locale)}
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
                  {current.from && formatDateLong(current.from, lang.locale)}
                </div>
              </>)
            }
          </div>

          <div className="min-h-[330px] mb-4">
            {showYearPicker && (
              <YearPicker
                value={current.from || baseDate}
                onChange={(date) => {
                  setCurrent({
                    ...value,
                    from: date
                  });
                  setShowYearPicker(false);
                  setShowMonthPicker(true);
                }}
                onCaptionLabelClicked={() => {
                  setShowYearPicker(false);
                  setShowMonthPicker(false);
                }}
              />
            )}
            {showMonthPicker && (
              <MonthPicker
                value={current.from || baseDate}
                onChange={(date) => {
                  setCurrent({
                    ...value,
                    from: date
                  })
                  setShowYearPicker(false);
                  setShowMonthPicker(false);
                }}
                onCaptionLabelClicked={() => {
                  setShowYearPicker(true);
                  setShowMonthPicker(false);
                }}
              />
            )}
            {!showYearPicker && !showMonthPicker && (
              <Calendar
                mode={mode}
                selected={current}
                onCaptionLabelClicked={toggleYearPicker}
                onSelect={(range: DateRange | undefined) => {
                  if (range) {
                    setCurrent(range)
                  }
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
                setShowMonthPicker(false);
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
              disabled={current.from === undefined || (mode === 'range' && current.to === undefined)}
              onClick={() => {
                onChange(current);
                setShowMonthPicker(false);
                setShowYearPicker(false);
                setShowCalendar(false);
              }}
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
    </>
  )
}