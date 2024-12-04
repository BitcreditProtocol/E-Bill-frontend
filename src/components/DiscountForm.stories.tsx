import type { Meta,  StoryObj } from '@storybook/react';
import { DiscountForm } from './DiscountForm';
import { fn } from '@storybook/test';
import LanguageProvider from '@/context/language/LanguageProvider';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1_000;

const now = Date.now();

const meta = {
  title: 'Element/DiscountForm',
  component: DiscountForm,
  args: {
    startDate: new Date(now),
    endDate: new Date(now + 90 * MILLISECONDS_PER_DAY),
    onSubmit: fn()
  },
  decorators: [
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    ),
  ],
} satisfies Meta<typeof DiscountForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DiscountForm {...args} />
  ),
};
