import React from "react";
import { DatePicker } from "@/components/ui/datePicker";
import { Meta, StoryFn } from "@storybook/react";
import { IntlProvider } from "react-intl";
import { DateRange } from "react-day-picker";

const message = {
    en: {
        "displayRange.days": "{value} days",
        "displayRange.sixMonths": "6 Months",
        "displayRange.oneYear": "1 Year",
        "displayRange.selectRange": "Select range",
    },
};

const meta = {
  title: "Components/DatePicker",
  component: DatePicker
} satisfies Meta<typeof DatePicker>;

export default meta;

const Template: StoryFn<typeof meta.component> = (args) => {
    const [dateRange, setDateRange] = React.useState<DateRange>({
      from: new Date()
    });
    
    return(
      <IntlProvider locale="en" messages={message['en']}>
        <div className="w-[280px]">
          <DatePicker
              {...args}
              value={dateRange}
              onChange={setDateRange}
          />
        </div>
      </IntlProvider>
    );
};

export const SingleDate = Template.bind({});
SingleDate.args = {
  mode: 'single'
};

export const RangeDate = Template.bind({});
RangeDate.args = {
  mode: 'range'
};
