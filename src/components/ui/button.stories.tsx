import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button'
  },
  argTypes: {
    variant: {
      options: ['default', 'outline', 'destructive', 'secondary', 'ghost', 'link', 'filter'],
      control: { type: 'radio' },
    },
    size: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
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



export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args} disabled>Default</Button>
      <Button {...args} variant="outline" disabled>
        Outline
      </Button>
      <Button {...args} variant="destructive" disabled>
        Destructive
      </Button>
      <Button {...args} variant="secondary" disabled>
        Secondary
      </Button>
      <Button {...args} variant="ghost" disabled>
        Ghost
      </Button>
      <Button {...args} variant="link" disabled>
        Link
      </Button>
      <Button {...args} variant="filter" disabled>
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
