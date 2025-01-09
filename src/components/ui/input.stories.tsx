import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CalendarIcon } from 'lucide-react';
import { Input } from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    label: 'Label',
    required: false,
    disabled: false,
  }
};

export const Styled: Story = {
  args: {
    ...Default.args,
    required: true,
    clearable: true,
    hint: 'Hint',
    icon: <CalendarIcon className="w-5 h-5" strokeWidth={1} />,
  }
};

export const Variants: Story = {
  args: {
  ...Default.args,
    hint: 'Hint',
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} required />
      <Input {...args} required icon={<CalendarIcon className="w-5 h-5" strokeWidth={1} />} />
      <Input {...args} value="Content" required clearable />
      <Input {...args} value="Content" required clearable icon={<CalendarIcon className="w-5 h-5" strokeWidth={1} />}/>
      <Input {...args} value="Content" disabled icon={<CalendarIcon className="w-5 h-5" strokeWidth={1} />}/>

    </div>
  ),
};


export const InputSizes: Story = {
  args: {
  ...Styled.args,
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} label="sm" inputSize="sm" />
      <Input {...args} label="md" inputSize="md" />
      <Input {...args} label="lg  " inputSize="lg" />
    </div>
  ),
};

export const StateColors: Story = {
  args: {
  ...Styled.args,
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} label="Default"/>
      <Input {...args} label="Success" success />
      <Input {...args} label="Error" error />
    </div>
  ),
};
