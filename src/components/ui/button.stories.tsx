import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './button';

const meta = {
  title: 'Actions/Button',
  component: Button,
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    children: 'Button'
  }
};

export const BrandColors: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args}>Default</Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
      <Button {...args} variant="filter">
        Filter
      </Button>
    </div>
  ),
};

export const ButtonSizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args}>Default</Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="xs">
        Extra small
      </Button>
      <Button {...args} size="xxs">
        Tiny
      </Button>
    </div>
  ),
};

