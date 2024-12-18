import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TypeFilter from './TypeFilter';
import { ContactTypes } from '@/types/contact';

const meta = {
  title: 'Element/Contacts/TypeFilter',
  component: TypeFilter,
  args: {
    values: [ContactTypes.Company, ContactTypes.Person],
    onChange: fn(),
  }
} satisfies Meta<typeof TypeFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TypeFilter {...args} />
  ),
};
