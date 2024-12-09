import type { Meta,  StoryObj } from '@storybook/react';
import { DiscountForm, NetToGrossDiscountForm } from './DiscountForm';
import { fn } from '@storybook/test';
import LanguageProvider from '@/context/language/LanguageProvider';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1_000;

const now = Date.now();

const meta = {
  title: 'Element/DiscountForm',
  component: NetToGrossDiscountForm,
  args: {
    startDate: new Date(now),
    endDate: new Date(now + 90 * MILLISECONDS_PER_DAY),
    onSubmit: fn(),
    currency: "BTC"
  },
  decorators: [
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    ),
  ],
} satisfies Meta<typeof NetToGrossDiscountForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NetToGross: Story = {
  render: (args) => (
    <DiscountForm {...args} />
  ),
};
