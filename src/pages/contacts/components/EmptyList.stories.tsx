import type { Meta,  StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LanguageProvider from '@/context/language/LanguageProvider';
import EmptyList from './EmptyList';

const meta = {
  title: 'Element/Contacts/EmptyList',
  component: EmptyList,
  args: {
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
} satisfies Meta<typeof EmptyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <EmptyList />
  ),
};
