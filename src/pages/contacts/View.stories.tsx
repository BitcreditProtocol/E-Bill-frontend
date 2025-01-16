import type { Meta,  StoryObj } from '@storybook/react';
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';
import View from './View';
import * as contacts from "@/mocks/handlers/contacts/list";

const meta = {
  title: 'Element/Contacts/View',
  component: View,
  args: {
  },
  decorators: [
    withRouter,
  ],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        loader: () => contacts.data[0],
      },
    }),
  },
} satisfies Meta<typeof View>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <View {...args} />
  ),
};
