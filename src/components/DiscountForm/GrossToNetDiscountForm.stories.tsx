import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Big from 'big.js';
import { addDays } from 'date-fns';
import LanguageProvider from '@/context/language/LanguageProvider';
import { DiscountForm, GrossToNetDiscountForm } from './DiscountForm';

const now = Date.now();

const meta = {
  title: 'Element/DiscountForm',
  component: GrossToNetDiscountForm,
  args: {
    startDate: new Date(now),
    endDate: addDays(now, 90),
    onSubmit: fn(),
    gross: {
      value: new Big(12.47568),
      currency: "BTC"
    }
  },
  decorators: [
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    ),
  ],
} satisfies Meta<typeof GrossToNetDiscountForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GrossToNet: Story = {
  render: (args) => (
    <DiscountForm {...args} />
  ),
};
