import type { Meta,  StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';
import List from './List';
import __DATA from '../__data';

const meta = {
  title: 'Element/Contacts/List',
  component: List,
  args: {
    values: __DATA
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
