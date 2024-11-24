"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerProps {
  allowRangeSelection?: boolean;
}

export function DatePicker({allowRangeSelection = false}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()
  const [showCalendar, setShowCalendar] = React.useState(false)

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev)
  }

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
          "fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[375px] w-full h-2/3 bg-elevation-50 p-3 transition-transform duration-300 ease-in-out rounded-t-2xl flex justify-center",
          showCalendar ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="w-full">
          <span className="text-sm">
            Selected date
          </span>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectDate) => {
            setDate(selectDate)
          }}
          initialFocus
          className="w-full absolute top-10"
        />
        <div className="absolute bottom-10 w-full flex justify-around">
          <Button 
            className="w-40 h-12 rounded-xl bg-inherit border border-black"
            onClick={() => {
              setShowCalendar(false)
              setDate(undefined)
            }}
          >
            <span className="text-black">Cancel</span>
          </Button>
          <Button 
            className="w-40 h-12 rounded-xl bg-black"
            onClick={() => setShowCalendar(false)}
          >
            <span>Confirm</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
