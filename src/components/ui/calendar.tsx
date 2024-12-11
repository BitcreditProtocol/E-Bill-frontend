
import { type ComponentProps, useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, SelectSingleEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useLanguage } from "@/context/language/LanguageContext"
import { formatDateShort } from "@/utils/dates"

export type CalendarProps = ComponentProps<typeof DayPicker> & {
  mode: 'single'
  onSelect: SelectSingleEventHandler
  onToggleYearPicker: () => void
  selected: Date
  ISOWeek?: boolean
}

function Calendar({
  className,
  classNames,
  onToggleYearPicker,
  selected,
  onSelect,
  ISOWeek = true,
  ...restProps
}: CalendarProps) {
  const lang = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(selected);

  const handleOnSelect : SelectSingleEventHandler = (day, selectedDay, modifiers, e) => {
    setSelectedDate(selectedDay)
    onSelect(day, selectedDay, modifiers, e);
  }

  return (
    <DayPicker
      ISOWeek={ISOWeek}
      showOutsideDays={true}
      onSelect={handleOnSelect}
      selected={selected}
      className={cn("flex justify-center", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
        month: "space-y-4 w-full",
        caption: "flex justify-center relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full h-full border-collapse space-y-1",
        head_row: "flex justify-around",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-1 justify-around",
        cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-elevation-200 hover:bg-elevation-200 border-[1px] border-divider-100",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft />,
        IconRight: () => <ChevronRight />,
        CaptionLabel: () => (
          <div className={cn("flex justify-between items-center gap-2 cursor-pointer")} onClick={onToggleYearPicker}>
            {formatDateShort(selectedDate, lang.locale)}
            <ChevronDown strokeWidth={3} size={15} />
          </div>
        ),
      }}
      {...restProps}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }