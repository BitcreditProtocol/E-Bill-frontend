import type { Meta,  StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LanguageProvider from '@/context/language/LanguageProvider';
import List from './List';
import __DATA from '../__data';

const meta = {
  title: 'Element/Contacts/List',
  component: List,
  args: {
    values: __DATA
  },
  decorators: [
    (Story) => (
      <MemoryRouter future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}>
        <LanguageProvider>
          <Story />
        </LanguageProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <List {...args} />
  ),
};
