import React from "react";
import { DatePicker } from "@/components/ui/datePicker";
import { Meta, StoryFn } from "@storybook/react";
import { DateRange } from "@/types/DateRange";
import { IntlProvider } from "react-intl";

const message = {
    en: {
        "displayRange.days": "{value} days",
        "displayRange.sixMonths": "6 Months",
        "displayRange.oneYear": "1 Year",
        "displayRange.selectRange": "Select range",
        "months.january": "January",
        "months.february": "February",
        "months.march": "March",
        "months.april": "April",
        "months.may": "May",
        "months.june": "June",
        "months.july": "July",
        "months.august": "August",
        "months.september": "September",
        "months.october": "October",
        "months.november": "November",
        "months.december": "December"
    },
};

export interface DatePickerProps {
    date: Date;
    setDate: (date: Date) => void;
    dateRange?: DateRange;
    setDateRange?: (range?: DateRange) => void;
    allowRangeSelection?: boolean;
}

export default {
    title: "Component/DatePicker",
    component: DatePicker
} as Meta<DatePickerProps>;

const Template: StoryFn<DatePickerProps> = (args) => {
    const [date, setDate] = React.useState(new Date);
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
    
    return(
      <IntlProvider locale="en" messages={message['en']}>
        <div className="w-[280px]">
          <DatePicker
              {...args}
              date={date}
              setDate={setDate}
              dateRange={dateRange}
              setDateRange={setDateRange}
          />
        </div>
      </IntlProvider>
    );
};

export const SingleDate = Template.bind({});

export const RangeDate = Template.bind({});
RangeDate.args = {
    allowRangeSelection: true
};

