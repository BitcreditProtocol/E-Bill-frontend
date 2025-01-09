import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TypeSwitch from './TypeSwitch';
import { ContactTypes } from '@/types/contact';

const meta = {
  title: 'Element/Contacts/TypeSwitch',
  component: TypeSwitch,
  args: {
    value: ContactTypes.Company,
    onChange: fn(),
  }
} satisfies Meta<typeof TypeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TypeSwitch {...args} />
  ),
};
