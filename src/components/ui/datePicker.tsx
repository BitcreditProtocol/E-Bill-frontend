"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, MoveRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DateRangeDropdown } from "./dataRangeDropdown"
import {YearPicker} from "./yearPicker"
import { MonthPicker } from "./monthPicker"
import { DateRange } from "../../types/DateRange"


interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  allowRangeSelection?: boolean;
  dateRange?: DateRange;
  setDateRange?: (dateRange: DateRange) => void; 
}

export function DatePicker({allowRangeSelection = false, date, setDate, setDateRange}: DatePickerProps) {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [showYearPicker, setshowYearPicker] = React.useState(false);
  const [showMonthPicker, setShowMonthPicker] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState<number | null>(null);

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  }

  const toggleYearPicker = () => {
    setshowYearPicker((prev => !prev));
  }

  const formatDate = (date: Date | undefined) => {
    if(!date) return "Pick a date";
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const rangedDate = (date: Date | undefined) => {
    if (!date || selectedRange === null) return new Date(date || Date.now());

    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + selectedRange);
    return newDate;
  }

  React.useEffect(() => {
    const newDate: DateRange = {
      startDate: date,
      endDate: rangedDate(date),
    };
    if(setDateRange){
      setDateRange(newDate)
    }
  }, [selectedRange]);

  return (
    <div>
      <Button
        variant={"outline"}
        className={cn(
          "w-[280px] justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
        onClick={toggleCalendar}
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>

      <div
        className={cn(
          "fixed inset-0 bg-black/30 transition-opacity duration-300 max-w-[375px] left-1/2 -translate-x-1/2",
          showCalendar ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowCalendar(false)} 
      ></div>

      <div
        className={cn(
          `fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[375px] w-full ${allowRangeSelection ? "h-4/5" : "h-2/3"} bg-elevation-50 p-3 transition-transform duration-300 ease-in-out rounded-t-2xl justify-center`,
          showCalendar ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="grid grid-rows-8 h-full w-full">
          <div className={`grid ${allowRangeSelection ? "row-span-2 grid-rows-4" : "row-span-1 grid-rows-2"} w-full h-full`}>
            <div className="row-span-1 h-full w-full">
              <div className="w-full justify-center items-start">
                {allowRangeSelection ? (
                  <span className="text-sm text-gray-400">
                    Selected date range
                  </span>                    
                ) : (
                  <span className="text-sm text-gray-400">
                    Selected date
                  </span>
                )}
              </div>
            </div>

            <div className={`${allowRangeSelection ? "row-span-3" : "row-span-1"} h-full w-full`}>
              {allowRangeSelection ? 
                (
                  <div className="row-span-3 grid grid-rows-2 h-full w-full">
                    <div className="row-span-1 w-full">
                      <DateRangeDropdown onRangeChange={setSelectedRange}/>
                    </div>

                    <div className="row-span-1 grid grid-cols-12">
                      <div className="col-span-5 pb-5">
                        <div className="h-full w-full bg-[#f6f2e7] border border-gray-200 rounded-lg text-sm flex justify-center items-center">
                          {formatDate(date)}
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-center items-center pb-5">
                        <MoveRight strokeWidth={1} size={30}/>
                      </div>

                      <div className="col-span-5 pb-5">
                        <div className="h-full w-full bg-[#f6f2e7] border border-gray-200 rounded-lg text-sm flex justify-center items-center">
                          {formatDate(rangedDate(date))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              :
                (
                  <div className="text-base">
                    {formatDate(date)}
                  </div>
                )
              }

            </div>
          </div>

          <div className={`${allowRangeSelection ? "row-span-5" : "row-span-6"} w-full h-full`}>
            {showYearPicker ? (
              <div className="h-full w-full pb-5">
                <YearPicker
                 baseDate={date}
                 setDate={setDate}
                 setShowYearPicker={setshowYearPicker}
                 setShowMonthPicker={setShowMonthPicker}
                />
              </div>
            ) : showMonthPicker ? (
              <div className="h-full w-full pb-5"> 
                <MonthPicker 
                  baseDate={date}
                  setDate={setDate}
                  setShowYearPicker={setshowYearPicker}
                  setShowMonthPicker={setShowMonthPicker}
                />
              </div>
            ) :
            (
              <Calendar
                mode="single"
                selected={date}
                onToggleYearPicker={toggleYearPicker}
                onSelect={(selectDate) => {
                  if(selectDate) {
                    setDate(selectDate)
                  }
                }}
                initialFocus
                className="pt-4 w-full h-full"
              />
            )}
          </div>
          
          <div className="row-span-2 grid grid-cols-2 w-full h-full justify-center items-center">
            <div  className="col-span-1 flex justify-center items-center">
              <Button 
                className="w-40 h-12 rounded-xl bg-inherit border border-black "
                onClick={() => {
                  setDate(new Date());
                  setshowYearPicker(false);
                  setShowCalendar(false);
                }}
              >
                <span className="text-black">Cancel</span>
              </Button>
            </div>

            <div  className="col-span-1 flex justify-center items-center">
              <Button 
                className="w-40 h-12 rounded-xl bg-black"
                onClick={() => setShowCalendar(false)}
              >
                <span>Confirm</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}