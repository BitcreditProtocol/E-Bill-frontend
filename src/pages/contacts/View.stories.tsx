import type { Meta,  StoryObj } from '@storybook/react';
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';
import LanguageProvider from '@/context/language/LanguageProvider';
import View from './View';
import __DATA from './__data';

const meta = {
  title: 'Element/Contacts/View',
  component: View,
  args: {
  },
  decorators: [
    withRouter,
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    ),
  ],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        loader: () => {
          return __DATA[0];
        },
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
