import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GeoInput } from './GeoInput';

const meta = {
  title: 'Components/GeoInput',
  component: GeoInput,
  args: { onClick: fn() },
} satisfies Meta<typeof GeoInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label"
  },
};
