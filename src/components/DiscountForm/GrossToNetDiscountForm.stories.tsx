import type { Meta,  StoryObj } from '@storybook/react';
import { DiscountForm, GrossToNetDiscountForm } from './DiscountForm';
import { fn } from '@storybook/test';
import LanguageProvider from '@/context/language/LanguageProvider';
import Big from 'big.js';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1_000;

const now = Date.now();

const meta = {
  title: 'Element/DiscountForm',
  component: GrossToNetDiscountForm,
  args: {
    startDate: new Date(now),
    endDate: new Date(now + 90 * MILLISECONDS_PER_DAY),
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
