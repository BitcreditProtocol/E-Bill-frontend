import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import LanguageProvider from '@/context/language/LanguageProvider';
import TypeFilter from './TypeFilter';
import { ContactTypes } from '@/types/contact';

const meta = {
  title: 'Element/Contacts/TypeFilter',
  component: TypeFilter,
  args: {
    value: ContactTypes.Company,
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    ),
  ],
} satisfies Meta<typeof TypeFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TypeFilter {...args} />
  ),
};
