import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { addDays } from 'date-fns';
import { DiscountForm, NetToGrossDiscountForm } from './DiscountForm';

const now = Date.now();

const meta = {
  title: 'Element/DiscountForm',
  component: NetToGrossDiscountForm,
  args: {
    startDate: new Date(now),
    endDate: addDays(now, 90),
    onSubmit: fn(),
    currency: "BTC"
  },
} satisfies Meta<typeof NetToGrossDiscountForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NetToGross: Story = {
  render: (args) => (
    <DiscountForm {...args} />
  ),
};
