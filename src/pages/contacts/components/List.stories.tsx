import type { Meta,  StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';
import List from './List';
import * as contacts from "@/mocks/handlers/contacts/list";

const meta = {
  title: 'Element/Contacts/List',
  component: List,
  args: {
    values: contacts.data,
  },
  decorators: [
    withRouter,
  ],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <List {...args} />
  ),
};
