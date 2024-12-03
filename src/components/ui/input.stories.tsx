import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input } from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label",
  }
};

export const Required: Story = {
  args: {
    label: "label",
    required: true,
  }
};
